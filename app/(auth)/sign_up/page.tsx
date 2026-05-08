"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { SignUpForm } from "@/components/signup-form";
import { GalleryVerticalEndIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/auth_image.jpg"
          alt="Auth"
          priority
          width={400}
          height={1000}
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col p-6 md:p-10">
        <header className="flex items-center justify-between w-full">
          <div>
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEndIcon className="size-4" />
              </div>
              Acme Inc.
            </Link>
          </div>
          <ModeToggle />
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
