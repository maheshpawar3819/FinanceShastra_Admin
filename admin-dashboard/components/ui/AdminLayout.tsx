import { useState, ReactNode } from "react";
import { Menu, LayoutDashboard, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type AdminLayoutProps = {
  children: ReactNode;
};

 const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-900 text-white transition-all duration-300 p-4 flex flex-col gap-4`}
      >
        <Button variant="ghost" className="mb-4" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </Button>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="flex items-center gap-2 w-full">
              <LayoutDashboard size={20} /> {isOpen && "Dashboard"}
            </Button>
          </Link>
          <Link href="/users">
            <Button variant="ghost" className="flex items-center gap-2 w-full">
              <User size={20} /> {isOpen && "Users"}
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" className="flex items-center gap-2 w-full">
              <Settings size={20} /> {isOpen && "Settings"}
            </Button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Card className="w-full p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-semibold">FinanceShastra Admin Dashboard</h1>
          <Button variant="ghost" className="flex items-center gap-2">
            <User size={20} /> Profile
          </Button>
        </Card>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;

