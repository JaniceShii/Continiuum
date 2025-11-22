"use client";

import { useState } from "react";
import { LayoutWrapper } from "~/app/_components/layout-wrapper";
import { mockOrgs, type Org } from "~/lib/mock-data";

export default function OrgsPage() {
  // INTEGRATION: Replace with tRPC call
  // const { data: orgs } = api.orgs.getMyOrgs.useQuery();
  const [orgs, setOrgs] = useState<Org[]>(mockOrgs);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState<string | null>(null);
  const [newOrgName, setNewOrgName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "member">("member");

  const handleCreateOrg = () => {
    if (!newOrgName.trim()) return;

    // INTEGRATION: Replace with tRPC mutation
    // api.orgs.create.mutate({ name: newOrgName });
    const newOrg: Org = {
      id: `org-${Date.now()}`,
      name: newOrgName,
      members: [],
    };
    setOrgs([...orgs, newOrg]);
    setNewOrgName("");
    setShowCreateModal(false);
  };

  const handleAddUser = (orgId: string) => {
    if (!newUserEmail.trim()) return;

    // INTEGRATION: Replace with tRPC mutation
    // api.orgs.addUser.mutate({ orgId, email: newUserEmail, role: newUserRole });
    setOrgs(
      orgs.map((org) => {
        if (org.id === orgId) {
          return {
            ...org,
            members: [
              ...org.members,
              {
                id: `member-${Date.now()}`,
                userId: `user-${Date.now()}`,
                userName: newUserEmail.split("@")[0] || "User",
                userEmail: newUserEmail,
                role: newUserRole,
              },
            ],
          };
        }
        return org;
      })
    );
    setNewUserEmail("");
    setNewUserRole("member");
    setShowAddUserModal(null);
  };

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#f0f6fc]">Organizations</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-lg bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
          >
            Create Organization
          </button>
        </div>

        {/* Organizations List */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {orgs.map((org) => (
            <div key={org.id} className="card">
              <div className="border-b border-[#30363d] px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#f0f6fc]">{org.name}</h2>
                  <button
                    onClick={() => setShowAddUserModal(org.id)}
                    className="rounded-lg bg-[#21262d] px-3 py-1.5 text-sm font-medium text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d] transition-colors"
                  >
                    Add User
                  </button>
                </div>
              </div>
              <div className="divide-y divide-[#30363d]">
                {org.members.length === 0 ? (
                  <div className="px-6 py-8 text-center text-sm text-[#8b949e]">
                    No members yet
                  </div>
                ) : (
                  org.members.map((member) => (
                    <div key={member.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#f0f6fc]">
                            {member.userName}
                          </p>
                          <p className="text-sm text-[#8b949e]">{member.userEmail}</p>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            member.role === "admin"
                              ? "bg-gradient-to-r from-[#58a6ff]/20 to-[#bc8cff]/20 text-[#58a6ff] border border-[#58a6ff]/30"
                              : "bg-[#30363d] text-[#c9d1d9] border border-[#30363d]"
                          }`}
                        >
                          {member.role}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Create Organization Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md card p-6">
              <h2 className="text-lg font-semibold text-[#f0f6fc] mb-4">
                Create Organization
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#c9d1d9] mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] focus:border-[#58a6ff] focus:outline-none focus:ring-1 focus:ring-[#58a6ff]"
                    placeholder="Enter organization name"
                  />
                </div>
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setNewOrgName("");
                    }}
                    className="rounded-lg bg-[#21262d] px-4 py-2 text-sm font-medium text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateOrg}
                    className="rounded-lg bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md card p-6">
              <h2 className="text-lg font-semibold text-[#f0f6fc] mb-4">Add User</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#c9d1d9] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] focus:border-[#58a6ff] focus:outline-none focus:ring-1 focus:ring-[#58a6ff]"
                    placeholder="user@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c9d1d9] mb-1">
                    Role
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) =>
                      setNewUserRole(e.target.value as "admin" | "member")
                    }
                    className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] focus:border-[#58a6ff] focus:outline-none focus:ring-1 focus:ring-[#58a6ff]"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowAddUserModal(null);
                      setNewUserEmail("");
                      setNewUserRole("member");
                    }}
                    className="rounded-lg bg-[#21262d] px-4 py-2 text-sm font-medium text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddUser(showAddUserModal)}
                    className="rounded-lg bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
}
