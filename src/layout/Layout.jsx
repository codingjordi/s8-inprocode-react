import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout () {

  return (
    <div className="bg-white dark:bg-zinc-800 h-dvh">
        <Header />
        <Outlet />
    </div>
  );
};

