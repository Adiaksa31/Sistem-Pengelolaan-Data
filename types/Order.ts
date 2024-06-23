export interface Order {
    id: number;
    kategori_id: number;
    nama: string;
    tanggal: string;
    status: string;
    kategori: any;
    costumer: any;
    costumer_id: any;
    sumber: string;
    type_motor: string;
    warna_motor: string;
    model_motor: string;
    jenis_pembayaran: string;
    jenis_service: string;
    jadwal_service: number;
    jenis_sparepart: string;
    nama_sparepart: string;
    jenis_keluhan: string;
    jenis_informasi: string;
    keterangan: string;
    cabang: any;
    cabang_id: any;
    crm: any;
    crm_id: any;
    tujuan_user: any;
    status_kontak: string;
  }