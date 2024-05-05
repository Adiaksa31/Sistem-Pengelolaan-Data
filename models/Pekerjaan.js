import excuteQuery from "../lib/db";

class Pekerjaan {
  constructor(id, nama_pekerjaan, created_at, updated_at) {
    this.id = id;
    this.nama_pekerjaan = nama_pekerjaan;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async create(nama_pekerjaan, created_at, updated_at) {
    return await excuteQuery({
      query:
        "INSERT INTO data_pekerjaan_customer (id_pekerjaan, nama_pekerjaan, created_at, updated_at) VALUES (null, ?, ?, ?)",
      values: [
        nama_pekerjaan,
        created_at ?? new Date(),
        updated_at ?? new Date(),
      ],
    })
      .finally((result) => {
        return true;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  static async findById(id) {
    return await excuteQuery({
      query: "SELECT * FROM data_pekerjaan_customer WHERE id_pekerjaan = ?",
      values: [id],
    })
      .then((result) => {
        const kategori = result[0];
        if (!kategori) {
          return null;
        }

        return {
          id: kategori.id_pekerjaan,
          nama_pekerjaan: kategori.nama_pekerjaan,
          created_at: kategori.created_at,
          updated_at: kategori.updated_at,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  static async allWithFilter(filter, page, limit) {
    // Filter data data_pekerjaan_customer berdasarkan nama_pekerjaan, paginate, page, limit
    let where = "";

    if (filter.nama_pekerjaan) {
      where += `nama_pekerjaan LIKE '%${filter.nama_pekerjaan}%' AND`;
    }

    // Remove the last "AND" from the query
    if (where) {
      where = `WHERE ${where.slice(0, -4)}`;
    }

    // Pagination data data_pekerjaan_customer
    let pagination = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      pagination = `LIMIT ${limit} OFFSET ${offset}`;
    }

    console.log(`SELECT * FROM data_pekerjaan_customer ${where} ${pagination}`);

    return await excuteQuery({
      query: `SELECT * FROM data_pekerjaan_customer ${where} ORDER BY id_pekerjaan DESC ${pagination}`,
    })
      .then((result) => {
        if (result.length) {
          return result.map((kategori) => {
            return new Pekerjaan(
              kategori.id_pekerjaan,
              kategori.nama_pekerjaan,
              kategori.created_at,
              kategori.updated_at
            );
          });
        } else {
          return [];
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  static async update(id, nama, created_at, updated_at) {
    // Dapatkan data pengguna sebelum diperbarui
    const kategori = await Pekerjaan.findById(id);

    if (!kategori) {
      throw new Error("Pekerjaan tidak ditemukan");
    }

    // Ambil data kosong dari parameter yang tidak diisi
    nama = nama ?? kategori.nama_pekerjaan;
    created_at = created_at ?? kategori.created_at;
    updated_at = updated_at ?? new Date();

    return await excuteQuery({
      query:
        "UPDATE data_pekerjaan_customer SET nama_pekerjaan = ?, created_at = ?, updated_at = ? WHERE id_pekerjaan = ?",
      values: [nama, created_at, updated_at, id],
    })
      .finally((result) => {
        return new Pekerjaan(id, nama, created_at, updated_at);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async delete() {
    return await excuteQuery({
      query: "DELETE FROM data_pekerjaan_customer WHERE id_pekerjaan = ?",
      values: [this.id],
    })
      .finally((result) => {
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  static async delete(id) {
    return await excuteQuery({
      query: "DELETE FROM data_pekerjaan_customer WHERE id_pekerjaan = ?",
      values: [id],
    }).finally((result) => {
      return result;
    });
  }
}

export default Pekerjaan;
