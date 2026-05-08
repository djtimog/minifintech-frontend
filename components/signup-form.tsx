"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createUserSchema, CreateUserInput } from "@/lib/type";
import AuthService, { ResponseUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";

const signUpSchema = createUserSchema
  .extend({
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpInput = z.infer<typeof signUpSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const signUpMutation = useMutation({
    mutationFn: (data: CreateUserInput) => AuthService.createUser(data),
    onSuccess: (data: ResponseUser) => {
      dispatch(setCredentials({ user: data.user, token: data.token }));
      router.push("/dashboard");
    },
    onError: () => {
      console.error("Sign up failed");
    },
  });

  const onSubmit = (data: SignUpInput) => {
    const { confirmPassword, ...payload } = data;
    signUpMutation.mutate(payload);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in your details to get started
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="first_name">First name</FieldLabel>
            <Input
              id="first_name"
              type="text"
              placeholder="John"
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-xs text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="second_name">Last name</FieldLabel>
            <Input
              id="second_name"
              type="text"
              placeholder="Doe"
              {...register("second_name")}
            />
            {errors.second_name && (
              <p className="text-xs text-red-500">
                {errors.second_name.message}
              </p>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </Field>

        <Field>
          <Button type="submit" disabled={signUpMutation.isPending}>
            {signUpMutation.isPending
              ? "Creating account..."
              : "Create account"}
          </Button>
          {signUpMutation.isError && (
            <p className="text-xs text-red-500 text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button variant="outline" type="button" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Sign up with GitHub
          </Button>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link href="/sign_in" className="underline underline-offset-4">
              Log in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
