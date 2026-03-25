import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, ResourceList, Text, Badge, BlockStack, Box, InlineStack } from "@shopify/polaris";
import { prisma } from "../db.server";
import { authenticate } from "../shopify.server"; // Assuming this path for authenticate

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Comment out authentication for diagnostic landing page
  // await authenticate.admin(request);
  
  return json({ ok: true });
};

interface Ticket {
  id: number;
  customer: string;
  message: string;
  status: string;
  channel: string;
  createdAt: string;
}

export default function Index() {
  return (
    <Page title="KingStore Support App">
      <Layout>
        <Layout.Section>
          <Card padding="500">
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">التطبيق يعمل بنجاح! 🚀</Text>
              <Text as="p">الخادم متصل الآن. للبدء، يرجى تهيئة المتغيرات (API Key & Secret) في إعدادات Vercel.</Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
