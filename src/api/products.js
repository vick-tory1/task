const API_DELAY_MS = 1000;

export async function fetchProducts() {
  await new Promise((resolve) => {
    window.setTimeout(resolve, API_DELAY_MS);
  });

  const response = await fetch('/products.json');

  if (!response.ok) {
    throw new Error('Unable to fetch TechBazaar gadgets right now.');
  }

  return response.json();
}
