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
        "INSERT INTO jabatan (posisi_id, nama_posisi, status, created_at, updated_at) VALUES (null, ?, ?, ?, ?)",
      values: [
        nama_posisi,
        status ?? "no",
        created_at ?? new Date(),
        updated_at ?? new Date(),
      ],
    }).finally((result) => {
      return new Jabatan(
        result.posisi_id,
        nama_posisi,
        status,
        created_at,
        updated_at
      );
    });
  }

  static async findById(id) {
    return await excuteQuery({
      query: "SELECT * FROM jabatan WHERE posisi_id = ?",
      values: [id],
    }).then((result) => {
      return new Jabatan(
        result.posisi_id,
        result.nama_posisi,
        result.status,
        result.created_at,
        result.updated_at
      );
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
      where = `WHERE ${where.slice(0, -5)}`;
    }

    // Pagination data posisi_user
    let pagination = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      pagination = `LIMIT ${limit} OFFSET ${offset}`;
    }

    return await excuteQuery({
      query: `SELECT * FROM jabatan ${where} ${pagination}`,
    })
      .then((result) => {
        return result.map((jabatan) => {
          return new Jabatan(
            jabatan.posisi_id,
            jabatan.nama_posisi,
            jabatan.status,
            jabatan.created_at,
            jabatan.updated_at
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async update() {
    return await excuteQuery({
      query:
        "UPDATE jabatan SET nama_posisi = ?, status = ?, updated_at = ? WHERE posisi_id = ?",
      values: [this.nama_posisi, this.status, new Date(), this.id],
    }).finally((result) => {
      return new Jabatan(
        this.id,
        this.nama_posisi,
        this.status,
        this.created_at,
        this.updated_at
      );
    });
  }

  async delete() {
    return await excuteQuery({
      query: "DELETE FROM jabatan WHERE posisi_id = ?",
      values: [this.id],
    }).finally((result) => {
      return result;
    });
  }

  static async delete(id) {
    return await excuteQuery({
      query: "DELETE FROM jabatan WHERE posisi_id = ?",
      values: [id],
    }).finally((result) => {
      return result;
    });
  }
}

export default Jabatan;
