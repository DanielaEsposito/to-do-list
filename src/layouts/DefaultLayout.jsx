import { Outlet } from "react-router-dom";
//components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DefaultLayout() {
  return (
    <>
      <div className="wrapper d-flex">
        <Sidebar />
        <main>
          <Header />
          <Outlet />
        </main>
      </div>
    </>
  );
}
