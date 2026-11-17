# Vany Cake and More

This website uses React Router for page navigation and Vite for local development and production builds.

## Get started

Install the project packages, then start the development server:

```sh
npm install
npm run dev
```

Open the local address printed by Vite. To create and preview a production build, run:

```sh
npm run build
npm run preview
```

## Project layout

- `index.html` is the main Vite page entry; `404.html` is built as Vercel's custom not-found page.
- `src/main.jsx` starts the React application.
- `src/App.jsx` defines routes, shared page layout, metadata, and the not-found route.
- `src/pages/` contains the home, about, contact, and not-found page components.
- `src/components/` contains reusable interface elements such as the header, footer, product cards, and WhatsApp icon.
- `src/assets/images.js` imports the existing image files so Vite includes them in the production build.
- `src/data/products.js` holds the menu items, categories, and customer reviews.
- `src/config.js` holds the business contact details and WhatsApp link helper.
- `src/index.css` is the stylesheet entry point; it imports the existing `style.css` and `pages.css`.
- The site follows the visitor's light or dark device appearance preference.
- `images/` contains the original image files; they are kept in place and used by the React asset registry.
- `about.html` and `contact.html` are retained as legacy compatibility paths and route to their React pages. `404.html` mounts the shared React app so unknown Vercel routes display the same not-found page with an HTTP 404 response.

To add a menu item, add an object to `products` in `src/data/products.js`. Product cards, filters, search, photo previews, and WhatsApp enquiry text are generated from that list.

The site routes are `/`, `/about`, and `/contact`. Navigation stays within the React app,
and Vercel rewrites direct requests to supported routes to the app entry point. Unknown
routes use the built `404.html` page and display the React not-found view.
