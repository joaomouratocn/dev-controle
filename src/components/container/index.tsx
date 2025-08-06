import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="bg-red-500 w-full max-w-7xl mx-auto px-2">{children}</div>
  );
}
