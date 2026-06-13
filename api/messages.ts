import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { IncomingMessage, ServerResponse } from "http";

const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

const insertSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

const ADMIN_SECRET = process.env["ADMIN_SECRET"] ?? "abdimaalik2026";

function getDb() {
  const url = process.env["DATABASE_URL"];
  if (!url) throw new Error("DATABASE_URL not set");
  const pool = new pg.Pool({ connectionString: url });
  return drizzle(pool);
}

function isAdmin(authHeader: string | undefined): boolean {
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  return token === ADMIN_SECRET;
}

function parseBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try { resolve(JSON.parse(body || "{}")); }
      catch { reject(new Error("Invalid JSON")); }
    });
    req.on("error", reject);
  });
}

export default async function handler(req: IncomingMessage & { query?: Record<string, string> }, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Content-Type", "application/json");

  const send = (status: number, body: unknown) => {
    res.writeHead(status);
    res.end(body === undefined ? "" : JSON.stringify(body));
  };

  if (req.method === "OPTIONS") return send(200, {});

  const url = new URL(req.url ?? "/", "http://localhost");
  const id = url.searchParams.get("id");

  try {
    const db = getDb();

    if (req.method === "POST") {
      const body = await parseBody(req);
      const parsed = insertSchema.safeParse(body);
      if (!parsed.success) return send(400, { error: "Invalid data" });
      const [row] = await db.insert(messagesTable).values(parsed.data).returning();
      return send(201, row);
    }

    const auth = req.headers["authorization"] as string | undefined;
    if (!isAdmin(auth)) return send(401, { error: "Unauthorized" });

    if (req.method === "GET") {
      const rows = await db.select().from(messagesTable).orderBy(messagesTable.createdAt);
      return send(200, rows.reverse());
    }

    if (req.method === "PATCH" && id) {
      const [updated] = await db
        .update(messagesTable)
        .set({ isRead: true })
        .where(eq(messagesTable.id, Number(id)))
        .returning();
      if (!updated) return send(404, { error: "Not found" });
      return send(200, updated);
    }

    if (req.method === "DELETE" && id) {
      await db.delete(messagesTable).where(eq(messagesTable.id, Number(id)));
      res.writeHead(204);
      return res.end();
    }

    return send(405, { error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return send(500, { error: "Server error" });
  }
}
