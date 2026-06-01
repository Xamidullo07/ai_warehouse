import { Heart, ShoppingCart, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';
import type { Product } from '../types/warehouse';
import { formatPrice, calculateDiscountedPrice } from '../utils';
import { StarRating } from './StarRating';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name_uz = '', price, discount = 0, rating = 4, images = [] } = product;
  const mainImageUrl = images.find((item: any) => item.status === 'M')?.source || '';
  
  const { addToCart, removeFromCart, toggleFavorite, isInCart, isFavorite } = useCartStore();
  
  const inCart = isInCart(id);
  const favorited = isFavorite(id);
  
  const discountedPrice = calculateDiscountedPrice(price, discount);
  const cartItem = {
    id: id,
    name: name_uz,
    price: discountedPrice,
    quantity: 1,
    qty: 1,
  };

  const handleToggleFav = () => {
    toggleFavorite(id);
  };

  const handleToggleCart = () => {
    if (inCart) {
      removeFromCart(id);
    } else {
      addToCart(cartItem);
    }
  };

  return (
    <div className="group relative flex flex-col rounded-lg bg-white p-3 shadow-sm hover:shadow-lg transition-all duration-300 max-w-xs sm:max-w-sm md:max-w-md w-full">
      {discount > 0 && (
        <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600 text-white">
          -{discount}%
        </Badge>
      )}

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleFav}
          className="bg-white shadow-md hover:bg-gray-50"
        >
          <Heart
            className={cn(
              'w-5 h-5 transition-colors',
              favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
            )}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleCart}
          className="bg-white shadow-md hover:bg-gray-50"
        >
          {inCart ? (
            <Check className="w-5 h-5 text-emerald-500" />
          ) : (
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          )}
        </Button>
      </div>

      {/* Product Image */}
      <div className="mb-4 aspect-3/4 w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={mainImageUrl}
          alt={name_uz}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        {/* Price */}
        <div className="mb-2 flex items-center gap-2">
          {discount > 0 ? (
            <>
              <del className="text-sm text-gray-500">
                {formatPrice(price)}
              </del>
              <span className="text-lg font-bold text-emerald-600">
                {formatPrice(discountedPrice)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(price)}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="mb-3 text-base font-medium text-gray-900 line-clamp-2 flex-1">
          {name_uz}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <StarRating value={rating} readonly />
          <span className="text-xs text-gray-500">({rating}.0)</span>
        </div>
      </div>
    </div>
  );
};