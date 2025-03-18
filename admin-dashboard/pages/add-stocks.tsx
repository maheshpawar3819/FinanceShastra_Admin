import { useRouter } from "next/router";
import { useState } from "react";

export default function AddStockRecord() {
  const [formData, setFormData] = useState({
    Symbol: "",
    MarketCap: 0,
    MarketCapPercentage: 0,
    PERatio: 0,
    PSRatio: 0,
    PBRatio: 0,
    PFCFRatio: 0,
    Price: 0,
    EnterpriseValue: 0,
    EVRevenue: 0,
    EVEBIT: 0,
    EVEBITDA: 0,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Handle form submission
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/stocks_screener_valuetion/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to add the record. Please try again.");
      } else {
        router.push("/");
      }

      const data = await res.json();
      setSuccessMessage(data.message);
      setFormData({
        Symbol: "",
        MarketCap: 0,
        MarketCapPercentage: 0,
        PERatio: 0,
        PSRatio: 0,
        PBRatio: 0,
        PFCFRatio: 0,
        Price: 0,
        EnterpriseValue: 0,
        EVRevenue: 0,
        EVEBIT: 0,
        EVEBITDA: 0,
      });
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  }

  // Handle input changes
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Add Stock Record</h1>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label>Symbol:</label>
          <input
            type="text"
            name="Symbol"
            value={formData.Symbol}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>MarketCap:</label>
          <input
            type="number"
            name="MarketCap"
            value={formData.MarketCap}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>MarketCapPercentage:</label>
          <input
            type="number"
            name="MarketCapPercentage"
            step="0.01"
            value={formData.MarketCapPercentage}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>PERatio:</label>
          <input
            type="number"
            name="PERatio"
            step="0.01"
            value={formData.PERatio}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>PSRatio:</label>
          <input
            type="number"
            name="PSRatio"
            step="0.01"
            value={formData.PSRatio}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>PBRatio:</label>
          <input
            type="number"
            name="PBRatio"
            step="0.01"
            value={formData.PBRatio}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>PFCFRatio:</label>
          <input
            type="number"
            name="PFCFRatio"
            step="0.01"
            value={formData.PFCFRatio}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Price:</label>
          <input
            type="number"
            name="Price"
            step="0.01"
            value={formData.Price}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>EnterpriseValue:</label>
          <input
            type="number"
            name="EnterpriseValue"
            step="0.01"
            value={formData.EnterpriseValue}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>EVRevenue:</label>
          <input
            type="number"
            name="EVRevenue"
            step="0.01"
            value={formData.EVRevenue}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>EVEBIT:</label>
          <input
            type="number"
            name="EVEBIT"
            step="0.01"
            value={formData.EVEBIT}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>EVEBITDA:</label>
          <input
            type="number"
            name="EVEBITDA"
            step="0.01"
            value={formData.EVEBITDA}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Record</button>
      </form>
    </div>
  );
}
