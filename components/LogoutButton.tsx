import React from "react";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        console.log("User successfully logged out");
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
