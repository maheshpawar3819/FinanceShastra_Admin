import { useEffect, useState } from "react";
import { StockScreenerValuation } from "@/types";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/ui/AdminLayout";
import { Toaster, toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const [data, setData] = useState<StockScreenerValuation[]>([]);
  const [deleteSymbol, setDeleteSymbol] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/stocks_screener_valuetion");
      const result = await res.json();
      setData(result?.data);
    }
    fetchData();
  }, []);

  // Delete record only after confirmation
  const handleDelete = async () => {
    if (!deleteSymbol) return;

    try {
      const res = await fetch("/api/stocks_screener_valuetion/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Symbol: deleteSymbol }),
      });

      if (res.ok) {
        toast.success("Stock deleted successfully!");
        setData((prevData) =>
          prevData.filter((stock) => stock.Symbol !== deleteSymbol)
        );
      } else {
        toast.error("An error occurred while deleting.");
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
      toast.error("An error occurred while deleting.");
    }

    setDeleteSymbol(null);
  };

  return (
    <div>
      <AdminLayout>
        <Toaster />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            Stocks Screener Valuation
          </h1>
          <Button
            variant="default"
            className="mb-6"
            onClick={() => router.push("/stocks-valuation/add-stocks")}
          >
            Add Stocks
          </Button>
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Symbol</th>
                <th className="border border-gray-300 px-4 py-2">MarketCap</th>
                <th className="border border-gray-300 px-4 py-2">
                  MarketCapPercentage
                </th>
                <th className="border border-gray-300 px-4 py-2">PERatio</th>
                <th className="border border-gray-300 px-4 py-2">PSRatio</th>
                <th className="border border-gray-300 px-4 py-2">PBRatio</th>
                <th className="border border-gray-300 px-4 py-2">PFCFRatio</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">
                  EnterpriseValue
                </th>
                <th className="border border-gray-300 px-4 py-2">EVRevenue</th>
                <th className="border border-gray-300 px-4 py-2">EVEBIT</th>
                <th className="border border-gray-300 px-4 py-2">EVEBITDA</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((record) => (
                  <tr key={record.Symbol}>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.Symbol}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.MarketCap}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.MarketCapPercentage}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.PERatio}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.PSRatio}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.PBRatio}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.PFCFRatio || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.Price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.EnterpriseValue}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.EVRevenue}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.EVEBIT}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.EVEBITDA}
                    </td>
                    <td className="p-3 flex space-x-2">
                      <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            onClick={() => setDeleteSymbol(record.Symbol)}
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirm Deletion
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {deleteSymbol}?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => setDeleteSymbol(null)}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={13} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </div>
  );
}
