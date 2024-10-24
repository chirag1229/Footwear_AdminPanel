import React, { useState } from 'react'
import Card from "react-bootstrap/Card";


export default function Settings() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  
  return (
    <div>
      {activeMenuItem === "Settings" && (
        <Card>
          <Card.Body>
            <Card.Title>Account Settings</Card.Title>
          </Card.Body>
          <Card.Body>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
