import excuteQuery from "../lib/db";
import bcrypt from "bcrypt";

class User {
  constructor(
    id,
    nama,
    email,
    nomor,
    posisi_id,
    cabang_id,
    status_user,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.nama = nama;
    this.email = email;
    this.nomor = nomor;
    this.posisi_id = posisi_id;
    this.cabang_id = cabang_id;
    this.status_user = status_user;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async create(
    nama,
    email,
    nomor,
    password,
    posisi_id,
    cabang_id,
    status_user,
    created_at,
    updated_at
  ) {
    const salt = bcrypt.genSaltSync(10);
    const bcryptPassword = bcrypt.hashSync(password, salt);
    return await excuteQuery({
      query:
        "INSERT INTO user (user_id, nama_user, nomor, email, password, posisi_id, cabang_id, status_user, created_at, updated_at) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        nama,
        nomor,
        email,
        bcryptPassword,
        posisi_id,
        cabang_id,
        status_user ?? "no",
        created_at ?? new Date(),
        updated_at ?? new Date(),
      ],
    })
      .finally((result) => {
        return new User(
          nama,
          email,
          nomor,
          posisi_id,
          cabang_id,
          status_user,
          created_at,
          updated_at
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Metode untuk menghapus data pengguna
  static async delete(id) {
    return await excuteQuery({
      query: "DELETE FROM user WHERE user_id = ?",
      values: [id],
    })
      .finally((result) => {
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Metode untuk memperbarui data pengguna
  static async update(
    id,
    nama,
    email,
    nomor,
    password,
    posisi_id,
    cabang_id,
    status_user,
    created_at,
    updated_at
  ) {
    // Dapatkan data pengguna sebelum diperbarui
    const user = await User.findById(id);

    // Ambil data kosong dari parameter yang tidak diisi
    nama = nama ?? user.nama;
    email = email ?? user.email;
    nomor = nomor ?? user.nomor;
    password = password ?? user.password;
    posisi_id = posisi_id ?? user.posisi_id;
    cabang_id = cabang_id ?? user.cabang_id;
    status_user = status_user ?? user.status_user;
    created_at = created_at ?? user.created_at;
    updated_at = updated_at ?? new Date();

    // Enkripsi password jika ada
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
    }

    return await excuteQuery({
      query:
        "UPDATE user SET nama_user = ?, email = ?, nomor = ?, password = ?, posisi_id = ?, cabang_id = ?, status_user = ?, created_at = ?, updated_at = ? WHERE user_id = ?",
      values: [
        nama,
        email,
        nomor,
        password,
        posisi_id,
        cabang_id,
        status_user,
        created_at,
        updated_at,
        id,
      ],
    })
      .finally((result) => {
        return new User(
          id,
          nama,
          email,
          nomor,
          posisi_id,
          cabang_id,
          status_user,
          created_at,
          updated_at
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Metode untuk mencari data pengguna berdasarkan ID
  static async findById(id) {
    return await excuteQuery({
      query: "SELECT * FROM user WHERE user_id = ?",
      values: [id],
    })
      .then((result) => {
        const user = result[0];
        if (!user) {
          return null;
        }

        return new User(
          user.user_id,
          user.nama_user,
          user.email,
          user.nomor,
          user.posisi_id,
          user.cabang_id,
          user.status_user,
          user.created_at,
          user.updated_at
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Metode untuk mencari data pengguna berdasarkan email
  static async findByEmail(email) {
    return await excuteQuery({
      query: "SELECT * FROM user WHERE email = ?",
      values: [email],
    })
      .then((result) => {
        const user = result[0];
        if (!user) {
          return null;
        }

        return new User(
          user.user_id,
          user.nama_user,
          user.email,
          user.nomor,
          user.posisi_id,
          user.cabang_id,
          user.status_user,
          user.created_at,
          user.updated_at
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Metode untuk memvalidasi data pengguna sebelum disimpan
  validate() {
    if (!this.nama) {
      throw new Error("Nama pengguna harus diisi");
    }
    if (!this.email) {
      throw new Error("Email pengguna harus diisi");
    }
    if (!this.nomor) {
      throw new Error("Nomor pengguna harus diisi");
    }
    if (!this.posisi_id) {
      throw new Error("Posisi pengguna harus diisi");
    }
    if (!this.cabang_id) {
      throw new Error("Cabang pengguna harus diisi");
    }
    if (!this.status_user) {
      throw new Error("Status pengguna harus diisi");
    }
    if (!this.created_at) {
      throw new Error("Tanggal dibuat pengguna harus diisi");
    }
    if (!this.updated_at) {
      throw new Error("Tanggal diperbarui pengguna harus diisi");
    }
  }

  // Metode untuk mengembalikan semua data pengguna dengan filter dan pagination
  static async allWithFilter(filter, page, limit) {
    // Filter data pengguna berdasarkan nama, nomor, email, posisi_id, cabang_id, status, paginate, page, limit
    let where = "";

    const { nama, nomor, email, posisi_id, cabang_id, status_user } = filter;
    if (filter) {
      // check if each filter exists
      if (nama) {
        where += `nama_user LIKE '%${nama}%' AND `;
      }
      if (nomor) {
        where += `nomor LIKE '%${nomor}%' AND `;
      }
      if (email) {
        where += `email LIKE '%${email}%' AND `;
      }
      if (posisi_id) {
        where += `posisi_id = ${posisi_id} AND `;
      }
      if (cabang_id) {
        where += `cabang_id = ${cabang_id} AND `;
      }
      if (status_user) {
        where += `status_user = '${status_user}' AND `;
      }
    }

    // Remove the last "AND" from the query
    if (where) {
      where = `WHERE ${where.slice(0, -5)}`;
    }

    // Pagination data pengguna
    let pagination = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      pagination = `LIMIT ${limit} OFFSET ${offset}`;
    }

    console.log(`SELECT * FROM user ${where} ${pagination}`);

    return await excuteQuery({
      query: `SELECT * FROM user ${where} ${pagination}`,
    })
      .then((result) => {
        return result.map((user) => {
          return new User(
            user.user_id,
            user.nama_user,
            user.email,
            user.nomor,
            user.posisi_id,
            user.cabang_id,
            user.status_user,
            user.created_at,
            user.updated_at
          );
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Relasi
  // Metode untuk menghubungkan data pengguna dengan data posisi
  getPosisiName() {
    return excuteQuery({
      query: "SELECT nama_posisi FROM posisi_user WHERE id = ?",
      values: [this.posisi_id],
    }).then((result) => {
      return result[0];
    });
  }

  // Metode untuk mengembalikan data pengguna dalam bentuk objek
  toJSON() {
    return {
      id: this.id,
      nama: this.nama,
      email: this.email,
      nomor: this.nomor,
      posisi_id: this.posisi_id,
      cabang_id: this.cabang_id,
      status_user: this.status_user,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default User;
