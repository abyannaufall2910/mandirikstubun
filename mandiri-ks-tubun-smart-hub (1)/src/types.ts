export interface Merchant {
  id: string;
  name: string;
  category: 'F&B' | 'Retail' | 'Service' | 'Prioritas' | 'Lainnya';
  address: string;
  cluster: string;
  contactPerson: string;
  phone: string;
  progress: 'Prospek' | 'Negosiasi' | 'Onboarding' | 'Aktif' | 'Hold';
  leadScore: 'High' | 'Medium' | 'Low';
  notes: string;
  createdAt: string;
}

export interface BranchIdea {
  id: string;
  title: string;
  description: string;
  author: string;
  status: 'Inovasi' | 'Direncanakan' | 'Uji Coba' | 'Implementasi' | 'Selesai';
  category: 'Service Excellence' | 'Merchant Acquisition' | 'Digitalisasi' | 'Proses Kerja';
  likes: number;
}

export type ActiveTab = 'dashboard' | 'mapping' | 'monitoring' | 'ideas';
