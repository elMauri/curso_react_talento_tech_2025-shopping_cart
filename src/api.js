export const fetchProducts = async () => {
  const res = await fetch('/products');
  if (!res.ok) throw new Error('Error fetching products');
  return await res.json();
};