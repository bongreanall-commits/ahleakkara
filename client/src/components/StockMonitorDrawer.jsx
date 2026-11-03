import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  RefreshCw, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Database, 
  Globe, 
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Package
} from 'lucide-react';

export default function StockMonitorDrawer() {
  const { 
    isStockMonitorOpen, 
    setIsStockMonitorOpen, 
    syncStatus, 
    triggerManualSync 
  } = useStore();

  const [isSyncingNow, setIsSyncingNow] = useState(false);

  if (!isStockMonitorOpen) return null;

  const handleManualSync = async () => {
    setIsSyncingNow(true);
    await triggerManualSync();
    setTimeout(() => {
      setIsSyncingNow(false);
    }, 800);
  };

  const logs = syncStatus.recentLogs || [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsStockMonitorOpen(false)}
      />

      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-bold text-base">Live Stock Synchronizer</h2>
              <div className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span>Running every 60 seconds (1 min)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsStockMonitorOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sync Controls & Metrics */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 space-y-3">
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Interval</span>
              <span className="text-sm font-black text-gray-900">60 Seconds</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Monitored</span>
              <span className="text-sm font-black text-blue-600">3 Flagships</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Status</span>
              <span className="text-sm font-black text-green-600">Active</span>
            </div>
          </div>

          {/* Sync Now Button */}
          <button
            onClick={handleManualSync}
            disabled={isSyncingNow}
            className="w-full bg-[#ED1D24] hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncingNow ? 'animate-spin' : ''}`} />
            <span>{isSyncingNow ? 'Querying Fast Retailing Servers...' : '⚡ Force Stock Sync Now'}</span>
          </button>

          {/* Connected Store Channels */}
          <div className="text-[11px] text-gray-600 space-y-1 bg-white p-2.5 rounded-lg border border-gray-200">
            <div className="font-bold text-gray-800 mb-1">Stock Sources Polled:</div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-blue-600" />
                <span>GU Global Japan</span>
              </span>
              <span className="text-gray-400 font-mono">gu-global.com/jp/ja/</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-red-600" />
                <span>UNIQLO Japan</span>
              </span>
              <span className="text-gray-400 font-mono">uniqlo.com/jp/ja/</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-red-600" />
                <span>UNIQLO Vietnam</span>
              </span>
              <span className="text-gray-400 font-mono">uniqlo.com/vn/en/</span>
            </div>
          </div>

        </div>

        {/* Live Event Stream / Audit Logs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            <span>Recent Sync Logs</span>
            <span>Live Audit Feed</span>
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs">
              No recent changes logged yet. All stock verified intact!
            </div>
          ) : (
            logs.map((log) => {
              const isRestock = log.changeType === 'RESTOCK';
              const isDepletion = log.changeType === 'SALE_DEPLETION' || log.changeType === 'CUSTOMER_CHECKOUT';

              return (
                <div 
                  key={log.id}
                  className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 truncate max-w-[200px]">
                      {log.productName}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      log.store?.includes('GU') ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.store}
                    </span>

                    <div className="flex items-center gap-1 text-[11px] font-semibold">
                      {isRestock && (
                        <span className="text-green-600 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          <span>Stock: {log.previousTotalStock} → {log.newTotalStock}</span>
                        </span>
                      )}
                      {isDepletion && (
                        <span className="text-amber-600 flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" />
                          <span>Stock: {log.previousTotalStock} → {log.newTotalStock}</span>
                        </span>
                      )}
                      {!isRestock && !isDepletion && (
                        <span className="text-gray-500">
                          {log.newTotalStock} Units
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 pt-0.5">
                    {log.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-center text-[11px] text-gray-400">
          Sync active: Automatic stock validation updates every 60s
        </div>

      </div>
    </div>
  );
}
