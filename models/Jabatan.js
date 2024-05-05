import excuteQuery from "../lib/db";

class Jabatan {
  constructor(id, nama_posisi, status, created_at, updated_at) {
    this.id = id;
    this.nama_posisi = nama_posisi;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async create(nama_posisi, status, created_at, updated_at) {
    return await excuteQuery({
      query:
        "INSERT INTO posisi_user (posisi_id, nama_posisi, status, created_at, updated_at) VALUES (null, ?, ?, ?, ?)",
      values: [
        nama_posisi,
        status ?? "no",
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
      query: "SELECT * FROM posisi_user WHERE posisi_id = ?",
      values: [id],
    })
      .then((result) => {
        const jabatan = result[0];
        if (!jabatan) {
          return null;
        }

        return {
          id: jabatan.posisi_id,
          nama_posisi: jabatan.nama_posisi,
          status: jabatan.status,
          created_at: jabatan.created_at,
          updated_at: jabatan.updated_at,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  static async allWithFilter(filter, page, limit) {
    // Filter data posisi_user berdasarkan nama_posisi, status, paginate, page, limit
    let where = "";

    if (filter.nama_posisi) {
      where += `nama_posisi LIKE '%${filter.nama_posisi}%' AND`;
    }

    if (filter.status) {
      where += `status = '${filter.status}' AND`;
    }

    // Remove the last "AND" from the query
    if (where) {
      where = `WHERE ${where.slice(0, -4)}`;
    }

    // Pagination data posisi_user
    let pagination = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      pagination = `LIMIT ${limit} OFFSET ${offset}`;
    }

    console.log(`SELECT * FROM posisi_user ${where} ${pagination}`);

    return await excuteQuery({
      query: `SELECT * FROM posisi_user ${where} ORDER BY posisi_id DESC ${pagination}`,
    })
      .then((result) => {
        if (result.length) {
          return result.map((posisi) => {
            return new Jabatan(
              posisi.posisi_id,
              posisi.nama_posisi,
              posisi.status,
              posisi.created_at,
              posisi.updated_at
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

  static async update(id, nama, status, created_at, updated_at) {
    // Dapatkan data pengguna sebelum diperbarui
    const jabatan = await Jabatan.findById(id);

    if (!jabatan) {
      throw new Error("Jabatan tidak ditemukan");
    }

    // Ambil data kosong dari parameter yang tidak diisi
    nama = nama ?? jabatan.nama;
    status = status ?? jabatan.status;
    created_at = created_at ?? jabatan.created_at;
    updated_at = updated_at ?? new Date();

    return await excuteQuery({
      query:
        "UPDATE posisi_user SET nama_posisi = ?, status = ?, created_at = ?, updated_at = ? WHERE posisi_id = ?",
      values: [nama, status, created_at, updated_at, id],
    })
      .finally((result) => {
        return new Jabatan(id, nama, created_at, updated_at);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async delete() {
    return await excuteQuery({
      query: "DELETE FROM posisi_user WHERE posisi_id = ?",
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
      query: "DELETE FROM posisi_user WHERE posisi_id = ?",
      values: [id],
    }).finally((result) => {
      return result;
    });
  }
}

export default Jabatan;
