import excuteQuery from "../lib/db";

class Pesanan {
  constructor(
    id,
    kategori_id,
    customer_id,
    sumber,
    type_motor,
    warna_motor,
    model_motor,
    jenis_pembayaran,
    jenis_service,
    jadwal_service,
    jenis_sparepart,
    nama_sparepart,
    jenis_keluhan,
    jenis_informasi,
    keterangan,
    cabang_id,
    crm_id,
    tujuan_user,
    status_kontak,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.kategori_id = kategori_id;
    this.customer_id = customer_id;
    this.sumber = sumber;
    this.type_motor = type_motor;
    this.warna_motor = warna_motor;
    this.model_motor = model_motor;
    this.jenis_pembayaran = jenis_pembayaran;
    this.jenis_service = jenis_service;
    this.jadwal_service = jadwal_service;
    this.jenis_sparepart = jenis_sparepart;
    this.nama_sparepart = nama_sparepart;
    this.jenis_keluhan = jenis_keluhan;
    this.jenis_informasi = jenis_informasi;
    this.keterangan = keterangan;
    this.cabang_id = cabang_id;
    this.crm_id = crm_id;
    this.tujuan_user = tujuan_user;
    this.status_kontak = status_kontak;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async create(
    kategori_id,
    customer_id,
    sumber,
    type_motor,
    warna_motor,
    model_motor,
    jenis_pembayaran,
    jenis_service,
    jadwal_service,
    jenis_sparepart,
    nama_sparepart,
    jenis_keluhan,
    jenis_informasi,
    keterangan,
    cabang_id,
    crm_id,
    tujuan_user,
    status_kontak,
    created_at,
    updated_at
  ) {
    return await excuteQuery({
      query:
        "INSERT INTO kontak_masuk (kontak_masuk_id, kategori_id, customer_id, sumber, type_motor, warna_motor, model_motor, jenis_pembayaran, jenis_service, jadwal_service, jenis_sparepart, nama_sparepart, jenis_keluhan, jenis_informasi, keterangan, cabang_id, crm_id, tujuan_user, status_kontak, created_at, updated_at) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        kategori_id,
        customer_id,
        sumber,
        type_motor ? type_motor : null,
        warna_motor ? warna_motor : null,
        model_motor ? model_motor : null,
        jenis_pembayaran ? jenis_pembayaran : null,
        jenis_service ? jenis_service : null,
        jadwal_service ? jadwal_service : null,
        jenis_sparepart ? jenis_sparepart : null,
        nama_sparepart ? nama_sparepart : null,
        jenis_keluhan ? jenis_keluhan : null,
        jenis_informasi ? jenis_informasi : null,
        keterangan,
        cabang_id,
        crm_id,
        tujuan_user,
        status_kontak,
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
        "SELECT km.*, kk.*, dcc.*, cd.*, u1.nama_user as crm_name, u1.user_id as crm_id, u2.nama_user as tujuan_user, u2.user_id as tujuan_id FROM kontak_masuk km JOIN kategori_kontak kk ON kk.kategori_id = km.kategori_id JOIN data_calon_customer dcc ON dcc.customer_id = km.customer_id JOIN cabang_dealer cd ON cd.cabang_id = km.cabang_id JOIN user u1 ON u1.user_id = km.crm_id JOIN user u2 ON u2.user_id = km.tujuan_user WHERE km.kontak_masuk_id = ?",
      values: [id],
    })
      .then((result) => {
        const kategori = result[0];
        if (!kategori) {
          return null;
        }

        return {
          id: kategori.kontak_masuk_id,
          kategori: {
            id: kategori.kategori_id,
            nama: kategori.nama_kategori,
          },
          costumer: {
            id: kategori.customer_id,
            nama: kategori.nama,
          },
          sumber: kategori.sumber,
          type_motor: kategori.type_motor,
          warna_motor: kategori.warna_motor,
          model_motor: kategori.model_motor,
          jenis_pembayaran: kategori.jenis_pembayaran,
          jenis_service: kategori.jenis_service,
          jadwal_service: kategori.jadwal_service,
          jenis_sparepart: kategori.jenis_sparepart,
          nama_sparepart: kategori.nama_sparepart,
          jenis_keluhan: kategori.jenis_keluhan,
          jenis_informasi: kategori.jenis_informasi,
          keterangan: kategori.keterangan,
          cabang: {
            id: kategori.cabang_id,
            nama: kategori.nama_cabang,
          },
          crm: {
            id: kategori.crm_id,
            nama: kategori.crm_name,
          },
          tujuan_user: {
            id: kategori.tujuan_id,
            nama: kategori.tujuan_user,
          },
          status_kontak: kategori.status_kontak,
          created_at: kategori.created_at,
          updated_at: kategori.updated_at,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  static async allWithFilter(filter, page, limit) {
    // Filter data kontak_masuk berdasarkan nama, paginate, page, limit
    let where = "";

    if (filter.kategori_id) {
      where += `kategori_id = '${filter.kategori_id}' AND`;
    }

    if (filter.customer_id) {
      where += `customer_id = '${filter.customer_id}' AND`;
    }

    if (filter.sumber) {
      where += `sumber LIKE '%${filter.sumber}%' AND`;
    }

    if (filter.type_motor) {
      where += `type_motor LIKE '%${filter.type_motor}%' AND`;
    }

    if (filter.warna_motor) {
      where += `warna_motor LIKE '%${filter.warna_motor}%' AND`;
    }

    if (filter.model_motor) {
      where += `model_motor LIKE '%${filter.model_motor}%' AND`;
    }

    if (filter.jenis_pembayaran) {
      where += `jenis_pembayaran LIKE '%${filter.jenis_pembayaran}%' AND`;
    }

    if (filter.jenis_service) {
      where += `jenis_service LIKE '%${filter.jenis_service}%' AND`;
    }

    if (filter.jadwal_service) {
      where += `jadwal_service LIKE '%${filter.jadwal_service}%' AND`;
    }

    if (filter.jenis_sparepart) {
      where += `jenis_sparepart LIKE '%${filter.jenis_sparepart}%' AND`;
    }

    if (filter.nama_sparepart) {
      where += `nama_sparepart LIKE '%${filter.nama_sparepart}%' AND`;
    }

    if (filter.jenis_keluhan) {
      where += `jenis_keluhan LIKE '%${filter.jenis_keluhan}%' AND`;
    }

    if (filter.jenis_informasi) {
      where += `jenis_informasi LIKE '%${filter.jenis_informasi}%' AND`;
    }

    if (filter.keterangan) {
      where += `keterangan LIKE '%${filter.keterangan}%' AND`;
    }

    if (filter.cabang_id) {
      where += `cabang_id = '${filter.cabang_id}' AND`;
    }

    if (filter.crm_id) {
      where += `crm_id = '${filter.crm_id}' AND`;
    }

    if (filter.tujuan_user) {
      where += `tujuan_user = '${filter.tujuan_user}' AND`;
    }

    if (filter.status_kontak) {
      where += `status_kontak LIKE '%${filter.status_kontak}%' AND`;
    }

    // Remove the last "AND" from the query
    if (where) {
      where = `WHERE ${where.slice(0, -4)}`;
    }

    // Pagination data kontak_masuk
    let pagination = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      pagination = `LIMIT ${limit} OFFSET ${offset}`;
    }

    console.log(
      `SELECT km.*, kk.*, dcc.*, cd.*, u1.nama_user as crm_name, u1.user_id as crm_id, u2.nama_user as tujuan_user, u2.user_id as tujuan_id FROM kontak_masuk km JOIN kategori_kontak kk ON kk.kategori_id = km.kategori_id JOIN data_calon_customer dcc ON dcc.customer_id = km.customer_id JOIN cabang_dealer cd ON cd.cabang_id = km.cabang_id JOIN user u1 ON u1.user_id = km.crm_id JOIN user u2 ON u2.user_id = km.tujuan_user ${where} ORDER BY kontak_masuk_id DESC ${pagination}`
    );

    return await excuteQuery({
      query: `SELECT km.*, kk.*, dcc.*, cd.*, u1.nama_user as crm_name, u1.user_id as crm_id, u2.nama_user as tujuan_user, u2.user_id as tujuan_id FROM kontak_masuk km JOIN kategori_kontak kk ON kk.kategori_id = km.kategori_id JOIN data_calon_customer dcc ON dcc.customer_id = km.customer_id JOIN cabang_dealer cd ON cd.cabang_id = km.cabang_id JOIN user u1 ON u1.user_id = km.crm_id JOIN user u2 ON u2.user_id = km.tujuan_user ${where} ORDER BY kontak_masuk_id DESC ${pagination}`,
    })
      .then((result) => {
        if (result.length) {
          return result.map((kategori) => {
            return {
              id: kategori.kontak_masuk_id,
              kategori: {
                id: kategori.kategori_id,
                nama: kategori.nama_kategori,
              },
              costumer: {
                id: kategori.customer_id,
                nama: kategori.nama,
              },
              sumber: kategori.sumber,
              type_motor: kategori.type_motor,
              warna_motor: kategori.warna_motor,
              model_motor: kategori.model_motor,
              jenis_pembayaran: kategori.jenis_pembayaran,
              jenis_service: kategori.jenis_service,
              jadwal_service: kategori.jadwal_service,
              jenis_sparepart: kategori.jenis_sparepart,
              nama_sparepart: kategori.nama_sparepart,
              jenis_keluhan: kategori.jenis_keluhan,
              jenis_informasi: kategori.jenis_informasi,
              keterangan: kategori.keterangan,
              cabang: {
                id: kategori.cabang_id,
                nama: kategori.nama_cabang,
              },
              crm: {
                id: kategori.crm_id,
                nama: kategori.crm_name,
              },
              tujuan_user: {
                id: kategori.tujuan_id,
                nama: kategori.tujuan_user,
              },
              status_kontak: kategori.status_kontak,
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
    kategori_id,
    customer_id,
    sumber,
    type_motor,
    warna_motor,
    model_motor,
    jenis_pembayaran,
    jenis_service,
    jadwal_service,
    jenis_sparepart,
    nama_sparepart,
    jenis_keluhan,
    jenis_informasi,
    keterangan,
    cabang_id,
    crm_id,
    tujuan_user,
    status_kontak,
    created_at,
    updated_at
  ) {
    // Dapatkan data pengguna sebelum diperbarui
    const pesanan = await Pesanan.findById(id);

    if (!pesanan) {
      throw new Error("Pesanan tidak ditemukan");
    }

    // Ambil data kosong dari parameter yang tidak diisi
    kategori_id = kategori_id ?? pesanan.kategori.id;
    customer_id = customer_id ?? pesanan.costumer.id;
    sumber = sumber ?? pesanan.sumber;
    type_motor = type_motor ?? pesanan.type_motor;
    warna_motor = warna_motor ?? pesanan.warna_motor;
    model_motor = model_motor ?? pesanan.model_motor;
    jenis_pembayaran = jenis_pembayaran ?? pesanan.jenis_pembayaran;
    jenis_service = jenis_service ?? pesanan.jenis_service;
    jadwal_service = jadwal_service ?? pesanan.jadwal_service;
    jenis_sparepart = jenis_sparepart ?? pesanan.jenis_sparepart;
    nama_sparepart = nama_sparepart ?? pesanan.nama_sparepart;
    jenis_keluhan = jenis_keluhan ?? pesanan.jenis_keluhan;
    jenis_informasi = jenis_informasi ?? pesanan.jenis_informasi;
    keterangan = keterangan ?? pesanan.keterangan;
    cabang_id = cabang_id ?? pesanan.cabang.id;
    crm_id = crm_id ?? pesanan.crm.id;
    tujuan_user = tujuan_user ?? pesanan.tujuan_user.id;
    status_kontak = status_kontak ?? pesanan.status_kontak;
    created_at = created_at ?? pesanan.created_at;
    updated_at = updated_at ?? new Date();

    return await excuteQuery({
      query:
        "UPDATE kontak_masuk SET kategori_id = ?, customer_id = ?, sumber = ?, type_motor = ?, warna_motor = ?, model_motor = ?, jenis_pembayaran = ?, jenis_service = ?, jadwal_service = ?, jenis_sparepart = ?, nama_sparepart = ?, jenis_keluhan = ?, jenis_informasi = ?, keterangan = ?, cabang_id = ?, crm_id = ?, tujuan_user = ?, status_kontak = ?, created_at = ?, updated_at = ? WHERE kontak_masuk_id = ?",
      values: [
        kategori_id,
        customer_id,
        sumber,
        type_motor,
        warna_motor,
        model_motor,
        jenis_pembayaran,
        jenis_service,
        jadwal_service,
        jenis_sparepart,
        nama_sparepart,
        jenis_keluhan,
        jenis_informasi,
        keterangan,
        cabang_id,
        crm_id,
        tujuan_user,
        status_kontak,
        created_at,
        updated_at,
        id,
      ],
    })
      .finally((result) => {
        return new Pesanan(
          id,
          kategori_id,
          customer_id,
          sumber,
          type_motor,
          warna_motor,
          model_motor,
          jenis_pembayaran,
          jenis_service,
          jadwal_service,
          jenis_sparepart,
          nama_sparepart,
          jenis_keluhan,
          jenis_informasi,
          keterangan,
          cabang_id,
          crm_id,
          tujuan_user,
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
      query: "DELETE FROM kontak_masuk WHERE kontak_masuk_id = ?",
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
      query: "DELETE FROM kontak_masuk WHERE kontak_masuk_id = ?",
      values: [id],
    }).finally((result) => {
      return result;
    });
  }
}

export default Pesanan;
