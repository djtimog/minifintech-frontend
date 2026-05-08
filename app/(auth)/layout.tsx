"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return <div>{children}</div>;
}

export default AuthLayout;
