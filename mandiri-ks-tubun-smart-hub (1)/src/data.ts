import { Merchant, BranchIdea } from './types';

export const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 'mer-01',
    name: 'Ayam Bakar & Bebek KS Tubun',
    category: 'F&B',
    address: 'Jl. KS Tubun No. 45, Petamburan, Jakarta Pusat',
    cluster: 'Cluster KS Tubun Raya',
    contactPerson: 'Pak Joko',
    phone: '0812-3456-xxxx',
    progress: 'Aktif',
    leadScore: 'High',
    notes: 'Sudah pasang QRIS Mandiri & aktif transaksi harian > 15 trx.',
    createdAt: '2026-05-10'
  },
  {
    id: 'mer-02',
    name: 'Kopi Kenangan Mantan Slipi',
    category: 'F&B',
    address: 'Jl. Letjen S. Parman, Slipi, Palmerah',
    cluster: 'Cluster Slipicon Commercial',
    contactPerson: 'Ibu Reni (Manager)',
    phone: '0857-9876-xxxx',
    progress: 'Onboarding',
    leadScore: 'High',
    notes: 'Proses pembukaan rekening Mandiri badan usaha dan integrasi EDC.',
    createdAt: '2026-05-12'
  },
  {
    id: 'mer-03',
    name: 'Apotek Keluarga Sehat Tubun',
    category: 'Retail',
    address: 'Jl. KS Tubun No. 12B, Palmerah, Jakarta Barat',
    cluster: 'Cluster KS Tubun Raya',
    contactPerson: 'dr. Sarah',
    phone: '0899-1234-xxxx',
    progress: 'Negosiasi',
    leadScore: 'Medium',
    notes: 'Tertarik dengan Livin Merchant untuk kelola stok dan QRIS.',
    createdAt: '2026-05-14'
  },
  {
    id: 'mer-04',
    name: 'Toko Kelontong Berkah Madura',
    category: 'Retail',
    address: 'Gg. Masjid No. 3, Petamburan, Jakarta Pusat',
    cluster: 'Cluster Petamburan Pemukiman',
    contactPerson: 'Bang Roni',
    phone: '0813-4455-xxxx',
    progress: 'Aktif',
    leadScore: 'High',
    notes: 'Terdaftar Agen Mandiri Agen24 / Laku Pandai. Saldo rata-rata stabil.',
    createdAt: '2026-05-15'
  },
  {
    id: 'mer-05',
    name: 'Boutique Kebaya Indah',
    category: 'Prioritas',
    address: 'Jl. Petamburan II No. 89, Jakarta Pusat',
    cluster: 'Cluster Petamburan Pemukiman',
    contactPerson: 'Ibu Hajah Laila',
    phone: '0811-3322-xxxx',
    progress: 'Prospek',
    leadScore: 'High',
    notes: 'Nasabah tabungan reguler, sedang diprospek untuk Upgrade Mandiri Prioritas.',
    createdAt: '2026-05-18'
  },
  {
    id: 'mer-06',
    name: 'Bengkel Motor Sinar Raya',
    category: 'Service',
    address: 'Jl. KS Tubun III No. 4, Slipi, Jakarta Barat',
    cluster: 'Cluster KS Tubun Raya',
    contactPerson: 'Ko Hendra',
    phone: '0812-7788-xxxx',
    progress: 'Hold',
    leadScore: 'Low',
    notes: 'Menunggu kesiapan owner untuk integrasi mesin EDC Mandiri baru.',
    createdAt: '2026-05-19'
  }
];

export const INITIAL_IDEAS: BranchIdea[] = [
  {
    id: 'idea-01',
    title: 'QRIS Mandiri di UMKM Bakso Petamburan',
    description: 'Penyebaran massal QRIS Mandiri keliling pada gerobak bakso dan ketoprak di area belakang kantor cabang untuk mengunci dana murah / CASA.',
    author: 'Andi Wijaya (Branch Sales Manager)',
    status: 'Implementasi',
    category: 'Merchant Acquisition',
    likes: 12
  },
  {
    id: 'idea-02',
    title: 'Layanan Drive-thru Setoran Tunai Nasabah Prioritas',
    description: 'Menyediakan titik parkir khusus drop-off slip setoran cepat bagi nasabah prioritas pasar Tanah Abang/KS Tubun agar tidak perlu antre lama.',
    author: 'Rina Kartika (Customer Service Representative)',
    status: 'Uji Coba',
    category: 'Service Excellence',
    likes: 8
  },
  {
    id: 'idea-03',
    title: 'Livin Co-Working Spot di Lantai 2 Cabang',
    description: 'Mengubah space tidak terpakai di lantai 2 menjadi spot co-working wifi gratis bagi nasabah milenial yang bertransaksi menggunakan Livin by Mandiri.',
    author: 'Budi Santoso (Branch Manager)',
    status: 'Direncanakan',
    category: 'Digitalisasi',
    likes: 15
  }
];
