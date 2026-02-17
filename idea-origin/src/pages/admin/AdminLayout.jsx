import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-10">
        <Outlet />
      </main>
    </div>
  );
}
