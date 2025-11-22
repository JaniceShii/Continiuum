"use client";

import Link from "next/link";
import { LayoutWrapper } from "~/app/_components/layout-wrapper";
import { mockServers } from "~/lib/mock-data";

export default function ServersPage() {
  // INTEGRATION: Replace with tRPC call
  // const { data: servers } = api.servers.getAll.useQuery();
  const servers = mockServers;

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#f0f6fc]">Servers</h1>
          {/* INTEGRATION: Replace with tRPC mutation */}
          <button
            onClick={() => {
              // api.servers.refresh.mutate();
              alert("Refreshing servers - INTEGRATION: Connect to tRPC");
            }}
            className="rounded-lg bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
          >
            Refresh
          </button>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#30363d]">
              <thead className="bg-[#161b22]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8b949e]">
                    Container Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8b949e]">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8b949e]">
                    CPU Usage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8b949e]">
                    Memory Usage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8b949e]">
                    Last Crash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8b949e]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d] bg-[#161b22]">
                {servers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-[#8b949e]">
                      No servers found
                    </td>
                  </tr>
                ) : (
                  servers.map((server) => (
                    <tr key={server.id} className="hover:bg-[#1f2937] transition-colors">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-[#f0f6fc]">
                          {server.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            server.status === "running"
                              ? "badge-success"
                              : server.status === "crashed"
                                ? "badge-error"
                                : "bg-[#30363d] text-[#c9d1d9] border border-[#30363d]"
                          }`}
                        >
                          {server.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#30363d]">
                              <div
                                className={`h-full transition-all ${
                                  server.cpu > 80
                                    ? "bg-gradient-to-r from-[#f85149] to-[#da3633]"
                                    : server.cpu > 60
                                      ? "bg-gradient-to-r from-[#d29922] to-[#bb8009]"
                                      : "bg-gradient-to-r from-[#3fb950] to-[#2ea043]"
                                }`}
                                style={{ width: `${Math.min(server.cpu, 100)}%` }}
                              />
                            </div>
                          </div>
                          <span className="ml-2 text-sm text-[#f0f6fc]">
                            {server.cpu.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#30363d]">
                              <div
                                className={`h-full transition-all ${
                                  server.memory > 80
                                    ? "bg-gradient-to-r from-[#f85149] to-[#da3633]"
                                    : server.memory > 60
                                      ? "bg-gradient-to-r from-[#d29922] to-[#bb8009]"
                                      : "bg-gradient-to-r from-[#3fb950] to-[#2ea043]"
                                }`}
                                style={{ width: `${Math.min(server.memory, 100)}%` }}
                              />
                            </div>
                          </div>
                          <span className="ml-2 text-sm text-[#f0f6fc]">
                            {server.memory.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-[#8b949e]">
                        {server.lastCrashTime
                          ? server.lastCrashTime.toLocaleString()
                          : "Never"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {/* INTEGRATION: Replace with tRPC mutation */}
                          <button
                            onClick={() => {
                              // api.servers.reset.mutate({ serverId: server.id });
                              alert(`Reset ${server.name} - INTEGRATION: Connect to tRPC`);
                            }}
                            className="text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
                          >
                            Reset
                          </button>
                          <span className="text-[#30363d]">|</span>
                          <Link
                            href={`/servers/${server.id}/logs`}
                            className="text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
                          >
                            View Logs
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
