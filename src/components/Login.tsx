import React from "react";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const { loginAsAdmin, logout, user } = useAuth();

  return (
    <div className="p-4 bg-white-100 flex gap-4">
      {user ? (
        <>
          <p>Logged in as: {user.role}</p>
          <button onClick={logout} className="border rounded-xs bg-red-600 text-white px-4 py-2">
            Logout
          </button>
        </>
      ) : (
        <button onClick={loginAsAdmin} className="rounded-full bg-blue-600 text-white px-4 py-2">
          Login as Admin
        </button>
      )}
    </div>
  );
};

export default Login;
