import excuteQuery from "../lib/db";

class Kategori {
  constructor(id, nama_kategori, status_kategori, created_at, updated_at) {
    this.id = id;
    this.nama_kategori = nama_kategori;
    this.status_kategori = status_kategori;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async create(nama_kategori, status_kategori, created_at, updated_at) {
    return await excuteQuery({
      query:
        "INSERT INTO kategori_kontak (kategori_id, nama_kategori, status_kategori, created_at, updated_at) VALUES (null, ?, ?, ?, ?)",
      values: [
        nama_kategori,
        status_kategori ?? "no",
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
      query: "SELECT * FROM kategori_kontak WHERE kategori_id = ?",
      values: [id],
    })
      .then((result) => {
        const kategori = result[0];
        if (!kategori) {
          return null;
        }

        return {
          id: kategori.kategori_id,
          nama_kategori: kategori.nama_kategori,
          status_kategori: kategori.status_kategori,
          created_at: kategori.created_at,
          updated_at: kategori.updated_at,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  static async allWithFilter(filter, page, limit) {
    // Filter data kategori_kontak berdasarkan nama_kategori, status_kategori, paginate, page, limit
    let where = "";

    if (filter.nama_kategori) {
      where += `nama_kategori LIKE '%${filter.nama_kategori}%' AND`;
    }

    if (filter.status_kategori) {
      where += `status_kategori = '${filter.status_kategori}' AND`;
    }

    // Remove the last "AND" from the query
    if (where) {
      where = `WHERE ${where.slice(0, -4)}`;
    }

    // Pagination data kategori_kontak
    let pagination = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      pagination = `LIMIT ${limit} OFFSET ${offset}`;
    }

    console.log(`SELECT * FROM kategori_kontak ${where} ${pagination}`);

    return await excuteQuery({
      query: `SELECT * FROM kategori_kontak ${where} ORDER BY kategori_id DESC ${pagination}`,
    })
      .then((result) => {
        if (result.length) {
          return result.map((kategori) => {
            return new Kategori(
              kategori.kategori_id,
              kategori.nama_kategori,
              kategori.alamat_cabang,
              kategori.nomor,
              kategori.status_kategori,
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

  static async update(id, nama, status_kategori, created_at, updated_at) {
    // Dapatkan data pengguna sebelum diperbarui
    const kategori = await Kategori.findById(id);

    if (!kategori) {
      throw new Error("Kategori tidak ditemukan");
    }

    // Ambil data kosong dari parameter yang tidak diisi
    nama = nama ?? kategori.nama_kategori;
    status_kategori = status_kategori ?? kategori.status_kategori;
    created_at = created_at ?? kategori.created_at;
    updated_at = updated_at ?? new Date();

    return await excuteQuery({
      query:
        "UPDATE kategori_kontak SET nama_kategori = ?, status_kategori = ?, created_at = ?, updated_at = ? WHERE kategori_id = ?",
      values: [nama, status_kategori, created_at, updated_at, id],
    })
      .finally((result) => {
        return new Kategori(id, nama, status_kategori, created_at, updated_at);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async delete() {
    return await excuteQuery({
      query: "DELETE FROM kategori_kontak WHERE kategori_id = ?",
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
      query: "DELETE FROM kategori_kontak WHERE kategori_id = ?",
      values: [id],
    }).finally((result) => {
      return result;
    });
  }
}

export default Kategori;
