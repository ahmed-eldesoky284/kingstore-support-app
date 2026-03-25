import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, ResourceList, Text, Badge, BlockStack, Box, InlineStack } from "@shopify/polaris";
import { prisma } from "../db.server";
import { authenticate } from "../shopify.server"; // Assuming this path for authenticate

export const loader = async ({ request }: LoaderArgs) => {
  await authenticate.admin(request);
  
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
    });
    return json({ tickets });
  } catch (e) {
    console.warn("Database not ready yet, showing empty list.");
    return json({ tickets: [] });
  }
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
  const { tickets } = useLoaderData<typeof loader>() as { tickets: Ticket[] };

  return (
    <Page title="KingStore Support Hub" subtitle="Centralized management for royal inquiries.">
      <Layout>
        <Layout.Section>
          <Card padding="0">
            <ResourceList
              resourceName={{ singular: 'ticket', plural: 'tickets' }}
              items={tickets}
              renderItem={(item: Ticket) => {
                const { id, customer, message, status, channel, createdAt } = item;
                const date = new Date(createdAt).toLocaleDateString();
                
                return (
                  <ResourceList.Item id={id.toString()} accessibilityLabel={`View details for ${customer}`} onClick={() => {}}>
                    <Box padding="400">
                        <InlineStack align="space-between">
                            <BlockStack gap="200">
                                <Text as="h2" variant="bodyMd" fontWeight="bold">{customer}</Text>
                                <Text as="p" variant="bodySm" tone="subdued">"{message}"</Text>
                                <InlineStack gap="200">
                                    <Badge tone={status === 'open' ? 'critical' : 'attention'}>{status.toUpperCase()}</Badge>
                                    <Badge tone="info">{channel}</Badge>
                                </InlineStack>
                            </BlockStack>
                            <Text as="span" variant="bodyXs" tone="subdued">{date}</Text>
                        </InlineStack>
                    </Box>
                  </ResourceList.Item>
                );
              }}
            />
            {tickets.length === 0 && (
                <Box padding="1000">
                    <BlockStack align="center">
                        <Text as="p" variant="bodyMd" tone="subdued">لا توجد رسائل حالياً (No messages yet)</Text>
                    </BlockStack>
                </Box>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
