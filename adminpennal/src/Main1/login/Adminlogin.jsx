import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mainimg from "../../Main1/images/Mainimg.jpg";
import logo from "../../Main1/images/logo.jpg";
import axios from "axios";
import Cookies from "js-cookie";
import { Api_URL } from "../../utills/Server";
import "./Admin.css";



const AdminLogin = () => {
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identifier, setidentifier] = useState("");

  const navigate = useNavigate();

  const gotoRagister = () => {
    navigate("/Adminregistration");
  };

  const LoginAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Api_URL + "admin/login", {
        identifier,
        password,
      });
      console.log(response.data);

      // token store in localstorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      if (response.data) {
        Cookies.set("Admin-userEmail", identifier, { expires: 7 });
        alert("Login successfully 👍");
        navigate("/home");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "User Not Found or Invalid Credentials 👎"
      );
      console.error("Login error:", error.response?.data);
    }
  };
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto flex flex-col md:flex-row h-full">
        {/* Image section */}
        <div className="w-full md:w-1/2 ">
          {" "}
          <img
            src={Mainimg}
            alt="login form"
            className="rounded-l-lg h-[666px] w-[650px] ms-12"
            // style={{ objectFit: "cover" }}
          />
        </div>

        {/* Form section */}
        <div className="w-full md:w-1/2 flex items-center justify-center h-full me-12">
          <div className="card rounded-lg shadow-lg p-8 bg-white w-full h-full flex flex-col justify-center">
            <div className="flex items-center mb-4 justify-center">
              <img src={logo} alt="logo" className="w-24 h-30 mb-4" />
            </div>
            <h5 className="text-2xl font-semibold mb-4 text-center">
              Sign into your account
            </h5>

            <form className="w-full" onSubmit={LoginAdmin}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input w-full border rounded-lg p-3"
                  placeholder="Enter your Email"
                  value={identifier}
                  onChange={(e) => setidentifier(e.target.value)}
                  required
                />
              </div>

              {/* <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-input w-full border rounded-lg p-3"
                  placeholder="Enter your Username"
                  required
                />
              </div> */}

              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input w-full border rounded-lg p-3"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                Login
              </button>

              <p className="text-sm text-gray-600 mt-4">Forgot password?</p>
              <p className="mt-4 text-blue-600">
                Don't have an account?{" "}
                <span
                  onClick={gotoRagister}
                  style={{ color: "#393f81" }}
                  className="underline cursor-pointer hover:text-blue-800 "
                >
                  Register here
                </span>
              </p>
              <div className="text-sm text-gray-500 mt-2">
                Terms of use. Privacy policy.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
