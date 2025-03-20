import React, { useState } from "react";
import AdminNavbar from "../../components/Navbar/Navbar";
import AddSubscription from "./subscription/AddSubscription";
import ManageSubscription from './subscription/ManageSubscription'
import CreateBlog from "../../components/Blog/CreateBlog";
import EditDeleteBlog from "@/components/Blog/EditDeleteBlog";
import Users from '../../components/users'
import Recommendation from '../../components/recommendation'



const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>('users');

  return (
    <div>
      <AdminNavbar setActiveComponent={setActiveComponent} />
      <div className="content">
        {}
        {/* Conditional Rendering */}
        {activeComponent === "addSubscription" && <AddSubscription />}
        {activeComponent === "manage-subscription" && <ManageSubscription />}
        {activeComponent === "users" && <Users />}
        {activeComponent === "recommendations" && <Recommendation />}
        {activeComponent === "createBlog" && <CreateBlog />}
        {activeComponent === "editdelete-blog" && <EditDeleteBlog />}
      </div>
    </div>
  );
};

export default Dashboard;
