import { ActionFunctionArgs } from "@remix-run/node";
import shopify from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session, admin } = await shopify.authenticate.webhook(
    request
  );

  if (!admin) {
    // The webhook payload was invalid or the shop is not installed
    throw new Response("Unauthorized", { status: 401 });
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await (shopify.sessionStorage as any).deleteSession(session.id);
      }
      break;
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
