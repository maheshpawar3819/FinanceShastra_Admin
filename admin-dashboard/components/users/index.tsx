import React, { useEffect, useState } from 'react';

const UsersPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<Array<Record<string, any>>>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users/getUsers");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data[0]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Users Page</h1>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
          <thead style={{ background: "#198754", color: "white" }}>
            <tr>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>User ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Username</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>First Name</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Last Name</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Phone Number</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Country</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>State</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>City</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Occupation</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Industry</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Income</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.user_details_id} style={{ background: "#f9f9f9", textAlign: "center" }}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.user_id}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.username}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.first_name}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.last_name}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.email}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.phone_number}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.country}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.state}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.city}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.occupation}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.industry}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.income}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} style={{ textAlign: "center", padding: "10px" }}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
