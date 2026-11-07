This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Adding food photos

Add photos to `public/images/menu/` using the matching menu item id as the filename, for example `jollof-rice.webp`. The site looks for each optional menu image at `/images/menu/<item-id>.webp`; WebP is preferred, and `.jpg` paths can also be set in `src/data/menu.ts`.

Use a 1000 by 1000 square or 1200 by 900 landscape image, ideally under 300 KB. Photos should show the food clearly with no filters or effects.

Current item ids:

- `jollof-rice`
- `fried-rice`
- `half-and-half`
- `chicken`
- `fish`
- `fried-plantain`
- `salad`
- `stir-fried-spaghetti`
- `cake`
- `cupcake`
- `whole-cake`
- `bottled-water-50cl`
- `bottled-water-75cl`
- `soft-drink`
