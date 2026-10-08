import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-slate-800 tracking-wider">404</h1>
          <p className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-400">
            Page Not Found
          </p>
        </div>

        <p className="text-slate-400 text-sm">
          Oops! The page or project case study you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
