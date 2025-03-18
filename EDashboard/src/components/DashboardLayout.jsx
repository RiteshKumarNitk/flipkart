import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4">
        <h2 className="text-2xl font-bold mb-4">Kart Admin</h2>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/categories"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Orders
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;