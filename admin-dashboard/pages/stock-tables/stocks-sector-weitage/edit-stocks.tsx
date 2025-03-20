import AdminLayout from "@/components/ui/AdminLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "@/styles/globals.css";
import { Toaster, toast } from "sonner";
import { SectorWeightage } from "@/types";

export default function UpdateStocks() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState<SectorWeightage>({
    id:0,
    Sector: " ",
    NumberOfCompanies: 0,
    Weightage: 0,
    MarketCap: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch stock details if ID is available
  useEffect(() => {
    if (!id) return;

    async function fetchStockData() {
      try {
        const res = await fetch(`/api/stocks_sector_weitage/${id}`, {
          method: "GET",
        });
        if (!res.ok) throw new Error("Failed to fetch stock details.");
        const data = await res.json();
        console.log(data[0].id);
        console.log(data);

        setFormData((prev: any) => ({
          ...prev, 
          id: data[0].id, 
          Sector: data[0].Sector,
          NumberOfCompanies: data[0].NumberOfCompanies,
          Weightage: data[0].Weightage,
          MarketCap: data[0].MarketCap,
        }));
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();
  }, [id]);

  // Handle input changes
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "Sector" ? value : parseFloat(value) || 0,
    });
  }

  // Handle form submission
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/stocks_sector_weitage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok)
        throw new Error("Failed to update the record. Please try again.");

      toast.success("Stock record updated successfully!");
      setTimeout(() => {
        router.push("/stock-tables/stocks-sector-weitage");
      }, 1000);
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  }

  if (loading)
    return <p className="text-center text-gray-600">Loading stock data...</p>;

  return (
    <AdminLayout>
      <Toaster />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Stock Record
        </h1>

        {errorMessage && (
          <p className="text-red-600 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData)
              .filter((key) => key !== "id" && key !== "0")
              .map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="text-gray-700 font-semibold">{key}:</label>
                  <input
                    type={key === "Sector" ? "text" : "number"}
                    name={key}
                    value={formData[key as keyof typeof formData] ?? ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-300 w-full"
                    required
                  />
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              Update Record
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
