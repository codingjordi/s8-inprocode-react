import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout () {

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="" >
        <Outlet />
      </div>
    </>
  );
};

