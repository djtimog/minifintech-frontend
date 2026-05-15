import { CreateUserInput, LoginInput, ResponseUser } from "@/lib/types";
// import axios from "axios";

// ─── Mock (use while backend is not ready) ───────────────────────────────────

const createUser = ({
  firstName,
  lastName,
  email,
  passWord,
}: CreateUserInput): Promise<ResponseUser> =>
  Promise.resolve({
    user: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      firstName,
      lastName,
      email,
      passWord,
      emailVerificationStatus: "Unverified",
      resetToken: "",
      resetTokenExpiry: "",
    },
    token: "mock-token-abc123",
  });

const login = ({ email, passWord }: LoginInput): Promise<ResponseUser> => {
  if (passWord !== "password123")
    return Promise.reject(new Error("Invalid credentials"));

  return Promise.resolve({
    user: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      firstName: "Timi",
      lastName: "Ogun",
      email,
      passWord,
      emailVerificationStatus: "Verified",
      resetToken: "",
      resetTokenExpiry: "",
    },
    token: "mock-token-abc123",
  });
};

const AuthService = { login, createUser };
export default AuthService;

// ─── Real (uncomment when backend is ready) ──────────────────────────────────

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";
// const apiClient = axios.create({ baseURL: API_BASE_URL, headers: { "Content-Type": "application/json" } });
//
// const createUser = async (data: CreateUserInput): Promise<ResponseUser> => {
//   const response = await apiClient.post("/UserAuth", data);
//   return response.data;
// };
//
// const login = async (data: LoginInput): Promise<ResponseUser> => {
//   const response = await apiClient.post("/Login", data);
//   return response.data;
// };
//
// const AuthService = { login, createUser };
// export default AuthService;
