import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
} from "@shopify/shopify-app-remix";
import { SimpleMemorySessionStorage } from "./lib/memory-storage";
import { prisma } from "./db.server";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY || "c9f9779cdedb651e5744f8ad63c1dfaa",
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "dummy_secret_at_least_32_characters_long_123",
  apiVersion: LATEST_API_VERSION,
  scopes: ["read_products", "write_customers", "read_orders"],
  appUrl: process.env.SHOPIFY_APP_URL || "https://project-4l1jo.vercel.app",
  authPathPrefix: "/auth",
  sessionStorage: new SimpleMemorySessionStorage() as any,
  distribution: AppDistribution.AppStore,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
    },
  },
  future: {
    v3_authenticatePublic: true,
  },
});

export default shopify;
export const authenticate = shopify.authenticate;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
