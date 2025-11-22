import { notFound } from "next/navigation";
import { LayoutWrapper } from "~/app/_components/layout-wrapper";
import { ResolveIncidentButton } from "~/app/_components/resolve-incident-button";
import { mockIncidents } from "~/lib/mock-data";

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // INTEGRATION: Replace with tRPC call
  // const incident = await api.incidents.getById({ id: params.id });
  const resolvedParams = await params;
  const incident = mockIncidents.find((i) => i.id === resolvedParams.id);

  if (!incident) {
    notFound();
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#f0f6fc]">Incident Details</h1>
            <p className="mt-1 text-sm text-[#8b949e]">
              {incident.serverName} • {incident.timestamp.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {incident.resolved ? (
              <span className="badge-success inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                Resolved
              </span>
            ) : (
              <span className="badge-error inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                Active
              </span>
            )}
            {!incident.resolved && <ResolveIncidentButton incidentId={incident.id} />}
          </div>
        </div>

        {/* AI Summary */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-[#f0f6fc] mb-4">AI Summary</h2>
          <p className="text-sm text-[#c9d1d9] leading-relaxed">{incident.aiSummary}</p>
        </div>

        {/* Suggested Fix */}
        <div className="rounded-lg border border-[#58a6ff]/30 bg-gradient-to-br from-[#58a6ff]/10 to-[#bc8cff]/10 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-[#58a6ff] mb-4">Suggested Fix</h2>
          <div className="rounded-md bg-[#0d1117] p-4 border border-[#30363d]">
            <pre className="whitespace-pre-wrap text-sm text-[#c9d1d9] font-mono">
              {incident.aiFix}
            </pre>
          </div>
        </div>

        {/* Raw Logs */}
        <div className="card">
          <div className="border-b border-[#30363d] px-6 py-4">
            <h2 className="text-lg font-semibold text-[#f0f6fc]">Raw Logs</h2>
          </div>
          <div className="px-6 py-4">
            <div className="rounded-md bg-[#0a0d14] p-4 overflow-x-auto border border-[#30363d]">
              <pre className="text-xs text-[#c9d1d9] font-mono whitespace-pre">
                {incident.logs}
              </pre>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between card p-6">
          <div>
            <h3 className="text-sm font-medium text-[#f0f6fc]">Related Deployment</h3>
            <p className="mt-1 text-sm text-[#8b949e]">
              View deployment history for this server
            </p>
          </div>
          {/* INTEGRATION: Replace with actual link */}
          <form
            action={async () => {
              "use server";
              // INTEGRATION: Navigate to deployment page
              alert("View related deployment - INTEGRATION: Add deployment page");
            }}
          >
            <button
              type="submit"
              className="rounded-lg bg-[#21262d] px-4 py-2 text-sm font-medium text-[#c9d1d9] transition-colors hover:bg-[#30363d] border border-[#30363d]"
            >
              View Deployment
            </button>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
