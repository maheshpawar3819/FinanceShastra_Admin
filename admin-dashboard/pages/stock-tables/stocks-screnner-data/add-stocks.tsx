import AdminLayout from "@/components/ui/AdminLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import "@/styles/globals.css";
import { Toaster, toast } from "sonner";
import { StockScreenerData } from "@/types";

export default function AddStockRecord() {
  const [formData, setFormData] = useState<Omit<StockScreenerData, "id">>({
    CompanyName: "",
    LastTradedPrice: 0,
    ChangePercentage: null,
    MarketCap: null,
    High52W: null,
    Low52W: null,
    Sector: "",
    CurrentPE: null,
    IndexName: null,
    RecordDate: "",
    ROE: null,
    PBV: null,
    EV_EBITDA: null,
    FiveYearSalesGrowth: null,
    FiveYearProfitGrowth: null,
    Volume: null,
    EPS: null,
    EPSGrowth: null,
    DividendYield: null,
    DividendAmount: null,
    ROCE: null,
  });

  console.log(formData);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/stocks_screnner_data/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to add the record. Please try again.");
      }

      toast.success("Stock record added successfully!");
      setTimeout(() => {
        router.push("/stock-tables/stocks-screnner-data");
      }, 1000);

      const data = await res.json();
      setFormData({
        CompanyName: "",
        LastTradedPrice: 0,
        ChangePercentage: null,
        MarketCap: null,
        High52W: null,
        Low52W: null,
        Sector: "",
        CurrentPE: null,
        IndexName: null,
        RecordDate: "",
        ROE: null,
        PBV: null,
        EV_EBITDA: null,
        FiveYearSalesGrowth: null,
        FiveYearProfitGrowth: null,
        Volume: null,
        EPS: null,
        EPSGrowth: null,
        DividendYield: null,
        DividendAmount: null,
        ROCE: null,
      });
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value === "" ? null : value });
  }

  return (
    <AdminLayout>
      <Toaster />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Stock Record
        </h1>

        {successMessage && (
          <p className="text-green-600 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dynamic form fields based on `formData` */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="text-gray-700 font-semibold">
                  {key}:
                </label>
                <input
                  type={
                    key === "CompanyName" ||
                    key === "IndexName" ||
                    key === "Sector"
                      ? "text"
                      : key === "RecordDate"
                      ? "date"
                      : "number"
                  }
                  name={key}
                  value={formData[key as keyof typeof formData] ?? ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-300 w-full"
                  required={
                    ![
                      "id",
                      "ChangePercentage",
                      "MarketCap",
                      "High52W",
                      "Low52W",
                      "IndexName",
                    ].includes(key)
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
