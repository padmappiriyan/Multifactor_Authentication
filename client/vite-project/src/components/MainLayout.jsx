import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Navbar stays on top */}
      <Navbar />

      {/* This part grows to fill the rest */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

