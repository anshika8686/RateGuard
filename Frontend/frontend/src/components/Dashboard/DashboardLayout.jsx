import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      navigate("/");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600/10 text-blue-400"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <aside className="w-64 min-h-screen border-r border-slate-800 bg-slate-900 p-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Rate<span className="text-blue-500">Guard</span>
          </h1>

          <p className="mt-2 text-xs text-slate-500">API Management Platform</p>

          <nav className="mt-10 space-y-2">
            <NavLink to="/dashboard" end className={navLinkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/dashboard/api-keys" className={navLinkClass}>
              API Keys
            </NavLink>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-8 w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-400 hover:bg-slate-800"
          >
            Logout
          </button>
        </aside>

        <main className="min-w-0 flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
