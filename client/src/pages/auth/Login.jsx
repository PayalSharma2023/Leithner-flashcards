import { NavLink, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth); // Access auth state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle login and form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsLoading(true); // Show loading state

    try {
      // Make the login API call
      const response = await axios.post(
        `http://localhost:3000/auth/login`,
        formData
      );
      const token = response.data.token;
      const role = response.data.role;
      // Save the token and role to Redux
      dispatch(login({ token, role }));

      // Optionally, store the token in localStorage for persistence
      // localStorage.setItem("user", JSON.stringify({ token, role }));

      console.log("Role:", role);

      // Handle success
      setMessage("Login successful!");
      console.log("Response:", response.data);
      setIsLoading(false); // Hide loading state
      navigate("/"); // Redirect to home/dashboard after login
    } catch (error) {
      setIsLoading(false); // Hide loading state
      setMessage("An error occurred. Please try again.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleLogout = async () => {
    dispatch(logout()); // Dispatch logout action
    setMessage("Logged out successfully!");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="inset-0 absolute top-0 z-20 bg-gray-100 w-full flex items-center justify-center">
      {/* Back Icon */}
      <NavLink
        to="/"
        className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-500"
      >
        <FiArrowLeft className="text-2xl" />
        <span className="ml-2 text-sm font-medium">Back</span>
      </NavLink>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {authState.token ? "" : "Login"}
        </h2>
        {message && (
          <p
            className={`text-center text-sm mb-4 ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        {authState.token ? (
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-gray-400 text-white rounded"
          >
            Logout
          </button>
        ) : (
          <form
            className="space-y-4 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
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
                className="block text-sm mb-2 font-medium text-gray-700"
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
              className={`w-full py-2 px-4 mt-4 rounded text-white focus:outline-none ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-400 hover:bg-bgc-300"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <NavLink to="/register" className="text-bgc-400 hover:underline">
                Sign up
              </NavLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;