import jwt from "jsonwebtoken";

const secretKeyEnv = process.env.JWT_SECRET;

export default function authenticate(req, res, next) {
  // Mendapatkan token dari header permintaan
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  if (!secretKeyEnv) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error", data: null });
  }

  const secretKey = secretKeyEnv.toString();

  // Verifikasi token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    // Menyimpan data pengguna yang diverifikasi ke dalam objek permintaan untuk digunakan di handler API berikutnya
    req.headers.user = decoded.user;
    next();
  });
}
