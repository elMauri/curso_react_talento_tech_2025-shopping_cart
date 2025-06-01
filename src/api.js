export const fetchProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Error fetching products');
  return await res.json();
};