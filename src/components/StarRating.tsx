import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  readonly?: boolean;
  onChange?: (value: number) => void;
}

export const StarRating = ({ value, readonly = true, onChange }: StarRatingProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(star)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <Star
            className={`w-4 h-4 ${
              star <= value
                ? 'fill-emerald-500 text-emerald-500'
                : 'fill-gray-300 text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};