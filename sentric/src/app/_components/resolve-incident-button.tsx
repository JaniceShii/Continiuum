"use client";

export function ResolveIncidentButton({ incidentId }: { incidentId: string }) {
  // INTEGRATION: Replace with tRPC mutation
  const handleResolve = () => {
    // api.incidents.resolve.mutate({ id: incidentId });
    alert("Marking as resolved - INTEGRATION: Connect to tRPC");
  };

  return (
    <button
      onClick={handleResolve}
      className="rounded-lg bg-gradient-to-r from-[#3fb950] to-[#2ea043] px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5"
    >
      Mark Resolved
    </button>
  );
}

