"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/sign_in?redirect=${pathname}`);
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
