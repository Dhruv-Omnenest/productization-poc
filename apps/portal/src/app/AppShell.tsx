import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <div>
        <Header/>
        <Sidebar/>
        {children}
    </div>
  );
}