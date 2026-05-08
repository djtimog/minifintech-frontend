import { CreateUserInput, LoginInput } from "@/lib/type";

export interface ResponseUser {
  user: CreateUserInput;
  token: string;
}
const createUser = ({
  first_name,
  second_name,
  email,
  password,
}: CreateUserInput): Promise<ResponseUser> => {
  // Axios function should be called
  return Promise.resolve({
    user: { first_name, second_name, email, password },
    token: "Bearer ...",
  });
};

const login = ({ email, password }: LoginInput): Promise<ResponseUser> => {
  // if (password !== "password") return null;
  return Promise.resolve({
    user: { first_name: "timi", second_name: "ogun", email, password },
    token: "Bearer ...",
  });
};

const AuthService = { login, createUser };

export default AuthService;
