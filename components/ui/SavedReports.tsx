'use client';

import { useState, useEffect } from 'react';
import { Trash2, TrendingUp, TrendingDown, FileText } from 'lucide-react';

interface Report {
  id: string;
  caseName: string;
  nos: string[];
  category: string;
  date: string;
  winRate: number;
  settlementRange: string;
  duration: string;
}

interface Props {
  lang?: string;
  onLoadReport: (report: Report) => void;
}

const TRANSLATIONS = {
  en: {
    title: 'Saved Reports',
    empty: 'No saved reports yet. Generate your first report to see it here.',
    viewReport: 'View Report',
    delete: 'Delete',
    generated: 'Generated',
    winRate: 'Win Rate',
    settlement: 'Settlement Range',
  },
  es: {
    title: 'Reportes Guardados',
    empty: 'Sin reportes guardados. Genera tu primer reporte para verlo aquí.',
    viewReport: 'Ver Reporte',
    delete: 'Eliminar',
    generated: 'Generado',
    winRate: 'Tasa de Ganancia',
    settlement: 'Rango de Acuerdo',
  },
};

export function saveReport(report: Omit<Report, 'id' | 'date'>) {
  const existing = JSON.parse(localStorage.getItem('mcv_saved_reports') || '[]');
  const newReport = {
    ...report,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  const updated = [newReport, ...existing].slice(0, 10);
  localStorage.setItem('mcv_saved_reports', JSON.stringify(updated));
}

export default function SavedReports({ lang = 'en', onLoadReport }: Props) {
  const [reports, setReports] = useState<Report[]>([]);
  const [mounted, setMounted] = useState(false);
  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('mcv_saved_reports');
    if (stored) {
      try {
        setReports(JSON.parse(stored));
      } catch {
        setReports([]);
      }
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = reports.filter((r) => r.id !== id);
    setReports(updated);
    localStorage.setItem('mcv_saved_reports', JSON.stringify(updated));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: '#0B1221' }}>
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#E2E8F0' }}>
        {t.title}
      </h1>

      {reports.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-lg border-2 border-dashed"
          style={{ backgroundColor: '#131B2E', borderColor: '#1E293B' }}
        >
          <FileText size={48} style={{ color: '#B0BDD0' }} className="mb-4" />
          <p style={{ color: '#B0BDD0' }} className="text-center max-w-md">
            {t.empty}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="rounded-lg p-6 border transition-all hover:shadow-lg"
              style={{ backgroundColor: '#131B2E', borderColor: '#1E293B' }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 style={{ color: '#E2E8F0' }} className="font-semibold text-lg">
                    {report.caseName}
                  </h3>
                  <p style={{ color: '#B0BDD0' }} className="text-sm">
                    {report.category}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(report.id)}
                  className="p-2 rounded hover:opacity-70 transition"
                  style={{ color: '#B0BDD0' }}
                  title={t.delete}
                  aria-label={`${t.delete} ${report.category}`}
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </div>

              <p style={{ color: '#B0BDD0' }} className="text-sm mb-4">
                {t.generated}: {formatDate(report.date)}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span style={{ color: '#B0BDD0' }} className="text-sm">
                    {t.winRate}:
                  </span>
                  <div className="flex items-center gap-2">
                    {report.winRate > 50 ? (
                      <TrendingUp size={16} style={{ color: '#0D9488' }} />
                    ) : (
                      <TrendingDown size={16} style={{ color: '#F59E0B' }} />
                    )}
                    <span
                      className="font-semibold px-3 py-1 rounded text-sm"
                      style={{
                        backgroundColor:
                          report.winRate > 50 ? '#0D9488' : '#F59E0B',
                        color: '#0B1221',
                      }}
                    >
                      {Math.round(report.winRate)}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span style={{ color: '#B0BDD0' }} className="text-sm">
                    {t.settlement}:
                  </span>
                  <span style={{ color: '#E2E8F0' }} className="font-medium">
                    {report.settlementRange}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onLoadReport(report)}
                className="w-full py-2 rounded font-medium transition hover:opacity-90"
                style={{ backgroundColor: '#4F46E5', color: '#E2E8F0' }}
              >
                {t.viewReport}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
