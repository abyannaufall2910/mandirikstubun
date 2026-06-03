import React, { useState, useEffect } from 'react';
import { Table, Eye, Search, Plus, Filter, FileSpreadsheet, ExternalLink, RefreshCw, CheckCircle, Info, Shield, HelpCircle, MapPin } from 'lucide-react';
import { Merchant } from '../types';
import { INITIAL_MERCHANTS } from '../data';

export default function MonitoringSheet() {
  const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1XRyYSjw4qsarp3o-51Qh2H9Q1RPAoF5gixjCHdr9P-E/edit?gid=582424421#gid=582424421';
  // Standard Google Spreadsheet embed preview URL
  const spreadsheetEmbedUrl = 'https://docs.google.com/spreadsheets/d/1XRyYSjw4qsarp3o-51Qh2H9Q1RPAoF5gixjCHdr9P-E/preview?gid=582424421';

  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [viewMode, setViewMode] = useState<'crm' | 'spreadsheet'>('crm');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProgress, setFilterProgress] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isSheetLoading, setIsSheetLoading] = useState(true);

  // Add Merchant Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMerchant, setNewMerchant] = useState<Omit<Merchant, 'id' | 'createdAt'>>({
    name: '',
    category: 'F&B',
    address: '',
    cluster: 'Cluster KS Tubun Raya',
    contactPerson: '',
    phone: '',
    progress: 'Prospek',
    leadScore: 'Medium',
    notes: ''
  });

  // Load merchants from localstorage or use default
  useEffect(() => {
    const saved = localStorage.getItem('ks_tubun_merchants');
    if (saved) {
      try {
        setMerchants(JSON.parse(saved));
      } catch (e) {
        setMerchants(INITIAL_MERCHANTS);
      }
    } else {
      setMerchants(INITIAL_MERCHANTS);
      localStorage.setItem('ks_tubun_merchants', JSON.stringify(INITIAL_MERCHANTS));
    }
  }, []);

  const saveToLocalStorage = (data: Merchant[]) => {
    setMerchants(data);
    localStorage.setItem('ks_tubun_merchants', JSON.stringify(data));
  };

  const handleAddMerchant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMerchant.name || !newMerchant.address) {
      alert('Nama merchant dan alamat wajib diisi!');
      return;
    }

    const created: Merchant = {
      ...newMerchant,
      id: `mer-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [created, ...merchants];
    saveToLocalStorage(updated);
    
    // Reset Form
    setNewMerchant({
      name: '',
      category: 'F&B',
      address: '',
      cluster: 'Cluster KS Tubun Raya',
      contactPerson: '',
      phone: '',
      progress: 'Prospek',
      leadScore: 'Medium',
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteMerchant = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus merchant ini dari tracker lokal?')) {
      const filtered = merchants.filter(m => m.id !== id);
      saveToLocalStorage(filtered);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: Merchant['progress']) => {
    const updated = merchants.map(m => {
      if (m.id === id) {
        return { ...m, progress: newStatus };
      }
      return m;
    });
    saveToLocalStorage(updated);
  };

  // Filtering Logic
  const filteredMerchants = merchants.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.cluster.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProgress = filterProgress === 'All' || m.progress === filterProgress;
    const matchesCategory = filterCategory === 'All' || m.category === filterCategory;

    return matchesSearch && matchesProgress && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-6" id="monitoring-sheet-root">
      
      {/* Upper Segmented Control and Sheet Launcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setViewMode('crm')}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              viewMode === 'crm'
                ? 'bg-gradient-to-r from-slate-900 to-[#0A2540] text-yellow-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 bg-transparent'
            }`}
          >
            Digital CRM Interface (Lokal)
          </button>
          <button
            onClick={() => setViewMode('spreadsheet')}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'spreadsheet'
                ? 'bg-gradient-to-r from-slate-900 to-[#0A2540] text-yellow-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 bg-transparent'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            Live Google Sheets
          </button>
        </div>

        {/* Action Button */}
        <a
          href={spreadsheetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-750 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10 hover:shadow-lg transition-all active:scale-98"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Buka Google Spreadsheet Utama
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* VIEW 1: DIGITAL CRM SYSTEM */}
      {viewMode === 'crm' && (
        <div className="flex flex-col gap-5 animate-fadeIn">
          {/* Controls Panel */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[240px]">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-450" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari merchant, wilayah, kontak..."
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-yellow-500 text-slate-800"
                  />
                </div>

                {/* Progress filter */}
                <div className="flex items-center space-x-1">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={filterProgress}
                    onChange={(e) => setFilterProgress(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 py-2 px-2.5 rounded-xl text-slate-700 font-semibold focus:outline-none"
                  >
                    <option value="All">Semua Status</option>
                    <option value="Prospek">Prospek</option>
                    <option value="Negosiasi">Negosiasi</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Hold">Hold</option>
                  </select>
                </div>

                {/* Category filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 py-2 px-2.5 rounded-xl text-slate-700 font-semibold focus:outline-none"
                >
                  <option value="All">Semua Kategori</option>
                  <option value="F&B">F&B</option>
                  <option value="Retail">Retail</option>
                  <option value="Service">Service</option>
                  <option value="Prioritas">Prioritas</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Add Button */}
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-slate-900 hover:bg-[#0A2540] text-yellow-400 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Tambah Prospek Merchant
              </button>
            </div>

            {/* ADD MERCHANT DRAWER / EXPANDABLE FORM */}
            {showAddForm && (
              <form onSubmit={handleAddMerchant} className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 p-5 rounded-xl border border-slate-100 shadow-inner">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Nama Merchant *</label>
                  <input
                    type="text"
                    required
                    value={newMerchant.name}
                    onChange={(e) => setNewMerchant({ ...newMerchant, name: e.target.value })}
                    placeholder="Contoh: RM Padang Sederhana Tubun"
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Kategori</label>
                  <select
                    value={newMerchant.category}
                    onChange={(e) => setNewMerchant({ ...newMerchant, category: e.target.value as Merchant['category'] })}
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850"
                  >
                    <option value="F&B">F&B (Makanan & Minuman)</option>
                    <option value="Retail">Retail / Toko</option>
                    <option value="Service">Service / Bengkel / Jasa</option>
                    <option value="Prioritas">Prioritas (Nasabah High Net Worth)</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Klaster Area</label>
                  <select
                    value={newMerchant.cluster}
                    onChange={(e) => setNewMerchant({ ...newMerchant, cluster: e.target.value })}
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850"
                  >
                    <option value="Cluster KS Tubun Raya">Cluster KS Tubun Raya</option>
                    <option value="Cluster Petamburan Pemukiman">Cluster Petamburan Pemukiman</option>
                    <option value="Cluster Slipicon Commercial">Cluster Slipicon Commercial</option>
                    <option value="Luar Area">Luar Area KS Tubun</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Alamat Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={newMerchant.address}
                    onChange={(e) => setNewMerchant({ ...newMerchant, address: e.target.value })}
                    placeholder="Jl. KS Tubun No. X..."
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Kontak Person / PIC</label>
                  <input
                    type="text"
                    value={newMerchant.contactPerson}
                    onChange={(e) => setNewMerchant({ ...newMerchant, contactPerson: e.target.value })}
                    placeholder="Nama pemilik/PIC"
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">No. Handphone</label>
                  <input
                    type="text"
                    value={newMerchant.phone}
                    onChange={(e) => setNewMerchant({ ...newMerchant, phone: e.target.value })}
                    placeholder="0812-xxxx"
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Tahapan Progress</label>
                  <select
                    value={newMerchant.progress}
                    onChange={(e) => setNewMerchant({ ...newMerchant, progress: e.target.value as Merchant['progress'] })}
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850"
                  >
                    <option value="Prospek">Prospek</option>
                    <option value="Negosiasi">Negosiasi</option>
                    <option value="Onboarding">Onboarding (Registrasi/Verifikasi)</option>
                    <option value="Aktif">Aktif (Bertransaksi QRIS/EDC)</option>
                    <option value="Hold">Hold / Tertunda</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Prioritas Potensi</label>
                  <select
                    value={newMerchant.leadScore}
                    onChange={(e) => setNewMerchant({ ...newMerchant, leadScore: e.target.value as Merchant['leadScore'] })}
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850"
                  >
                    <option value="High">Tinggi (Volume Transaksi Besar)</option>
                    <option value="Medium">Sedang (Standar)</option>
                    <option value="Low">Rendah</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 md:col-span-3">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Catatan Aktivitas / Catatan Next Step</label>
                  <textarea
                    value={newMerchant.notes}
                    onChange={(e) => setNewMerchant({ ...newMerchant, notes: e.target.value })}
                    placeholder="Masukan detail prospek, kesepakatan bagi hasil, progres pengiriman alat..."
                    rows={2}
                    className="bg-white border border-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-yellow-500 text-slate-850 resize-none"
                  />
                </div>

                <div className="md:col-span-3 flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-150 transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-xl text-xs font-extrabold transition-all shadow-md shadow-yellow-500/10 cursor-pointer"
                  >
                    Simpan ke CRM Lokal
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* CRM Data Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden" id="crm-table-container">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Daftar Merchant & Nasabah Terdaftar ({filteredMerchants.length})
              </span>
              <span className="text-[10px] text-slate-500 font-mono italic">
                Penyimpanan Otomatis Aktif di Browser Anda
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] uppercase tracking-wider font-extrabold text-slate-500 border-b border-slate-150">
                    <th className="py-3.5 px-4">Merchant & Kategori</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Klaster Wilayah</th>
                    <th className="py-3.5 px-4">PIC & Kontak</th>
                    <th className="py-3.5 px-4">Progress Kunjungan</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell">Potensi</th>
                    <th className="py-3.5 px-4">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {filteredMerchants.length > 0 ? (
                    filteredMerchants.map(merchant => (
                      <tr key={merchant.id} className="hover:bg-slate-50/50 transition-all">
                        {/* Name Column */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800">{merchant.name}</span>
                            <div className="flex items-center gap-1.5 mt-1 font-medium">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                                merchant.category === 'F&B' ? 'bg-amber-100 text-amber-800' :
                                merchant.category === 'Retail' ? 'bg-indigo-100 text-indigo-800' :
                                merchant.category === 'Prioritas' ? 'bg-yellow-105 text-amber-900 border border-yellow-300/40' :
                                'bg-slate-150 text-slate-600'
                              }`}>
                                {merchant.category}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono hidden md:inline">{merchant.createdAt}</span>
                            </div>
                          </div>
                        </td>

                        {/* Cluster Column */}
                        <td className="py-3.5 px-4 hidden md:table-cell">
                          <div className="flex items-center gap-1 text-slate-600 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {merchant.cluster}
                          </div>
                        </td>

                        {/* PIC & Phone */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-700">{merchant.contactPerson || 'No PIC'}</span>
                            <span className="text-[10px] text-slate-500 font-mono mt-0.5">{merchant.phone || '-'}</span>
                          </div>
                        </td>

                        {/* Progress Status Dropdown */}
                        <td className="py-3.5 px-4">
                          <select
                            value={merchant.progress}
                            onChange={(e) => handleUpdateStatus(merchant.id, e.target.value as Merchant['progress'])}
                            className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                              merchant.progress === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              merchant.progress === 'Onboarding' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                              merchant.progress === 'Negosiasi' ? 'bg-yellow-50 text-yellow-700 border-yellow-250' :
                              merchant.progress === 'Prospek' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                              'bg-amber-50 text-amber-750 border-amber-200'
                            }`}
                          >
                            <option value="Prospek">Prospek</option>
                            <option value="Negosiasi">Negosiasi</option>
                            <option value="Onboarding">Onboarding</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Hold">Hold</option>
                          </select>
                        </td>

                        {/* Potensi / Lead Score */}
                        <td className="py-3.5 px-4 hidden lg:table-cell">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            merchant.leadScore === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                            merchant.leadScore === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                            'bg-slate-100 text-slate-500'
                          }`}>
                            {merchant.leadScore} Potency
                          </span>
                        </td>

                        {/* Delete Action button */}
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleDeleteMerchant(merchant.id)}
                            className="bg-transparent text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all cursor-pointer"
                            title="Hapus"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-slate-400">
                        Tidak ada data merchant cocok dengan pencarian Anda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Note tooltip detail */}
            {filteredMerchants.length > 0 && (
              <div className="bg-slate-50 p-3.5 border-t border-slate-150 text-[11px] text-slate-500">
                <div className="flex gap-1 items-start">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-700">Skema Pengelolaan Regional - Mandiri KS Tubun:</p>
                    <p className="mt-0.5 leading-relaxed">
                      Lakukan kunjungan berkala minimal seminggu sekali untuk merchant yang berada dalam status <strong className="text-blue-600">Negosiasi</strong> dan <strong className="text-orange-600">Onboarding</strong> untuk mempercepat aktivasi QRIS Mandiri Anda di cabang KS Tubun.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: INTEGRATED GOOGLE SHEET IFRAME VIEW */}
      {viewMode === 'spreadsheet' && (
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-2 border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                Google Spreadsheet Real-time Monitoring
              </h4>
              <p className="text-[11.5px] text-slate-500 mt-0.5 leading-relaxed">
                Menampilkan data langsung dari link spreadsheet milik branch Anda. Anda juga dapat melakukan kolaborasi instan.
              </p>
            </div>
            
            <button
              onClick={() => {
                setIsSheetLoading(true);
                const iframe = document.getElementById('sheet-iframe') as HTMLIFrameElement;
                if (iframe) iframe.src = iframe.src;
              }}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] text-slate-700 font-bold flex items-center gap-1.5 transition-all self-end cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              Segarkan Tampilan
            </button>
          </div>

          {/* Embedded Google Sheet container */}
          <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner min-h-[500px]">
            {isSheetLoading && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center gap-3 text-white z-10">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <div className="text-center">
                  <p className="font-bold text-sm">Menghubungkan ke Google Sheets...</p>
                  <p className="text-[11px] text-slate-350 mt-1">Mengunduh row monitoring nasabah Cabang Mandiri</p>
                </div>
              </div>
            )}

            <iframe
              id="sheet-iframe"
              src={spreadsheetEmbedUrl}
              className="w-full h-full min-h-[500px] border-none"
              allowFullScreen
              loading="lazy"
              onLoad={() => setIsSheetLoading(false)}
              title="Google Sheets - Monitoring Merchant"
            ></iframe>
          </div>

          {/* Secure & Collaboration Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <div className="p-3.5 bg-emerald-500/5 rounded-xl border border-emerald-500/10 flex gap-2.5">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-650">
                <h5 className="font-bold text-emerald-950 mb-0.5">Keamanan Data Terjamin</h5>
                <p className="leading-relaxed">Akses edit langsung hanya diberikan jika akun Google Anda telah memiliki izin yang sah di Google Drive untuk spreadsheet ini.</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex gap-2.5">
              <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-650">
                <h5 className="font-bold text-slate-800 mb-0.5">Cara Mengedit Kolom?</h5>
                <p className="leading-relaxed">Untuk penginputan data baru yang bersifat kolaborasi antar tim, gunakan tombol <strong className="text-emerald-700 font-bold">Buka Google Spreadsheet Utama</strong> di kanan atas halaman.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
