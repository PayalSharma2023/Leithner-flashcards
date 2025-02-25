import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      console.log(`${import.meta.env.VITE_BACKEND_URI}`)
      const response = await axios.post(
        `http://localhost:3000/auth/signup`,
        formData
      );
      setMessage("Sign up successful!");
      console.log("Response:", response.data);
      navigate('/login')
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error:", error.response?.data || error.message);
    }
  };
  return (
    <div className="bg-gray-100 absolute top-0 z-20 h-screen w-full flex items-center justify-center">
      {/* Back Icon */}
      <NavLink
        to="/"
        className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-500"
      >
        <FiArrowLeft className="text-2xl" />
        <span className="ml-2 text-sm font-medium">Back</span>
      </NavLink>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        {message && <p className="text-center text-sm text-green-500 mb-4">{message}</p>}
        <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          {/* Email Input */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password Input */}
          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Submit Button */}

          <button
            type="submit"
            className="w-1/2 bg-gray-400 text-white py-2 px-4 rounded hover:bg-bgc-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/login" className="text-bgc-400 hover:underline">
            Log in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;