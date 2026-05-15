"use client";

import { Button } from "./ui/button";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Button variant="outline" size="lg" onClick={handleLogout}>
      Logout <LogOut className="ml-1 h-4 w-4" />
    </Button>
  );
}
