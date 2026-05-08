"use client";

import React from "react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { ArrowRight } from "lucide-react";

export default function LogoutBtn() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button variant={"outline"} size={"lg"} onClick={handleLogout}>
      Logout <ArrowRight />
    </Button>
  );
}
