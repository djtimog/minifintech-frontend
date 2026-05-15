import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  passWord: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  passWord: z.string().min(1, "Password is required"),
});

export const transferSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientAccount: z
    .string()
    .min(10, "Account number must be at least 10 digits")
    .regex(/^\d+$/, "Account number must be numeric"),
  amount: z
    .number({ error: "Amount must be a number" })
    .positive("Amount must be greater than 0"),
  note: z.string().optional(),
});

export const fundWalletSchema = z.object({
  amount: z
    .number({ error: "Amount must be a number" })
    .positive("Amount must be greater than 0")
    .min(100, "Minimum amount is ₦100"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type TransferInput = z.infer<typeof transferSchema>;
export type FundWalletInput = z.infer<typeof fundWalletSchema>;

export interface RegisteredUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerificationStatus: "Verified" | "Unverified" | "Pending";
  walletId: string;
  balance: number;
}

export interface LoginResponse {
  token: string;
}

export interface JwtPayload {
  sub: string; // user id
  email: string;
  firstName: string;
  lastName: string;
  walletId?: string;
  exp: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerificationStatus: "Verified" | "Unverified" | "Pending";
  walletId?: string;
  balance?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface PaymentInitRequest {
  email: string;
  amount: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, string>;
}

export interface PaymentInitResponse {
  authorizationUrl?: string;
  reference: string;
  message?: string;
}

export interface PaymentVerifyResponse {
  message: string;
  newBalance: number;
}
