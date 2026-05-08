import { CreateUserInput, LoginInput, ResponseUser } from "@/lib/types";

const createUser = ({
  firstName,
  lastName,
  email,
  passWord,
}: CreateUserInput): Promise<ResponseUser> => {
  // Axios function should be called
  return Promise.resolve({
    user: { 
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      firstName, 
      lastName, 
      email, 
      passWord,
      emailVerificationStatus: "pending",
      resetToken: "",
      resetTokenExpiry: "",
    },
    token: "Bearer ...",
  });
};

const login = ({ email, passWord }: LoginInput): Promise<ResponseUser> => {
  // if (passWord !== "password") return null;
  return Promise.resolve({
    user: { 
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      firstName: "timi", 
      lastName: "ogun", 
      email, 
      passWord,
      emailVerificationStatus: "verified",
      resetToken: "",
      resetTokenExpiry: "",
    },
    token: "Bearer ...",
  });
};

const AuthService = { login, createUser };

export default AuthService;
