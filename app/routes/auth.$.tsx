import { LoaderFunctionArgs } from "@remix-run/node";
import shopify from "../shopify.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await shopify.authenticate.admin(request);

  return null;
};
