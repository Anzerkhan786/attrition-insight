import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};