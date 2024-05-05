import excuteQuery from "../lib/db";

class Cabang {
  constructor(
    id,
    nama_cabang,
    alamat_cabang,
    nomor,
    status_cabang,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.nama_cabang = nama_cabang;
    this.status_cabang = status_cabang;
    this.alamat_cabang = alamat_cabang;
    this.nomor = nomor;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async create(
    nama_cabang,
    alamat,
    nomor,
    status_cabang,
    created_at,
    updated_at
  ) {
    return await excuteQuery({
      query:
        "INSERT INTO cabang_dealer (cabang_id, nama_cabang, alamat_cabang, nomor, status_cabang, created_at, updated_at) VALUES (null, ?, ?, ?, ?, ?, ?)",
      values: [
        nama_cabang,
        alamat,
        nomor,
        status_cabang ?? "no",
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
      query: "SELECT * FROM cabang_dealer WHERE cabang_id = ?",
      values: [id],
    })
      .then((result) => {
        const cabang = result[0];
        if (!cabang) {
          return null;
        }

        return {
          id: cabang.cabang_id,
          nama_cabang: cabang.nama_cabang,
          alamat_cabang: cabang.alamat_cabang,
          nomor: cabang.nomor,
          status_cabang: cabang.status_cabang,
          created_at: cabang.created_at,
          updated_at: cabang.updated_at,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  static async allWithFilter(filter, page, limit) {
    // Filter data cabang_dealer berdasarkan nama_cabang, status_cabang, paginate, page, limit
    let where = "";

    if (filter.nama_cabang) {
      where += `nama_cabang LIKE '%${filter.nama_cabang}%' AND`;
    }

    if (filter.status_cabang) {
      where += `status_cabang = '${filter.status_cabang}' AND`;
    }

    if (filter.nomor) {
      where += `nomor LIKE '%${filter.nomor}%' AND`;
    }

    if (filter.alamat_cabang) {
      where += `alamat_cabang LIKE '%${filter.alamat_cabang}%' AND`;
    }

    // Remove the last "AND" from the query
    if (where) {
      where = `WHERE ${where.slice(0, -4)}`;
    }

    // Pagination data cabang_dealer
    let pagination = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      pagination = `LIMIT ${limit} OFFSET ${offset}`;
    }

    console.log(`SELECT * FROM cabang_dealer ${where} ${pagination}`);

    return await excuteQuery({
      query: `SELECT * FROM cabang_dealer ${where} ORDER BY cabang_id DESC ${pagination}`,
    })
      .then((result) => {
        if (result.length) {
          return result.map((cabang) => {
            return new Cabang(
              cabang.cabang_id,
              cabang.nama_cabang,
              cabang.alamat_cabang,
              cabang.nomor,
              cabang.status_cabang,
              cabang.created_at,
              cabang.updated_at
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

  static async update(
    id,
    nama,
    alamat,
    nomor,
    status_cabang,
    created_at,
    updated_at
  ) {
    // Dapatkan data pengguna sebelum diperbarui
    const cabang = await Cabang.findById(id);

    if (!cabang) {
      throw new Error("Cabang tidak ditemukan");
    }

    // Ambil data kosong dari parameter yang tidak diisi
    nama = nama ?? cabang.nama_cabang;
    alamat = alamat ?? cabang.alamat_cabang;
    nomor = nomor ?? cabang.nomor;
    status_cabang = status_cabang ?? cabang.status_cabang;
    created_at = created_at ?? cabang.created_at;
    updated_at = updated_at ?? new Date();

    return await excuteQuery({
      query:
        "UPDATE cabang_dealer SET nama_cabang = ?, alamat_cabang = ?, nomor = ?, status_cabang = ?, created_at = ?, updated_at = ? WHERE cabang_id = ?",
      values: [nama, alamat, nomor, status_cabang, created_at, updated_at, id],
    })
      .finally((result) => {
        return new Cabang(
          id,
          nama,
          alamat,
          nomor,
          status_cabang,
          created_at,
          updated_at
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async delete() {
    return await excuteQuery({
      query: "DELETE FROM cabang_dealer WHERE cabang_id = ?",
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
      query: "DELETE FROM cabang_dealer WHERE cabang_id = ?",
      values: [id],
    }).finally((result) => {
      return result;
    });
  }
}

export default Cabang;
