# KingStore Support App

This is a standalone Shopify App developed for managing customer support tickets.

## Setup Instructions
1. `cd kingstore-support-app`
2. `npm install`
3. `npx prisma db push` (to initialize the local database)
4. `npm run dev` (to start development mode)

## Deployment
1. Create a project on **Vercel**.
2. Set Environment Variables:
   - `SHOPIFY_API_KEY`: Found in Shopify Partner Dashboard.
   - `SHOPIFY_API_SECRET`: Found in Shopify Partner Dashboard.
   - `DATABASE_URL`: Your production database URL.
3. Deploy!

## API Endpoint
- POST `/api/tickets`: Connect your theme's support form to this URL.
