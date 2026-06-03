import React, { useState, useEffect } from 'react';
import { 
  Map, 
  Table, 
  Layers, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Target, 
  Plus, 
  CheckCircle, 
  ChevronRight, 
  Info,
  Smartphone,
  MapPin,
  Menu,
  X,
  Sparkles,
  Search,
  Filter,
  BarChart2,
  Bell,
  HelpCircle,
  LogOut
} from 'lucide-react';

// Mandiri Brand Colors:
// - Primary Navy: #002D62 (Deep Blue)
// - Accent Gold: #FDB813 (Golden Yellow)

export default function App() {
  // Navigation tabs: 'home' | 'mapping' | 'monitoring'
  const [activeTab, setActiveTab] = useState<'home' | 'mapping' | 'monitoring'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Security gatekeeper state
  const [authorized, setAuthorized] = useState<boolean>(() => {
    return localStorage.getItem('mandiri_branch_authorized') === 'true';
  });
  const [branchCode, setBranchCode] = useState('');
  const [authError, setAuthError] = useState('');

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    if (branchCode.trim() === '11727') {
      localStorage.setItem('mandiri_branch_authorized', 'true');
      setAuthorized(true);
      setAuthError('');
    } else {
      setAuthError('Kode cabang salah!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mandiri_branch_authorized');
    setAuthorized(false);
    setBranchCode('');
  };

  // Google Maps & Spreadsheet Links
  const googleMapEmbedUrl = "https://www.google.com/maps/d/embed?mid=13YYK_Iql6THaGZ1oA6be_XJl5X-7ynk";
  const googleMapEditUrl = "https://www.google.com/maps/d/u/0/edit?mid=13YYK_Iql6THaGZ1oA6be_XJl5X-7ynk&usp=sharing";
  
  // Spreadsheet links
  const spreadsheetEmbedUrl = "https://docs.google.com/spreadsheets/d/1XRyYSjw4qsarp3o-51Qh2H9Q1RPAoF5gixjCHdr9P-E/preview?gid=582424421#gid=582424421";
  const spreadsheetLinkUrl = "https://docs.google.com/spreadsheets/d/1XRyYSjw4qsarp3o-51Qh2H9Q1RPAoF5gixjCHdr9P-E/edit?gid=582424421#gid=582424421";

  if (!authorized) {
    return (
      <div 
        className="min-h-screen text-slate-800 font-sans flex flex-col items-center justify-center p-4 selection:bg-amber-400 selection:text-slate-900 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: `linear-gradient(rgba(15, 32, 67, 0.90), rgba(0, 45, 98, 0.94)), url('https://lh3.googleusercontent.com/d/1Zz4IKLajGtOIHCnG6fFmgZAFW-wDgGmK=s1600')` 
        }}
      >
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest font-mono">Mandiri Secure Area</span>
        </div>

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 relative">
          {/* Top Yellow Mandiri Line decoration */}
          <div className="h-2 bg-[#FDB813]" />

          <div className="p-8 md:p-10 text-center space-y-6">
            <div className="mx-auto bg-slate-55 px-4 py-3.5 rounded-2xl border border-slate-100 shadow-inner flex items-center justify-center w-fit">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" 
                alt="Bank Mandiri Logo" 
                className="h-10 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-extrabold text-[#002D62] tracking-tight">Portal Wilayah Jakarta KS Tubun</h2>
              <p className="text-xs text-slate-400 font-medium">Masukkan Kode Cabang untuk memverifikasi hak akses portal internal</p>
            </div>

            <form onSubmit={handleAuthorize} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">Kode Cabang Mandiri</label>
                <input 
                  type="password"
                  maxLength={5}
                  value={branchCode}
                  onChange={(e) => {
                    setBranchCode(e.target.value.replace(/\D/g, '')); // only allow numbers
                    setAuthError('');
                  }}
                  placeholder="• • • • •"
                  className="w-full bg-slate-50 text-center font-bold tracking-widest border border-slate-200 focus:border-[#002D62] rounded-xl px-4 py-3.5 text-lg focus:outline-none transition-all placeholder:text-slate-350"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2">
                  <span className="text-sm">⚠️</span>
                  <span>Kode salah!</span>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-[#002D62] hover:bg-[#001D42] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Masuk Ke Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Disclaimer credits with developer names exactly as requested */}
        <div className="mt-8 text-center space-y-1">
          <p className="text-[11px] text-slate-300/80 font-medium font-sans">
            PT Bank Mandiri (Persero) Tbk. - KCP Jakarta KS Tubun
          </p>
          <p className="text-[10px] text-slate-400 font-mono">
            Developed By Rizal Galinato & Mohamad Abyan Naufal
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen text-slate-800 font-sans flex flex-col selection:bg-amber-400 selection:text-slate-900 bg-cover bg-center bg-no-repeat bg-fixed bg-slate-50"
      style={{ 
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.72), rgba(248, 250, 252, 0.72)), url('https://lh3.googleusercontent.com/d/1Zz4IKLajGtOIHCnG6fFmgZAFW-wDgGmK=s1600')` 
      }}
    >
      
      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#002D62] text-white border-b border-[#001D42] shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo & title */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-white/20 shadow-md transform hover:scale-105 transition-all flex items-center justify-center shrink-0">
              {/* Official Bank Mandiri logo */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" 
                alt="Bank Mandiri Logo" 
                className="h-4.5 sm:h-7 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <div className="hidden sm:flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-widest">
                  Branch KCP
                </span>
                <span className="text-[10px] bg-[#FDB813] text-[#002D62] font-extrabold px-1.5 py-0.2 rounded">
                  KS Tubun
                </span>
              </div>
              <h1 className="text-xs sm:text-lg md:text-xl font-black tracking-tight flex flex-wrap items-center gap-x-1 text-white truncate">
                Mandiri <span className="text-amber-400 font-medium text-[11px] sm:text-base md:text-lg">Portal KS Tubun</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Link Menu UI */}
          <nav className="hidden md:flex items-center gap-1">
            <button 
              id="nav-home"
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${activeTab === 'home' ? 'bg-[#FDB813] text-[#002D62] shadow-md' : 'hover:bg-white/10 text-slate-100'}`}
            >
              Beranda
            </button>
            <button 
              id="nav-mapping"
              onClick={() => { setActiveTab('mapping'); setMobileMenuOpen(false); }}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${activeTab === 'mapping' ? 'bg-[#FDB813] text-[#002D62] shadow-md' : 'hover:bg-white/10 text-slate-100'}`}
            >
              Mapping Area
            </button>
            <button 
              id="nav-monitoring"
              onClick={() => { setActiveTab('monitoring'); setMobileMenuOpen(false); }}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${activeTab === 'monitoring' ? 'bg-[#FDB813] text-[#002D62] shadow-md' : 'hover:bg-white/10 text-slate-100'}`}
            >
              Monitoring Merchant
            </button>
          </nav>

          {/* Right Header Controls */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[11px] font-bold text-amber-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 select-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Rizal & Abyan
            </span>
            <div className="h-6 w-px bg-white/20"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all cursor-pointer transform hover:scale-102 hover:shadow-lg active:scale-98"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation List Option */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-5 bg-[#002652] border-t border-[#001938] flex flex-col gap-2 transition-all">
            <button
              id="mob-nav-home"
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-3 rounded-lg text-left text-sm font-semibold transition-all ${activeTab === 'home' ? 'bg-[#FDB813] text-[#002D62]' : 'text-slate-100 hover:bg-white/5'}`}
            >
              🏠 Beranda
            </button>
            <button
              id="mob-nav-mapping"
              onClick={() => { setActiveTab('mapping'); setMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-3 rounded-lg text-left text-sm font-semibold transition-all ${activeTab === 'mapping' ? 'bg-[#FDB813] text-[#002D62]' : 'text-slate-100 hover:bg-white/5'}`}
            >
              📍 Mapping Area KS Tubun
            </button>
            <button
              id="mob-nav-monitoring"
              onClick={() => { setActiveTab('monitoring'); setMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-3 rounded-lg text-left text-sm font-semibold transition-all ${activeTab === 'monitoring' ? 'bg-[#FDB813] text-[#002D62]' : 'text-slate-100 hover:bg-white/5'}`}
            >
              📊 Monitoring Merchant
            </button>
            
            <div className="h-px bg-white/10 my-2"></div>

            <div className="grid grid-cols-2 gap-2">
              <a 
                href={spreadsheetLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-[#107c41] text-white py-2 px-3 rounded-lg text-xs font-semibold text-center"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Spreadsheet</span>
              </a>
              <a 
                href={googleMapEditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2 px-3 rounded-lg text-xs font-semibold text-center"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>My Maps</span>
              </a>
            </div>

            <div className="h-px bg-white/10 my-2"></div>

            <div className="px-3 py-1 text-slate-300 text-xs flex items-center justify-between">
              <span className="font-semibold text-slate-400">Developer:</span>
              <span className="text-amber-400 font-bold bg-white/5 py-1 px-2.5 rounded border border-white/10 text-[11px]">Rizal & Abyan</span>
            </div>

            <button
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="w-full mt-2 py-2.5 px-3 rounded-lg text-center text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        )}
      </header>



      {/* CORE FRAMEWORK / WRAPPER AND ROUTER PAGE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        
        {/* TAB 1: HOME PLATFORM */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto py-4">
            
            {/* HERO BANNER BLOCK - CLEAN & SLICK */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#002D62] via-[#003c80] to-[#014c99] rounded-2xl sm:rounded-3xl text-white p-5 sm:p-8 md:p-12 shadow-xl border border-blue-950/20 text-center md:text-left">
              <div className="relative z-10">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-2 md:mb-4">
                  Dashboard <br />
                  <span className="text-[#FDB813]">KCP Jakarta KS Tubun</span>
                </h2>
                <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                  Aplikasi internal pendukung pengelolaan wilayah kerja KCP Jakarta KS Tubun. Kelola batas wilayah, koordinasikan tim sales di lapangan, dan monitor pendaftaran merchant secara mudah dan terintegrasi harian.
                </p>
              </div>
            </div>

            {/* THE TWO MAIN MENU CARDS - ELEGANT, LARGE AND USER-FRIENDLY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-6">
              
              {/* Menu Card 1: Mapping Area */}
              <div className="bg-white p-4.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-[#002D62] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-[#FDB813]/20 transition-colors">
                    <Map className="w-5 h-5 sm:w-6 sm:h-6 text-[#002D62]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-slate-900 group-hover:text-[#002D62] transition-colors">
                      📍 Mapping Area KS Tubun
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">Menu Utama 1</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Visualisasi pemetaan area kerja dan zona potensial merchant Mandiri. Terintegrasi langsung dengan Google My Maps untuk mempermudah pembagian radius wilayah koordinasi sales force lapangan.
                  </p>
                </div>
                
                <div className="mt-5 sm:mt-8">
                  <button 
                    onClick={() => setActiveTab('mapping')}
                    className="w-full bg-[#002D62] hover:bg-[#001E42] text-white font-bold py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-lg sm:rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer group text-xs sm:text-sm"
                  >
                    <span>Masuk ke Mapping Area</span>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Menu Card 2: Monitoring Merchant */}
              <div className="bg-white p-4.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-emerald-600 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                    <Table className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      📊 Monitoring Merchant & Nasabah
                    </h3>
                    <p className="text-[10px] sm:text-xs text-emerald-600 mt-0.5 uppercase tracking-wider font-semibold">Menu Utama 2</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Pelacakan dan monitoring status akuisisi merchant QRIS/EDC Mandiri secara live. Sinkronisasi data real-time berkala dua arah langsung dengan master database Google Sheets bersama.
                  </p>
                </div>
                
                <div className="mt-5 sm:mt-8">
                  <button 
                    onClick={() => setActiveTab('monitoring')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-lg sm:rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer group text-xs sm:text-sm"
                  >
                    <span>Masuk ke Monitoring Merchant</span>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: MENU 1 - MAPPING AREA */}
        {activeTab === 'mapping' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Header section with actions */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-[#002D62] text-[#FDB813] p-3 rounded-2xl">
                  <Map className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl md:text-2xl font-black text-slate-900">📍 Mapping Area Mandiri KS Tubun</h2>
                    <span className="bg-[#FDB813] text-[#002D62] font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase">Google My Maps</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400">Peta segmentasi, merchant retail EDC/QRIS, dan batas titik patroli akuisisi tabungan nasabah.</p>
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <a 
                  href={googleMapEditUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 md:flex-none items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow inline-flex transition-all text-center cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Edit Peta Google My Maps</span>
                </a>
              </div>
            </div>



            {/* Google My Maps Embed Iframe Container */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold text-slate-500 text-xs bg-slate-100 py-1 px-2.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Peta Sinkron dengan Google My Maps
                </span>
                <span className="font-mono text-[10px]">IFrame Terenkapsulasi (Responsive)</span>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden h-[480px] sm:h-[550px] md:h-[600px] w-full bg-slate-100 border border-slate-200 shadow-inner">
                {/* Embedded google maps container */}
                <iframe 
                  src={googleMapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  className="absolute inset-0 border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Mandiri KS Tubun Mapping Area"
                ></iframe>
              </div>

              <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                    <Info className="w-4 h-4 text-[#002D62]" />
                    Petunjuk Navigasi Peta
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                    Klik tombol legenda di pojok kiri atas peta untuk menyaring / melihat daftar koridor, titik kumpul merchant, terminal EDC potensial, atau mengaktifkan layer citra satelit Google Maps secara interaktif.
                  </p>
                </div>
                <a 
                  href={googleMapEditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#002D62] hover:bg-[#001D42] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-md transition-all text-center inline-flex items-center justify-center gap-1 cursor-pointer shrink-0"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>



          </div>
        )}

        {/* TAB 3: MENU 2 - MONITORING MERCHANT SPREADSHEET */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6 animate-fade-in">

            {/* Header section with actions */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-inner">
                  <Table className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl md:text-2xl font-black text-slate-900">📊 Monitoring Merchant & Nasabah</h2>
                    <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase">Google Sheets Live Link</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400">Database monitoring nasabah potensial & pelacakan progress akuisisi secara real-time.</p>
                </div>
              </div>

              {/* Big spreadsheet direct button redirect */}
              <div className="flex gap-2 w-full md:w-auto">
                <a 
                  id="direct-open-spreadsheet"
                  href={spreadsheetLinkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 md:flex-none items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow inline-flex transition-all text-center cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Spreadsheet Utuh (Edit & isi)</span>
                </a>
              </div>
            </div>

            {/* Beautiful Informational Call-out styled as startup */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-2xl p-4.5 border border-emerald-200/60 flex flex-col sm:flex-row items-start gap-3.5">
              <div className="p-2 bg-emerald-500 rounded-lg text-white shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-extrabold text-emerald-900 leading-tight">Terintegrasi Dengan Akun Google Drive Kerja Anda</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Laporan dan isian di Google Sheets di bawah ini langsung sinkron secara dua arah. Setiap sales team yang melakukan penginputan data di lapangan menggunakan aplikasi seluler Google Sheets akan langsung memperbarui statistik dashboard di halaman ini secara real-time!
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-semibold text-[11px] text-emerald-800">
                  <span className="bg-white/75 px-2.5 py-0.5 rounded border border-emerald-300/30">✓ Update Status Akuisisi</span>
                  <span className="bg-white/75 px-2.5 py-0.5 rounded border border-emerald-300/30">✓ Nama Merchant & Alamat</span>
                  <span className="bg-white/75 px-2.5 py-0.5 rounded border border-emerald-300/30">✓ Target Volume QRIS bulanan</span>
                </div>
              </div>
            </div>

            {/* Embedded Live Sheet View */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold text-slate-500 text-xs bg-slate-150 py-1.5 px-3 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Spreadsheet Live Preview Tersemat
                </span>
                <span className="font-mono text-[10px] hidden sm:inline">ID: 1XRyYSjw4qsarp3o-51Qh2H9Q1...</span>
              </div>

              {/* Embedded frame */}
              <div className="relative rounded-2xl overflow-hidden h-[510px] bg-slate-100 border border-slate-200 shadow-inner">
                <iframe 
                  src={spreadsheetEmbedUrl}
                  width="100%" 
                  height="100%" 
                  className="absolute inset-0 border-0"
                  allowFullScreen
                  title="Monitoring Merchant Google Sheets Embed"
                ></iframe>
              </div>

              {/* Action buttons below embed */}
              <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed text-center md:text-left">
                  Sulit mengisinya lewat layar kecil? Silakan klik tombol di samping untuk membukanya secara penuh di Google Sheets App Anda. Pastikan masuk menggunakan kredensial Mandiri Anda.
                </p>
                <a 
                  href={spreadsheetLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto text-center shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Buka di Layar Penuh</span>
                </a>
              </div>
            </div>



          </div>
        )}

      </main>

      {/* FOOTER AREA */}
      <footer className="bg-[#001D42] text-white py-8 px-4 border-t border-[#00122B] mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-extrabold text-white text-base">KCP Jkt KS Tubun • Portal Kawasan Bisnis</h3>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Dikembangkan sebagai instrumen digital pendukung optimalisasi akuisisi wilayah dan transparansi data merchant seluruh pegawai Bank Mandiri.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="https://bankmandiri.co.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-400 transition-colors py-1 font-semibold"
            >
              Corporate Bank Mandiri
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-amber-400 font-extrabold bg-[#002D62] px-3 py-1 rounded-full border border-amber-400/20">
              Region III/Jakarta 1
            </span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-800 text-center text-slate-500">
          <p>2026 Pt Bank Mandiri (Persero) Tbk. - Developed By Rizal Galinato & Mohamad Abyan Naufal</p>
        </div>
      </footer>

    </div>
  );
}
