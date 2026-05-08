import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-end p-6">
        <ModeToggle />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-6">
          MiniFintéch
        </p>
        <div className="w-10 h-0.5 bg-primary rounded-full mb-7 mx-auto" />
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-emerald-50 border border-primary px-3 py-1 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Practice project
        </span>
        <h1 className="text-4xl font-semibold leading-tight max-w-md mb-4">
          Your money, <span className="text-primary">simply managed.</span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-9">
          A minimal fintech experience built for learning. Track, send, and
          manage your finances; all in one place.
        </p>
        <Button size="lg">
          <Link href="/dashboard">Get started →</Link>
        </Button>
        <p className="text-xs text-muted-foreground mt-10">
          No real funds. Just clean code and good vibes.
        </p>
      </main>
    </div>
  );
}
