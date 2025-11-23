"use client";

import type { Incident } from "~/lib/mock-data";

type TimelineProps = {
  incidents: Incident[];
};

export function IncidentTimeline({ incidents }: TimelineProps) {
  const sorted = [...incidents].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  return (
    <div className="card p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#f0f6fc]">
        Incident Timeline
      </h2>

      <div className="relative h-20">
        {/* horizontal line */}
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#30363d]" />

        {/* markers */}
        <div className="relative flex h-full items-center justify-between">
          {sorted.map((incident) => (
            <div key={incident.id} className="flex flex-col items-center">
              <div className="h-4 w-px bg-[#30363d]" />
              <div
                className={`mt-1 h-3 w-3 rounded-full border ${
                  incident.resolved
                    ? "bg-[#238636] border-[#3fb950]"
                    : "bg-[#da3633] border-[#f85149]"
                }`}
                title={incident.serverName}
              />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-[#8b949e]">
        Each marker represents an incident in chronological order.
      </p>
    </div>
  );
}
