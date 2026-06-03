import React, { useState } from 'react';
import { Map, ExternalLink, MapPin, Copy, Search, RefreshCw, ZoomIn, Compass } from 'lucide-react';

export default function MappingArea() {
  const mapEditUrl = 'https://www.google.com/maps/d/u/0/edit?mid=13YYK_Iql6THaGZ1oA6be_XJl5X-7ynk&usp=sharing';
  // Use official embed link for flawless loading in iframe
  const mapEmbedUrl = 'https://www.google.com/maps/d/u/0/embed?mid=13YYK_Iql6THaGZ1oA6be_XJl5X-7ynk&ehbc=2E312F';

  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mapEditUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Predefined key clusters drawn from mapping area
  const strategicZones = [
    {
      id: 'z-1',
      title: 'Zona KS Tubun Raya',
      subtitle: 'Koridor Utama Kantor Cabang',
      category: 'Komersial & Ritel',
      target: 'Toko Obat, Resto Padang, Minimarket, Bengkel',
      strategy: 'Fokus konversi mesin EDC Mandiri & pemasangan QRIS Livin Merchant.',
      color: 'border-l-4 border-yellow-500'
    },
    {
      id: 'z-2',
      title: 'Cluster Petamburan Pemukiman',
      subtitle: 'Padat Penduduk & Sentra Kuliner',
      category: 'Mikro & Agen Mandiri',
      target: 'Warung kelontong, kuliner malam, laundry',
      strategy: 'Sosialisasikan kemudahan Agen24 Laku Pandai & QRIS Keliling.',
      color: 'border-l-4 border-blue-500'
    },
    {
      id: 'z-3',
      title: 'Cluster Slipi - Palmerah Hub',
      subtitle: 'Perkantoran & Transportasi',
      category: 'Prioritas & Eksekutif',
      target: 'Karyawan kantoran, kafe modern, butik premium',
      strategy: 'Akuisisi Payroll Mandiri & penawaran Kartu Kredit Prioritas.',
      color: 'border-l-4 border-sky-400'
    }
  ];

  const filteredZones = strategicZones.filter(zone =>
    zone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    zone.strategy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    zone.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-220px)]" id="mapping-area-container">
      {/* Left Column: Strategic Context Panel */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Compass className="w-5 h-5 text-yellow-500 animate-spin" style={{ animationDuration: '6s' }} />
              Pemetaan Strategis
            </h3>
            <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              KS Tubun Area
            </span>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed">
            Peta ini memetakan klaster-klaster potensial di sekitar Kantor Cabang Mandiri KS Tubun untuk kemudahan sales force dalam memonitor gerak penetrasi pasar.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={handleCopyLink}
              className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 hover:border-yellow-500 hover:bg-yellow-50/25 text-slate-700 flex items-center justify-between transition-all active:scale-98 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-slate-500" />
                {copied ? 'Tersalin Ke Clipboard!' : 'Salin Tautan Peta'}
              </span>
              <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono">My Maps</span>
            </button>

            <a
              href={mapEditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-xs font-bold py-2.5 px-3 rounded-xl bg-gradient-to-r from-slate-900 to-[#0A2540] hover:from-[#0A2540] hover:to-[#0F3960] text-white flex items-center justify-between transition-all shadow-md shadow-slate-900/10 active:scale-98"
            >
              <span className="flex items-center gap-2">
                <Map className="w-4 h-4 text-yellow-400" />
                Buka Peta di Google Maps
              </span>
              <ExternalLink className="w-4 h-4 text-slate-300" />
            </a>
          </div>
        </div>

        {/* Search & Cluster List */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-slate-800 text-sm">Klaster Fokus Pemetaan</h4>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-450" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari klaster atau strategi..."
                className="w-full text-sm pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-yellow-500 transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[360px] pr-1">
            {filteredZones.length > 0 ? (
              filteredZones.map(zone => (
                <div key={zone.id} className={`p-3.5 rounded-xl bg-slate-50 border border-slate-100 ${zone.color} hover:bg-slate-100/50 transition-all`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">{zone.category}</span>
                    <span className="bg-white border border-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-500 font-medium">Point Active</span>
                  </div>
                  <h5 className="font-bold text-slate-800 text-sm mt-1">{zone.title}</h5>
                  <p className="text-[11px] text-slate-500 font-medium">{zone.subtitle}</p>
                  
                  <div className="mt-2.5 pt-2 border-t border-slate-200/50 text-[11px] text-slate-600 flex flex-col gap-1">
                    <p><strong className="text-slate-700">Target:</strong> {zone.target}</p>
                    <p><strong className="text-slate-700">Strategi:</strong> {zone.strategy}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                Tidak ada klaster ditemukan.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Google My Maps Iframe */}
      <div className="lg:col-span-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3 min-h-[500px]">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping"></span>
            <span className="text-sm font-bold text-slate-800">Peta Interaktif Area Mandiri KS Tubun</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            <ZoomIn className="w-3.5 h-3.5 text-slate-500" /> Use Mouse Scroll to Zoom
          </div>
        </div>

        {/* Live Map Frame Container */}
        <div className="relative flex-1 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner min-h-[450px]">
          {isIframeLoading && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center gap-3 text-white z-10 transition-opacity">
              <RefreshCw className="w-8 h-8 text-yellow-400 animate-spin" />
              <div className="text-center">
                <p className="font-bold text-sm">Menghubungkan ke Google My Maps...</p>
                <p className="text-[11px] text-slate-350 mt-1">Mengunduh data titik pemetaan KS Tubun</p>
              </div>
            </div>
          )}

          <iframe
            src={mapEmbedUrl}
            className="w-full h-full min-h-[450px] border-none"
            allowFullScreen
            loading="lazy"
            onLoad={() => setIsIframeLoading(false)}
            title="Google My Maps - Mandiri KS Tubun"
          ></iframe>
        </div>

        {/* Strategic Tips Footer on Map page */}
        <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl flex items-start gap-2.5 text-xs text-slate-600">
          <MapPin className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Tips Lapangan:</strong> Titik-titik di atas merupakan pembagian wilayah kerja berdasarkan kepadatan usaha. Pastikan untuk selalu merekam kunjungan Anda dan memperbarui status prospek merchant di halaman <strong className="text-slate-800 font-bold">Monitoring Sheet</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
