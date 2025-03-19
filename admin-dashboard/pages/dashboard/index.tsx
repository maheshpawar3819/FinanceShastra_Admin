import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AddSubscription from './subscription/AddSubscription';
import CreateBlog from "../../components/Blog/CreateBlog";
import { useRouter } from "next/router";

const dashboard = () => {

  const router = useRouter();
  const { pathname } = router;

  return (
    <div>
      <Navbar />
      <div className="content">
        {pathname === "/subscription/AddSubscription" && <AddSubscription />}

        {pathname === "/create-blog" && <CreateBlog />}
      </div>
    </div>
  )
}

export default dashboard
