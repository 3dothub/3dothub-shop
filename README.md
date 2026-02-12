# 3DotHub Shop

Mobile-first ecommerce boilerplate built with Next.js (App Router), Redux Toolkit + RTK Query, Tailwind CSS, Ant Design, and MongoDB API routes.

## Setup

1. Install dependencies:
	- `npm install`
2. Create an environment file:
	- Copy `.env.example` to `.env.local`
	- Update `MONGODB_URI` and `MONGODB_DB`
3. Start the dev server:
	- `npm run dev`

## API

`GET /api/products` currently serves mock data from `src/lib/constant/shop.ts`.
Replace it with MongoDB when ready.

## Notes

- The homepage uses RTK Query to fetch products.
- Cart state is managed with Redux Toolkit.
- Ant Design is used for UI elements with Tailwind for layout.
