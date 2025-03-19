import React, { useState } from "react";
import AdminNavbar from "../../components/Navbar/Navbar";
import AddSubscription from "./subscription/AddSubscription";
import CreateBlog from "../../components/Blog/CreateBlog";

const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  return (
    <div>
      <AdminNavbar setActiveComponent={setActiveComponent} />
      <div className="content">
        {/* Conditional Rendering */}
        {activeComponent === "addSubscription" && <AddSubscription />}
        {activeComponent === "createBlog" && <CreateBlog />}
      </div>
    </div>
  );
};

export default Dashboard;
