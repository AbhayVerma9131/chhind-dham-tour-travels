import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Shield, Clock } from "lucide-react";

export default async function AdminAuditPage() {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let auditLogs: any[] = [];
  try {
    auditLogs = await prisma.auditLog.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      include: { adminUser: true },
    });
  } catch {
    // Database fallback
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Security &amp; Operations Audit Trail
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Immutable audit record of administrative actions, booking status changes, and sensitive system operations.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Target ID</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No administrative audit events recorded yet.
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-500">
                      {log.createdAt.toISOString().replace("T", " ").slice(0, 19)}
                    </td>
                    <td className="py-4 px-4 font-bold text-blue-600">{log.action}</td>
                    <td className="py-4 px-4 text-slate-800 font-medium">{log.targetEntity}</td>
                    <td className="py-4 px-4 font-mono text-slate-500">{log.targetId || "—"}</td>
                    <td className="py-4 px-4 text-slate-700">
                      {log.adminUser?.name || "System Admin"}
                    </td>
                    <td className="py-4 px-4 text-slate-500 max-w-xs font-mono text-[10px]">
                      {log.details ? JSON.stringify(log.details) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
