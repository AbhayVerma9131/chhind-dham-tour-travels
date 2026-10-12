import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="space-y-4 max-w-md bg-white border border-slate-200/90 shadow-sm p-8 rounded-2xl">
        <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          404
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Page Not Found</h2>
        <p className="text-slate-600 text-sm">
          The requested page could not be located. Please check the URL or return to the main portal.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm"
          >
            <MoveLeft className="w-4 h-4" />
            <span>Back to छिंद धाम TOUR TRAVELS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
