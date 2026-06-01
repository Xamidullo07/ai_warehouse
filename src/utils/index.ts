export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateDiscountedPrice = (price: number, discount: number): number => {
  return discount > 0 ? price - (price * discount) / 100 : price;
};