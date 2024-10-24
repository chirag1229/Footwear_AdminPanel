import { useState } from "react";
import { Menu, X, Bell, User } from "lucide-react";

import Dashboard from "./Page/Dashbord";
import Mencategory from "./Page/Mencategory";
import Womencategory from "./Page/Womencategory";
import Settings from "./Page/Settings";
import UserAdmin from "./Page/UserAdmin";

const menuItems = [
  { name: "Dashboard", icon: "📊" },
  { name: "Users", icon: "👥" },
  { name: "MenCategory", icon: "👥" },
  { name: "WomenCategory", icon: "👥" },
  { name: "Settings", icon: "⚙️" },
];

// const chartData = [
//   { name: "Jan", visits: 4000, revenue: 2400 },
//   { name: "Feb", visits: 3000, revenue: 1398 },
//   { name: "Mar", visits: 2000, revenue: 9800 },
//   { name: "Apr", visits: 2780, revenue: 3908 },
//   { name: "May", visits: 1890, revenue: 4800 },
//   { name: "Jun", visits: 2390, revenue: 3800 },
//   { name: "Jul", visits: 3490, revenue: 4300 },
// ];

export default function AdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const user = localStorage.getItem("username");

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white text-gray-800 shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 focus:outline-none lg:hidden"
            >
              <Menu size={24} />
            </button>
            <span className="text-xl font-semibold">Admin Panel</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="focus:outline-none">
              <Bell size={24} />
            </button>
            <p>{user}</p>
            <button className="focus:outline-none">
              <User size={24} />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-0 -ml-64"
          } bg-white text-gray-800 border-r transition-all duration-300 ease-in-out lg:relative lg:w-64 lg:ml-0`}
        >
          <div className="p-4 flex justify-between items-center">
            <span className="font-semibold text-xl">Menu</span>
            <button
              onClick={toggleSidebar}
              className="lg:hidden focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="mt-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center py-2 px-4 ${
                  activeMenuItem === item.name
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveMenuItem(item.name);
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <h1 className="text-3xl font-semibold mb-6">{activeMenuItem}</h1>

          {activeMenuItem === "Dashboard" && (
            <>
              <Dashboard />
            </>
          )}

          {activeMenuItem === "Users" && (
            <>
              <UserAdmin/>
            </>
          )}

          {activeMenuItem === "MenCategory" && (
            <>
              <Mencategory />
            </>
          )}

          {activeMenuItem === "WomenCategory" && (
            <>
              <Womencategory />
            </>
          )}

          {activeMenuItem === "Settings" && (
            <>
              <Settings />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
