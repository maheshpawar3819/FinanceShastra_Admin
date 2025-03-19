import { useEffect, useState } from "react";
import { StockScreenerValuation } from "@/types";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [data, setData] = useState<StockScreenerValuation[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/stocks_screener_valuetion");
        const result = await res.json();
        setData(result?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (Symbol: string) => {
    if (!confirm("Are you sure you want to delete this stock?")) return;
    try {
      const res = await fetch("/api/stocks_screener_valuetion/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Symbol }),
      });

      if (res.ok) {
        alert("Stock deleted successfully!");
        setData((prevData) => prevData.filter((item) => item.Symbol !== Symbol));
      } else {
        alert("Failed to delete stock");
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Stocks Screener Valuation
      </h1>
      <button
        className="px-4 py-2 bg-purple-500 mb-5 text-white rounded-lg hover:bg-red-600 transition"
        onClick={() => router.push("./add-stocks")}
      >
        Add Stocks
      </button>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Symbol</th>
            <th className="border border-gray-300 px-4 py-2">MarketCap</th>
            <th className="border border-gray-300 px-4 py-2">MarketCapPercentage</th>
            <th className="border border-gray-300 px-4 py-2">PERatio</th>
            <th className="border border-gray-300 px-4 py-2">PSRatio</th>
            <th className="border border-gray-300 px-4 py-2">PBRatio</th>
            <th className="border border-gray-300 px-4 py-2">PFCFRatio</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">EnterpriseValue</th>
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
                <td className="border border-gray-300 px-4 py-2">{record.Symbol}</td>
                <td className="border border-gray-300 px-4 py-2">{record.MarketCap}</td>
                <td className="border border-gray-300 px-4 py-2">{record.MarketCapPercentage}</td>
                <td className="border border-gray-300 px-4 py-2">{record.PERatio}</td>
                <td className="border border-gray-300 px-4 py-2">{record.PSRatio}</td>
                <td className="border border-gray-300 px-4 py-2">{record.PBRatio}</td>
                <td className="border border-gray-300 px-4 py-2">{record.PFCFRatio || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{record.Price}</td>
                <td className="border border-gray-300 px-4 py-2">{record.EnterpriseValue}</td>
                <td className="border border-gray-300 px-4 py-2">{record.EVRevenue}</td>
                <td className="border border-gray-300 px-4 py-2">{record.EVEBIT}</td>
                <td className="border border-gray-300 px-4 py-2">{record.EVEBITDA}</td>
                <td className="p-3 flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleDelete(record.Symbol)}
                  >
                    Delete
                  </button>
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
  );
}
