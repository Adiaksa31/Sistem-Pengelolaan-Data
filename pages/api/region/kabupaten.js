// pages/api/kabupaten.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://emsifa.github.io/api-wilayah-indonesia/api/regencies/51.json"
    );
    if (!response.ok) {
      res.status(response.status).json({ error: "Failed to fetch data" });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
