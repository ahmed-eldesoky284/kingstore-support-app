import { LoaderFunctionArgs } from "@remix-run/node";
import shopify from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (!shop) throw new Error("Shop parameter is missing");
  
  return await shopify.login(request);
};
