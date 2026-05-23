import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-[#0f172a] text-[#1e293b] dark:text-[#f8fafc] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#38bdf8] mb-4 font-['JetBrains_Mono']">404</div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-[#64748b] dark:text-[#94a3b8] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#38bdf8] text-[#0f172a] px-5 py-2.5 rounded-lg font-medium hover:bg-[#7dd3fc] transition-colors"
          >
            <FiHome /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-[#cbd5e1] dark:border-[#334155] text-[#64748b] dark:text-[#94a3b8] px-5 py-2.5 rounded-lg hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors cursor-pointer"
          >
            <FiArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
