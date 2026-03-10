import { useEffect, useState } from "react";
import { getProfile } from "../api/authApi";

export default function Dashboard() {

  const [user, setUser] = useState<any>(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  useEffect(() => {

    const fetchProfile = async () => {

      const token = localStorage.getItem("accessToken");

      if (!token) return;

      try {
        const res = await getProfile();
        setUser(res.data.user);

      } catch (error) {
        console.error(error);
      }

    };

    fetchProfile();

  }, []);

  return (
    <div>

      <h2>Dashboard</h2>

      {user && (
        <>
          <p>User ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}