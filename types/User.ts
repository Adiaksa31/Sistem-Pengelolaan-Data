export interface User {
    id: number;
    nama: string;
    email: string;
    posisi: {
      id: number;
      nama: string;
    };
    cabang: {
      id: number;
      nama: string;
    };
}