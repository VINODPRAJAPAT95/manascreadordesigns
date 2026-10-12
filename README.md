# Manas Automotive Parts - Website (React + Vite + Tailwind + Framer Motion)

## Run
    npm install
    npm run dev       # development
    npm run build     # production build (dist/)

## Edit
- Phone / email / address / social links / menu: `src/data/siteData.js`
- Logo: `src/assets/logo.png` (replace with a transparent PNG if available)
- Hero background images: `src/components/Hero.jsx` (slides array)
- Customer logos: `src/components/Customers.jsx`
- Colors and fonts: `tailwind.config.js`
- Only Home is complete. All other menu pages show "Work in progress" (`src/pages/WorkInProgress.jsx`).

## Real product images (transparent PNG)
Put transparent PNGs in `src/assets/products/` named `car-mirror.png`, `bike-mirror.png`, `interior-mirror.png`, `convex-mirror.png`.
They replace the animated SVG mirrors everywhere automatically (hero, products, testimonials, news).
Leaders photos: `src/assets/leaders/chairman.jpg`, `director.jpg`. Quote background: `src/assets/bg/quote-bg.jpg`.
Forms (quote + newsletter) show a success message only - connect them to your backend/email service.
