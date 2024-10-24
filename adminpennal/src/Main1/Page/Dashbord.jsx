import React, { useState } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const chartData = [
    { name: "Jan", visits: 4000, revenue: 2400 },
    { name: "Feb", visits: 3000, revenue: 1398 },
    // ...additional data
  ];

  return (
    <div>
      {activeMenuItem === "Dashboard" && (
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Site Statistics</h2>
              <p className="text-gray-500">
                Visits and Revenue over the past 7 months
              </p>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="var(--color-visits)"
                    yAxisId="left"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    yAxisId="right"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 border-b">Order ID</th>
                    <th className="py-2 px-4 border-b">Customer</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Total</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">#1001</td>
                    <td className="py-2 px-4 border-b">John Doe</td>
                    <td className="py-2 px-4 border-b">2023-05-01</td>
                    <td className="py-2 px-4 border-b">$99.99</td>
                    <td className="py-2 px-4 border-b">
                      <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">#1002</td>
                    <td className="py-2 px-4 border-b">Jane Smith</td>
                    <td className="py-2 px-4 border-b">2023-05-02</td>
                    <td className="py-2 px-4 border-b">$149.99</td>
                    <td className="py-2 px-4 border-b">
                      <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full text-xs">
                        Processing
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Total Revenue",
                amount: "$45,231.89",
                change: "+20.1% from last month",
                iconPath:
                  "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
              },
              {
                title: "Subscriptions",
                amount: "+2350",
                change: "+180.1% from last month",
                iconPath:
                  "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
              },
              {
                title: "Sales",
                amount: "+12,234",
                change: "+19% from last month",
                iconPath: "M2 10h20",
              },
              {
                title: "Active Now",
                amount: "+573",
                change: "+201 since last hour",
                iconPath: "M22 12h-4l-3 9L9 3l-3 9H2",
              },
            ].map(({ title, amount, change, iconPath }, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">{title}</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-gray-400"
                  >
                    <path d={iconPath} />
                  </svg>
                </div>
                <div className="text-2xl font-bold">{amount}</div>
                <p className="text-xs text-gray-500">{change}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
