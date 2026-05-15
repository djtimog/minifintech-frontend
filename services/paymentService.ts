import axios from "axios";
import {
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentVerifyResponse,
} from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const initializePayment = async (
  paymentData: PaymentInitRequest,
): Promise<PaymentInitResponse> => {
  const response = await apiClient.post("/payments/initialize", paymentData);
  return response.data;
};

const verifyPayment = async (
  reference: string,
): Promise<PaymentVerifyResponse> => {
  const response = await apiClient.post(`/payments/verify/${reference}`);
  return response.data;
};

const PaymentService = { initializePayment, verifyPayment };
export default PaymentService;

// ─── Mock ─────────────────────────────────────────────────────────────────────
//
// const initializePayment = (data: PaymentInitRequest) =>
//   Promise.resolve({ authorizationUrl: "https://checkout.paystack.com/mock", reference: data.reference });
//
// const verifyPayment = (reference: string) =>
//   Promise.resolve({ message: "Payment verified and wallet funded.", newBalance: 300000 });
