import { useEffect, useState } from "react";
import { StockScreenerIncomeStatement, StockScreenerValuation } from "@/types";
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
  const [data, setData] = useState<StockScreenerIncomeStatement[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/stocks_screener_inc_stet");
      const result = await res.json();
      console.log(result)
      setData(result?.data);
    }
    fetchData();
  }, []);

  // Delete record only after confirmation
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch("/api/stocks_screener_inc_stet/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });

      if (res.ok) {
        toast.success("Stock deleted successfully!");
        setData((prevData) =>
          prevData.filter((stock) => stock.id !== deleteId)
        );
      } else {
        toast.error("An error occurred while deleting.");
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
      toast.error("An error occurred while deleting.");
    }

    setDeleteId(null);
  };

  console.log(data);

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
            onClick={() =>
              router.push("/stock-tables/stocks-screener-inc-stet/add-stocks")
            }
          >
            Add Stocks
          </Button>
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Symbol</th>
                <th className="border border-gray-300 px-4 py-2">Revenue</th>
                <th className="border border-gray-300 px-4 py-2">
                  RevenueGrowth
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  GrossProfit
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  OperatingIncome
                </th>
                <th className="border border-gray-300 px-4 py-2">NetIncome</th>
                <th className="border border-gray-300 px-4 py-2">EBITDA</th>
                <th className="border border-gray-300 px-4 py-2">
                  EPS_Diluted
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  EPSDilutedGrowth
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((record) => (
                  <tr key={record.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.Symbol}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.Revenue}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.RevenueGrowth}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.GrossProfit}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.OperatingIncome}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.NetIncome}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.EBITDA}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.EPS_Diluted}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.EPSDilutedGrowth}
                    </td>
                    <td className="p-3 flex space-x-2">
                      <Button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        onClick={() => {
                          router.push(
                            `/stock-tables/stocks-screener-inc-stet/edit-stocks?id=${record.id}`
                          );
                        }}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            onClick={() => setDeleteId(record.id)}
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
                              Are you sure you want to delete {record.Symbol}?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => setDeleteId(null)}
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
