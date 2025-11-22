// Mock data for frontend development
// TODO: Replace with actual tRPC calls marked with //INTEGRATION

export interface Server {
  id: string;
  name: string;
  status: "running" | "stopped" | "crashed";
  cpu: number;
  memory: number;
  updatedAt: Date;
  lastCrashTime?: Date;
}

export interface Incident {
  id: string;
  serverId: string;
  serverName: string;
  timestamp: Date;
  logs: string;
  aiSummary: string;
  aiFix: string;
  resolved: boolean;
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  type: "error" | "deployment" | "incident" | "info";
}

export interface Org {
  id: string;
  name: string;
  members: OrgMember[];
}

export interface OrgMember {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: "admin" | "member";
}

// Mock data
export const mockServers: Server[] = [
  {
    id: "1",
    name: "web-server-01",
    status: "running",
    cpu: 45.2,
    memory: 62.8,
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "api-server-02",
    status: "running",
    cpu: 78.5,
    memory: 89.3,
    updatedAt: new Date(Date.now() - 300000),
    lastCrashTime: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    name: "db-server-03",
    status: "crashed",
    cpu: 0,
    memory: 0,
    updatedAt: new Date(Date.now() - 600000),
    lastCrashTime: new Date(Date.now() - 600000),
  },
  {
    id: "4",
    name: "cache-server-04",
    status: "running",
    cpu: 23.1,
    memory: 34.5,
    updatedAt: new Date(),
  },
];

export const mockIncidents: Incident[] = [
  {
    id: "1",
    serverId: "3",
    serverName: "db-server-03",
    timestamp: new Date(Date.now() - 600000),
    logs: `[2024-01-15 10:22:15] ERROR: Out of memory exception
[2024-01-15 10:22:14] WARN: Memory usage at 98%
[2024-01-15 10:22:13] INFO: Processing query batch
[2024-01-15 10:22:12] INFO: Connection pool exhausted
[2024-01-15 10:22:11] ERROR: Failed to allocate memory for query result`,
    aiSummary: "The database server experienced an out-of-memory (OOM) error due to excessive connection pooling and large query result sets. The system was unable to allocate additional memory when processing a batch of queries.",
    aiFix: "1. Increase memory limits for the container\n2. Reduce connection pool size from 100 to 50\n3. Implement query result pagination\n4. Add memory monitoring alerts at 85% threshold",
    resolved: false,
  },
  {
    id: "2",
    serverId: "2",
    serverName: "api-server-02",
    timestamp: new Date(Date.now() - 86400000),
    logs: `[2024-01-14 14:30:22] ERROR: Connection timeout to database
[2024-01-14 14:30:20] WARN: Retry attempt 3/3 failed
[2024-01-14 14:30:18] INFO: Attempting database connection
[2024-01-14 14:30:15] ERROR: Network interface down`,
    aiSummary: "API server lost connection to the database due to network interface failure. Multiple retry attempts were unsuccessful.",
    aiFix: "1. Restart network interface\n2. Verify database server is accessible\n3. Check firewall rules\n4. Implement exponential backoff retry strategy",
    resolved: true,
  },
  {
    id: "3",
    serverId: "1",
    serverName: "web-server-01",
    timestamp: new Date(Date.now() - 172800000),
    logs: `[2024-01-13 09:15:33] ERROR: SSL certificate expired
[2024-01-13 09:15:32] WARN: Certificate expires in 0 days
[2024-01-13 09:15:30] INFO: Starting HTTPS server`,
    aiSummary: "Web server failed to start due to expired SSL certificate. The certificate had reached its expiration date.",
    aiFix: "1. Renew SSL certificate\n2. Update certificate in container\n3. Restart web server\n4. Set up automatic certificate renewal",
    resolved: true,
  },
];

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 600000),
    title: "app crashed (OOM)",
    description: "db-server-03 experienced out-of-memory error",
    type: "error",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1800000),
    title: "deployment: image app:v13",
    description: "New version deployed to production",
    type: "deployment",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 3600000),
    title: "incident resolved",
    description: "api-server-02 connection issue fixed",
    type: "incident",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 86400000),
    title: "app crashed (Connection timeout)",
    description: "api-server-02 lost database connection",
    type: "error",
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 172800000),
    title: "deployment: image app:v12",
    description: "Previous version deployed",
    type: "deployment",
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 172800000),
    title: "SSL certificate expired",
    description: "web-server-01 certificate renewal required",
    type: "error",
  },
];

export const mockOrgs: Org[] = [
  {
    id: "1",
    name: "Engineering Team",
    members: [
      {
        id: "1",
        userId: "user1",
        userName: "John Doe",
        userEmail: "john@example.com",
        role: "admin",
      },
      {
        id: "2",
        userId: "user2",
        userName: "Jane Smith",
        userEmail: "jane@example.com",
        role: "member",
      },
    ],
  },
  {
    id: "2",
    name: "DevOps Team",
    members: [
      {
        id: "3",
        userId: "user1",
        userName: "John Doe",
        userEmail: "john@example.com",
        role: "member",
      },
      {
        id: "4",
        userId: "user3",
        userName: "Bob Johnson",
        userEmail: "bob@example.com",
        role: "admin",
      },
    ],
  },
];

