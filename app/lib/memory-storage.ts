import { Session } from "@shopify/shopify-api";

export class SimpleMemorySessionStorage {
  private static sessions: Map<string, Session> = new Map();

  async storeSession(session: Session): Promise<boolean> {
    SimpleMemorySessionStorage.sessions.set(session.id, session);
    return true;
  }

  async loadSession(id: string): Promise<Session | undefined> {
    return SimpleMemorySessionStorage.sessions.get(id);
  }

  async deleteSession(id: string): Promise<boolean> {
    SimpleMemorySessionStorage.sessions.delete(id);
    return true;
  }

  async deleteSessions(ids: string[]): Promise<boolean> {
    ids.forEach((id) => SimpleMemorySessionStorage.sessions.delete(id));
    return true;
  }

  async findSessionsByShop(shop: string): Promise<Session[]> {
    return Array.from(SimpleMemorySessionStorage.sessions.values()).filter(
      (session) => session.shop === shop
    );
  }
}
