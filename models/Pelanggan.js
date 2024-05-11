import excuteQuery from "../lib/db";

class Pelanggan {
  constructor(
    id,
    nama,
    no_wa,
    email,
    tgl_lahir,
    agama,
    id_pekerjaan,
    jenis_kelamin,
    kelurahan,
    kecamatan,
    kabupaten,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.nama = nama;
    this.no_wa = no_wa;
    this.email = email;
    this.tgl_lahir = tgl_lahir;
    this.agama = agama;
    this.id_pekerjaan = id_pekerjaan;
    this.jenis_kelamin = jenis_kelamin;
    this.kelurahan = kelurahan;
    this.kecamatan = kecamatan;
    this.kabupaten = kabupaten;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async create(
    nama,
    no_wa,
    email,
    tgl_lahir,
    agama,
    id_pekerjaan,
    jenis_kelamin,
    kelurahan,
    kecamatan,
    kabupaten,
    created_at,
    updated_at
  ) {
    return await excuteQuery({
      query:
        "INSERT INTO data_calon_customer (customer_id, nama, no_wa, email, tgl_lahir, agama, id_pekerjaan, jenis_kelamin, kelurahan, kecamatan, kabupaten, created_at, updated_at) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        nama,
        no_wa,
        email,
        tgl_lahir,
        agama,
        id_pekerjaan,
        jenis_kelamin,
        kelurahan,
        kecamatan,
        kabupaten,
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
      query: "SELECT * FROM data_calon_customer WHERE customer_id = ?",
      values: [id],
    })
      .then((result) => {
        const kategori = result[0];
        if (!kategori) {
          return null;
        }

        return {
          id: kategori.customer_id,
          nama: kategori.nama,
          no_wa: kategori.no_wa,
          email: kategori.email,
          tgl_lahir: kategori.tgl_lahir,
          agama: kategori.agama,
          id_pekerjaan: kategori.id_pekerjaan,
          jenis_kelamin: kategori.jenis_kelamin,
          kelurahan: kategori.kelurahan,
          kecamatan: kategori.kecamatan,
          kabupaten: kategori.kabupaten,
          created_at: kategori.created_at,
          updated_at: kategori.updated_at,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  static async allWithFilter(filter, page, limit) {
    // Filter data data_calon_customer berdasarkan nama, paginate, page, limit
    let where = "";

    if (filter.nama) {
      where += `nama LIKE '%${filter.nama}%' AND`;
    }

    if (filter.no_wa) {
      where += `no_wa LIKE '%${filter.no_wa}%' AND`;
    }

    if (filter.email) {
      where += `email LIKE '%${filter.email}%' AND`;
    }

    if (filter.tgl_lahir) {
      where += `tgl_lahir LIKE '%${filter.tgl_lahir}%' AND`;
    }

    if (filter.agama) {
      where += `agama LIKE '%${filter.agama}%' AND`;
    }

    if (filter.id_pekerjaan) {
      where += `id_pekerjaan LIKE '%${filter.id_pekerjaan}%' AND`;
    }

    if (filter.jenis_kelamin) {
      where += `jenis_kelamin LIKE '%${filter.jenis_kelamin}%' AND`;
    }

    if (filter.kelurahan) {
      where += `kelurahan LIKE '%${filter.kelurahan}%' AND`;
    }

    if (filter.kecamatan) {
      where += `kecamatan LIKE '%${filter.kecamatan}%' AND`;
    }

    if (filter.kabupaten) {
      where += `kabupaten LIKE '%${filter.kabupaten}%' AND`;
    }

    // Remove the last "AND" from the query
    if (where) {
      where = `WHERE ${where.slice(0, -4)}`;
    }

    // Pagination data data_calon_customer
    let pagination = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      pagination = `LIMIT ${limit} OFFSET ${offset}`;
    }

    console.log(`SELECT * FROM data_calon_customer ${where} ${pagination}`);

    return await excuteQuery({
      query: `SELECT * FROM data_calon_customer ${where} ORDER BY customer_id DESC ${pagination}`,
    })
      .then((result) => {
        if (result.length) {
          return result.map((kategori) => {
            return new Pelanggan(
              kategori.customer_id,
              kategori.nama,
              kategori.no_wa,
              kategori.email,
              kategori.tgl_lahir,
              kategori.agama,
              kategori.id_pekerjaan,
              kategori.jenis_kelamin,
              kategori.kelurahan,
              kategori.kecamatan,
              kategori.kabupaten,
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

  static async update(
    id,
    nama,
    no_wa,
    email,
    tgl_lahir,
    agama,
    id_pekerjaan,
    jenis_kelamin,
    kelurahan,
    kecamatan,
    kabupaten,
    created_at,
    updated_at
  ) {
    // Dapatkan data pengguna sebelum diperbarui
    const kategori = await Pelanggan.findById(id);

    if (!kategori) {
      throw new Error("Pelanggan tidak ditemukan");
    }

    // Ambil data kosong dari parameter yang tidak diisi
    nama = nama ?? kategori.nama;
    no_wa = no_wa ?? kategori.no_wa;
    email = email ?? kategori.email;
    tgl_lahir = tgl_lahir ?? kategori.tgl_lahir;
    agama = agama ?? kategori.agama;
    id_pekerjaan = id_pekerjaan ?? kategori.id_pekerjaan;
    jenis_kelamin = jenis_kelamin ?? kategori.jenis_kelamin;
    kelurahan = kelurahan ?? kategori.kelurahan;
    kecamatan = kecamatan ?? kategori.kecamatan;
    kabupaten = kabupaten ?? kategori.kabupaten;
    created_at = created_at ?? kategori.created_at;
    updated_at = updated_at ?? new Date();

    return await excuteQuery({
      query:
        "UPDATE data_calon_customer SET nama = ?, created_at = ?, updated_at = ?, no_wa = ?, email = ?, tgl_lahir = ?, agama = ?, id_pekerjaan = ?, jenis_kelamin = ?, kelurahan = ?, kecamatan = ?, kabupaten = ? WHERE customer_id = ?",
      values: [
        nama,
        created_at,
        updated_at,
        no_wa,
        email,
        tgl_lahir,
        agama,
        id_pekerjaan,
        jenis_kelamin,
        kelurahan,
        kecamatan,
        kabupaten,
        id,
      ],
    })
      .finally((result) => {
        return new Pelanggan(
          id,
          nama,
          no_wa,
          email,
          tgl_lahir,
          agama,
          id_pekerjaan,
          jenis_kelamin,
          kelurahan,
          kecamatan,
          kabupaten,
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
      query: "DELETE FROM data_calon_customer WHERE customer_id = ?",
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
      query: "DELETE FROM data_calon_customer WHERE customer_id = ?",
      values: [id],
    }).finally((result) => {
      return result;
    });
  }
}

export default Pelanggan;
