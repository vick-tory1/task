# TechBazaar Gadget Store

TechBazaar is a responsive React storefront for browsing affordable gadgets, searching products, and managing a simple local shopping cart. The app is built with Vite and uses a local JSON file as a mock API source, making it easy to run without a backend server.

## Overview

The app presents a small gadget catalog with laptops and smartphones, including product images, short product descriptions, Nigerian naira pricing, and quantity controls. Users can search the catalog, add products to a cart, increase or decrease item quantities, clear the cart, and see live totals for both item count and cart amount.

## Features

- Responsive TechBazaar storefront layout
- Sticky navigation with links to Home, Search, About, Gadgets, and Cart
- Product data loaded from a mock API file
- Artificial loading delay to simulate a real API request
- Loading state with spinner
- Error handling with retry support
- Product search by name
- Product cards with images, fallback images, labels, notes, and prices
- Add to Cart button for each product
- Quantity stepper for increasing and decreasing product quantities
- Cart summary with total items and total amount
- Clear cart button
- Prices formatted in Nigerian naira
- Mobile, tablet, and desktop responsive styling
- Accessibility touches such as skip link, input labels, focus states, and ARIA labels

## Tech Stack

- React 18
- Vite
- JavaScript
- Plain CSS
- Local JSON data

## Project Structure

```text
.
+-- public
|   +-- products.json
|   +-- placeholders
|       +-- hp-elitebook.svg
|       +-- iphone-12.svg
|       +-- samsung-s21.svg
+-- src
|   +-- api
|   |   +-- products.js
|   +-- App.jsx
|   +-- main.jsx
|   +-- styles.css
+-- index.html
+-- package.json
+-- vite.config.js
+-- README.md
```

## Key Files

`src/App.jsx` contains the main app interface and logic, including product loading, search filtering, cart quantity updates, total calculations, and page sections.

`src/api/products.js` simulates an API call by waiting briefly before fetching `/products.json`.

`public/products.json` stores the product catalog used by the app.

`src/styles.css` contains all layout, visual design, responsive rules, buttons, cards, product grid, cart panel, loading spinner, and focus states.

`vite.config.js` customizes the production build output names for the JavaScript and CSS assets.

## Cart Behavior

The cart is managed with local React state. Each product ID stores its selected quantity. Adding a product increases its quantity by one, decreasing removes one item, and products are removed from the cart when their quantity reaches zero.

The cart summary automatically updates:

- Total item count
- Total cart amount
- Empty or active cart message
- Clear cart button state

Cart data is not saved after refreshing the page because the app does not use local storage or a backend database.

## Product Data

The current sample catalog includes:

- HP EliteBook 840
- iPhone 12
- Samsung Galaxy S21

Each product includes an ID, name, price, main image URL, and fallback SVG image.

## Running The App

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Assumptions

- Product prices are displayed in Nigerian naira.
- Product data is treated as a mock API response.
- Cart state is local to the current browser session.
- The app is designed as a frontend-only product listing experience.
