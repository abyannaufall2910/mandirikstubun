import React, { useState, useEffect } from 'react';
import { Compass, TrendingUp, Bell, CircleCheck, Info, MapPin } from 'lucide-react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Standard clock update in UTC or Indonesian WIB (UTC+7)
    const updateTime = () => {
      const now = new Date();
      // Format to WIB time (GMT+7)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(now.toLocaleString('id-ID', options) + ' WIB');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-r from-slate-900 to-[#0A2540] text-white py-4 px-6 rounded-2xl mx-1 my-2 shadow-xl border-b border-yellow-500/20" id="app-header">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Mandiri Livin Style Branding */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-yellow-400 to-amber-500 p-2.5 rounded-xl shadow-lg shadow-yellow-500/20 flex items-center justify-center animate-pulse">
            <Compass className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">Livin' Mars Hub</span>
              <span className="bg-blue-600/50 text-[10px] text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/20 font-mono">v2.1</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-yellow-300 bg-clip-text text-transparent">
              Mandiri KS Tubun • Idea Center
            </h1>
          </div>
        </div>

        {/* Real-time Ticker / Date & Info */}
        <div className="flex flex-col md:items-end text-sm">
          <span className="text-yellow-400 font-mono text-xs font-semibold flex items-center gap-1.5 justify-end">
            <span className="inline-block w-2 bg-yellow-400 h-2 rounded-full animate-bounce"></span>
            KANTOR CABANG MANDIRI KS TUBUN
          </span>
          <span className="text-slate-300 mt-1 font-sans text-xs md:text-sm font-medium">
            {currentTime || 'Memuat Waktu...'}
          </span>
        </div>
      </div>

      {/* Dynamic welcome ticker banner */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <MapPin className="text-yellow-400 w-3.5 h-3.5" />
          <span>Fokus Area: Palmerah, Petamburan, Slipi, Brigjen Katamso</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-yellow-400/10 text-yellow-400 font-medium px-2 py-0.5 rounded-md border border-yellow-400/20 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Target Acqu: 48 Merchant
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 font-medium px-2 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1">
            <CircleCheck className="w-3 h-3" /> Live Tracking OK
          </span>
        </div>
      </div>
    </header>
  );
}
