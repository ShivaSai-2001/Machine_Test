import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../api/apiCall";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../redux/slices/adminSlice";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleLogin = async () => {
    const data = {
      username,
      password,
    };

    try {
      const response = await postLogin(data);

      if (response?.status !== 200) {
        setErr("Invalid Details!");
        // toast.error("Invalid email or password");
      } else {
        dispatch(setAdmin(response.data));
        navigate("/");
        toast.success("Logged in successfully");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErr("An error occurred during login.");
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 rounded-tl">
      <form>
        <div className="bg-white p-8 rounded shadow-md w-80">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {err && <p className="text-red-500 mb-4">{err}</p>}
          <button
            type="button"
            className="w-full bg-black text-white p-2 rounded hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
