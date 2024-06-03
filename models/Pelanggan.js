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
    id_kelurahan,
    id_kecamatan,
    id_kabupaten,
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
    this.id_kelurahan = id_kelurahan;
    this.id_kecamatan = id_kecamatan;
    this.id_kabupaten = id_kabupaten;
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
    id_kelurahan,
    id_kecamatan,
    id_kabupaten,
    kelurahan,
    kecamatan,
    kabupaten,
    created_at,
    updated_at
  ) {
    return await excuteQuery({
      query:
        "INSERT INTO data_calon_customer (customer_id, nama, no_wa, email, tgl_lahir, agama, id_pekerjaan, jenis_kelamin, id_kelurahan, id_kecamatan, id_kabupaten, kelurahan, kecamatan, kabupaten, created_at, updated_at) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        nama,
        no_wa,
        email,
        tgl_lahir,
        agama,
        id_pekerjaan,
        jenis_kelamin,
        id_kelurahan,
        id_kecamatan,
        id_kabupaten,
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
      query:
        "SELECT * FROM data_calon_customer JOIN data_pekerjaan_customer ON data_calon_customer.id_pekerjaan = data_pekerjaan_customer.id_pekerjaan WHERE customer_id = ?",
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
          pekerjaan: {
            id_pekerjaan: kategori.id_pekerjaan,
            nama_pekerjaan: kategori.nama_pekerjaan,
          },
          jenis_kelamin: kategori.jenis_kelamin,
          id_kelurahan: kategori.id_kelurahan,
          id_kecamatan: kategori.id_kecamatan,
          id_kabupaten: kategori.id_kabupaten,
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

    if (filter.id_kelurahan) {
      where += `id_kelurahan LIKE '%${filter.id_kelurahan}%' AND`;
    }

    if (filter.id_kecamatan) {
      where += `id_kecamatan LIKE '%${filter.id_kecamatan}%' AND`;
    }

    if (filter.id_kabupaten) {
      where += `id_kabupaten LIKE '%${filter.id_kabupaten}%' AND`;
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
      query: `SELECT * FROM data_calon_customer JOIN data_pekerjaan_customer ON data_calon_customer.id_pekerjaan = data_pekerjaan_customer.id_pekerjaan ${where} ORDER BY customer_id DESC ${pagination}`,
    })
      .then((result) => {
        if (result.length) {
          return result.map((kategori) => {
            return {
              id: kategori.customer_id,
              nama: kategori.nama,
              no_wa: kategori.no_wa,
              email: kategori.email,
              tgl_lahir: kategori.tgl_lahir,
              agama: kategori.agama,
              pekerjaan: {
                id_pekerjaan: kategori.id_pekerjaan,
                nama_pekerjaan: kategori.nama_pekerjaan,
              },
              jenis_kelamin: kategori.jenis_kelamin,
              id_kelurahan: kategori.id_kelurahan,
              id_kecamatan: kategori.id_kecamatan,
              id_kabupaten: kategori.id_kabupaten,
              kelurahan: kategori.kelurahan,
              kecamatan: kategori.kecamatan,
              kabupaten: kategori.kabupaten,
              created_at: kategori.created_at,
              updated_at: kategori.updated_at,
            };
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
    id_kelurahan,
    id_kecamatan,
    id_kabupaten,
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
    id_kelurahan = id_kelurahan ?? kategori.id_kelurahan;
    id_kecamatan = id_kecamatan ?? kategori.id_kecamatan;
    id_kabupaten = id_kabupaten ?? kategori.id_kabupaten;
    kelurahan = kelurahan ?? kategori.kelurahan;
    kecamatan = kecamatan ?? kategori.kecamatan;
    kabupaten = kabupaten ?? kategori.kabupaten;
    created_at = created_at ?? kategori.created_at;
    updated_at = updated_at ?? new Date();

    return await excuteQuery({
      query:
        "UPDATE data_calon_customer SET nama = ?, created_at = ?, updated_at = ?, no_wa = ?, email = ?, tgl_lahir = ?, agama = ?, id_pekerjaan = ?, jenis_kelamin = ?, id_kelurahan = ?, id_kecamatan = ?, id_kabupaten = ?, kelurahan = ?, kecamatan = ?, kabupaten = ? WHERE customer_id = ?",
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
        id_kelurahan,
        id_kecamatan,
        id_kabupaten,
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
          id_kelurahan,
          id_kecamatan,
          id_kabupaten,
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
