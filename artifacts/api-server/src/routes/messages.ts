import { Router } from "express";
import { db, messagesTable, insertMessageSchema } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

const ADMIN_SECRET = process.env["ADMIN_SECRET"] ?? "abdimaalik2026";

function requireAdmin(req: { headers: Record<string, string | string[] | undefined> }, res: { status: (n: number) => { json: (b: unknown) => void } }): boolean {
  const auth = req.headers["authorization"] as string | undefined;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (token !== ADMIN_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

router.post("/messages", async (req, res) => {
  try {
    const parsed = insertMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      return void res.status(400).json({ error: "Invalid data", details: parsed.error.issues });
    }
    const [inserted] = await db.insert(messagesTable).values(parsed.data).returning();
    return void res.status(201).json(inserted);
  } catch (err) {
    req.log.error({ err }, "Failed to insert message");
    return void res.status(500).json({ error: "Server error" });
  }
});

router.get("/messages", async (req, res) => {
  if (!requireAdmin(req as Parameters<typeof requireAdmin>[0], res as Parameters<typeof requireAdmin>[1])) return;
  try {
    const rows = await db
      .select()
      .from(messagesTable)
      .orderBy(messagesTable.createdAt);
    return void res.json(rows.reverse());
  } catch (err) {
    req.log.error({ err }, "Failed to fetch messages");
    return void res.status(500).json({ error: "Server error" });
  }
});

router.patch("/messages/:id/read", async (req, res) => {
  if (!requireAdmin(req as Parameters<typeof requireAdmin>[0], res as Parameters<typeof requireAdmin>[1])) return;
  try {
    const id = Number(req.params["id"]);
    const [updated] = await db
      .update(messagesTable)
      .set({ isRead: true })
      .where(eq(messagesTable.id, id))
      .returning();
    if (!updated) return void res.status(404).json({ error: "Not found" });
    return void res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to mark message as read");
    return void res.status(500).json({ error: "Server error" });
  }
});

router.delete("/messages/:id", async (req, res) => {
  if (!requireAdmin(req as Parameters<typeof requireAdmin>[0], res as Parameters<typeof requireAdmin>[1])) return;
  try {
    const id = Number(req.params["id"]);
    await db.delete(messagesTable).where(eq(messagesTable.id, id));
    return void res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete message");
    return void res.status(500).json({ error: "Server error" });
  }
});

export default router;
