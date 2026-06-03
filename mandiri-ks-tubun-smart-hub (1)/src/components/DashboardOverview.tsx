import React, { useState, useEffect } from 'react';
import { Compass, Map, FileSpreadsheet, Plus, MessageSquare, Flame, ThumbsUp, Sparkles, TrendingUp, DollarSign, Award, Target } from 'lucide-react';
import { BranchIdea } from '../types';
import { INITIAL_IDEAS } from '../data';

interface DashboardOverviewProps {
  onNavigate: (tab: 'mapping' | 'monitoring' | 'ideas') => void;
}

export default function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const [ideas, setIdeas] = useState<BranchIdea[]>([]);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaDesc, setNewIdeaDesc] = useState('');
  const [newIdeaCat, setNewIdeaCat] = useState<BranchIdea['category']>('Merchant Acquisition');
  const [authorName, setAuthorName] = useState('');
  const [showIdeaForm, setShowIdeaForm] = useState(false);

  // Load ideas from localstorage
  useEffect(() => {
    const saved = localStorage.getItem('ks_tubun_ideas');
    if (saved) {
      try {
        setIdeas(JSON.parse(saved));
      } catch (e) {
        setIdeas(INITIAL_IDEAS);
      }
    } else {
      setIdeas(INITIAL_IDEAS);
      localStorage.setItem('ks_tubun_ideas', JSON.stringify(INITIAL_IDEAS));
    }
  }, []);

  const saveIdeas = (data: BranchIdea[]) => {
    setIdeas(data);
    localStorage.setItem('ks_tubun_ideas', JSON.stringify(data));
  };

  const handleLike = (id: string) => {
    const updated = ideas.map(idea => {
      if (idea.id === id) {
        return { ...idea, likes: idea.likes + 1 };
      }
      return idea;
    });
    saveIdeas(updated);
  };

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaTitle || !newIdeaDesc) return;

    const created: BranchIdea = {
      id: `idea-${Date.now()}`,
      title: newIdeaTitle,
      description: newIdeaDesc,
      author: authorName || 'Karyawan KS Tubun',
      status: 'Inovasi',
      category: newIdeaCat,
      likes: 1
    };

    const updated = [created, ...ideas];
    saveIdeas(updated);

    // Reset Form
    setNewIdeaTitle('');
    setNewIdeaDesc('');
    setAuthorName('');
    setShowIdeaForm(false);
  };

  return (
    <div className="flex flex-col gap-6" id="dashboard-overview">
      {/* Banner / Pitch */}
      <div className="bg-gradient-to-br from-[#00205B] to-[#0A3982] text-white p-6 md:p-8 rounded-3xl shadow-xl border border-yellow-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-48 h-48 text-yellow-400" />
        </div>
        
        <div className="max-w-xl flex flex-col gap-3 z-15 relative">
          <span className="bg-yellow-400 text-slate-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full w-fit tracking-wider shadow-md shadow-yellow-500/10">
            Startup Vibe • Branch Innovation Hub
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Ayo Majukan Unit Kerja Mandiri KS Tubun!
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed">
            Portal digital independen untuk memantau pemetaan spasial merchant potensial, monitoring status nasabah prioritas secara kolaboratif, dan menyumbangkan ide-ide improvement terbaik.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={() => onNavigate('mapping')}
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-yellow-500/5 hover:-translate-y-0.5"
            >
              <Map className="w-4 h-4" />
              Mulai Eksplorasi Map
            </button>
            <button
              onClick={() => onNavigate('monitoring')}
              className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-white/15"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              Lihat Monitoring Sheet
            </button>
          </div>
        </div>
      </div>

      {/* Target & KPI Trackers widget */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Target Cabang</p>
            <h4 className="text-lg font-bold text-slate-800">48 Merchant</h4>
            <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-yellow-500 h-full rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Realisasi QRIS</p>
            <h4 className="text-lg font-bold text-slate-800">34 Active</h4>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 block">↑ 12% vs Bulan Lalu</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Perkiraan CASA</p>
            <h4 className="text-lg font-bold text-slate-800">Rp 12.4 Miliar</h4>
            <span className="text-[10px] text-slate-500 mt-1 block">Dari Merchant Mandiri</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Target Poin KPI</p>
            <h4 className="text-lg font-bold text-slate-800">850 / 1000 Poin</h4>
            <span className="text-[10px] text-rose-600 font-bold mt-1 block">Tingkat Pencapaian A+</span>
          </div>
        </div>
      </div>

      {/* Main Bottom Section: Idea Improvement List & Pitch Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Idea Board Feed */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Idea Improvement Board
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Ide inovasi pelayanan dan penjualan di wilayah Mandiri KS Tubun</p>
            </div>
            
            <button
              onClick={() => setShowIdeaForm(!showIdeaForm)}
              className="px-3.5 py-1.5 bg-slate-900 border border-slate-250 hover:bg-[#00205B] text-yellow-400 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Usulkan Ide
            </button>
          </div>

          {/* Form to add Idea */}
          {showIdeaForm && (
            <form onSubmit={handleAddIdea} className="p-4 bg-slate-50 rounded-xl border border-slate-150 flex flex-col gap-3 animate-fadeIn">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Usul Inovasi Baru</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500">Judul Ide / Program *</label>
                  <input
                    type="text"
                    required
                    value={newIdeaTitle}
                    onChange={(e) => setNewIdeaTitle(e.target.value)}
                    placeholder="Contoh: QRIS Keliling Pasar Palmerah"
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500">Kategori Inovasi</label>
                  <select
                    value={newIdeaCat}
                    onChange={(e) => setNewIdeaCat(e.target.value as BranchIdea['category'])}
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850 font-semibold"
                  >
                    <option value="Service Excellence">Service Excellence (Pelayanan)</option>
                    <option value="Merchant Acquisition">Merchant Acquisition (QRIS/EDC)</option>
                    <option value="Digitalisasi">Digitalisasi (Livin/Kopra)</option>
                    <option value="Proses Kerja">Proses Kerja Internal</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500">Deskripsi Ide Inovatif *</label>
                <textarea
                  required
                  value={newIdeaDesc}
                  onChange={(e) => setNewIdeaDesc(e.target.value)}
                  placeholder="Ceritakan gambaran besar ide, target pencapaian cara eksekusi, serta perkiraan peningkatan CASA cabang..."
                  rows={3}
                  className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500">Nama Pengusul</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Contoh: Andi - CSR Cabang KS Tubun"
                  className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850"
                />
              </div>

              <div className="flex justify-end gap-3 mt-1.5">
                <button
                  type="button"
                  onClick={() => setShowIdeaForm(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-150 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-lg text-xs font-extrabold transition-all shadow-md shadow-yellow-500/10 cursor-pointer"
                >
                  Kirim Ide Ke Lab
                </button>
              </div>
            </form>
          )}

          {/* Ideas Feed */}
          <div className="flex flex-col gap-3">
            {ideas.length > 0 ? (
              ideas.map(idea => (
                <div key={idea.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:shadow-md hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="bg-yellow-400/10 text-yellow-600 border border-yellow-450/20 px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase font-mono">
                      {idea.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      🛠️ {idea.status}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-850 mt-1.5 text-sm md:text-base">{idea.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{idea.description}</p>
                  
                  <div className="mt-3.5 pt-3 border-t border-slate-200/50 flex items-center justify-between text-[11px] text-slate-450 font-medium">
                    <span>Pengusul: <strong className="text-slate-600">{idea.author}</strong></span>
                    
                    <button
                      onClick={() => handleLike(idea.id)}
                      className="flex items-center gap-1.5 bg-white border border-slate-200 py-1 px-3 rounded-lg hover:border-yellow-500 text-slate-600 hover:text-yellow-600 transition-all active:scale-95 cursor-pointer font-bold shadow-xs"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Dukung ({idea.likes})
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400 text-xs">
                Belum ada ide yang diajukan. Jadilah yang pertama!
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Pitch & Area Information */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="bg-gradient-to-tr from-slate-900 to-[#0F1E36] text-white p-5 rounded-2xl border border-yellow-500/10 shadow-sm flex flex-col gap-3">
            <h4 className="font-bold text-yellow-405 text-sm flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-yellow-400" />
              Info Mandiri KS Tubun
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Terletak di poros utama Jakarta Barat dan Jakarta Pusat, wilayah binaan Kantor Cabang KS Tubun dialiri ratusan UMKM berkecepatan tinggi, mulai dari pedagang grosir Tanah Abang hingga ekosistem penunjang di Slipi.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col gap-1.5">
              <p>📍 <strong className="text-slate-200">Alamat:</strong> Jl. KS Tubun No. 1, Jakarta Pusat</p>
              <p>📞 <strong className="text-slate-200">Kategori:</strong> Sub-Branch / KCP</p>
              <p>⚡ <strong className="text-slate-200">Sub-Segment:</strong> Commercial, Retail & Micro Banking</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <Flame className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
              Tuntunan Inovasi
            </h4>
            <ul className="text-xs text-slate-500 flex flex-col gap-2.5 list-disc pl-4 leading-relaxed">
              <li>
                <strong>Cari CASA Murah:</strong> Target utama adalah merangkul pemilik toko kelontong di dalam gang agar menyetor dana murahnya setiap malam via Agen Mandiri.
              </li>
              <li>
                <strong>Kelayakan Layanan:</strong> Berikan layanan responsif dan ramah agar nasabah merekomendasikan ke rekan se-cluster.
              </li>
              <li>
                <strong>Disiplin Input:</strong> Setiap ada perubahan status negosiasi, mohon update di tab <strong className="text-slate-700">Monitoring Sheet</strong> untuk sinkronisasi.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
