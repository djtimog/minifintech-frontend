"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";

const queryClient = new QueryClient();
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
