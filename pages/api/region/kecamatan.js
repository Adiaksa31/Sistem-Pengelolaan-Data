import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // Mengambil ID kabupaten dari query parameter
    const { id } = req.query;

    if (!id) {
      // Jika tidak ada ID, kembalikan kesalahan bad request
      res.status(400).json({ error: "ID kabupaten tidak ditemukan dalam permintaan" });
      return;
    }

    const response = await fetch(
      `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${id}.json`
    );

    if (!response.ok) {
      // Jika respon tidak berhasil, kembalikan kesalahan dari API eksternal
      res.status(response.status).json({ error: "Gagal mengambil data" });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    // Tangani kesalahan apapun yang terjadi selama pemrosesan permintaan
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Kesalahan Internal Server" });
  }
}
