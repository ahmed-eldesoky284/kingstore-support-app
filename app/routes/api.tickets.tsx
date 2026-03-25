import { json, type ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const formData = await request.formData();
  const customer = formData.get("customer") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const channel = formData.get("channel") as string;

  if (!customer || !email || !message) {
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  const ticket = await prisma.ticket.create({
    data: {
      customer,
      email,
      message,
      channel: channel || "Web",
    },
  });

  return json({ success: true, ticketId: ticket.id });
};

// Also handle GET for testing
export const loader = async () => {
    return json({ status: "API is active" });
};
