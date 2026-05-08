# MiniFintéch

A minimal fintech web app built for practice. Built with Next.js, shadcn/ui, Redux Toolkit, and React Query.

## Tech Stack

- **Framework** — Next.js (App Router)
- **UI** — shadcn/ui + Tailwind CSS
- **State** — Redux Toolkit + React Redux
- **Server state** — TanStack React Query
- **HTTP** — Axios
- **Validation** — Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/minifintech.git
cd minifintech
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
app/
├── page.tsx              # Homepage
├── layout.tsx            # Root layout with Redux Provider
├── sign_in/page.tsx      # Login page
├── sign_up/page.tsx      # Signup page
└── dashboard/page.tsx    # Protected dashboard
components/
├── LoginForm.tsx
├── SignUpForm.tsx
└── AuthGuard.tsx         # Redirects unauthenticated users
store/
├── index.ts              # Redux store config
├── hooks.ts              # Typed useAppSelector & useAppDispatch
└── slices/
└── authSlice.ts      # Auth state, setCredentials, logout

## Auth Flow

1. User signs up or logs in
2. Backend returns user object and token
3. Frontend dispatches `setCredentials` to Redux
4. `AuthGuard` wraps protected pages — redirects to `/sign_in?redirect=<path>` if unauthenticated
5. After login, user is redirected back to their intended page

## Notes

- Redux state resets on page refresh — `redux-persist` can be added later
- `confirmPassword` is frontend-only and never sent to the API
- Backend uses `passWord` (capital W) — match this exactly in API calls