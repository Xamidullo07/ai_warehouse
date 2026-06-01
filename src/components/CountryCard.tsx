import type { Country } from '../types';
import { formatArea, formatPopulation } from '../utils/formatters';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

export const CountryCard = ({ country, onClick }: CountryCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={country.flag} 
            alt={`${country.name} flag`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-2 left-2 text-white">
            <h3 className="text-xl font-bold">{country.name}</h3>
            <p className="text-sm opacity-90">{country.capital}</p>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Aholi:</span>
            <span className="font-semibold">{formatPopulation(country.population)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Maydon:</span>
            <span className="font-semibold">{formatArea(country.area)}</span>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {country.language.toUpperCase()}
            </Badge>
            {country.region && (
              <Badge variant="outline" className="text-xs">
                {country.region}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};