import { X } from 'lucide-react';
import type { Country } from '../types';
import { formatNumber, formatArea } from '../utils/formatters';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface CountryDetailProps {
  country: Country | null;
  onClose: () => void;
}

export const CountryDetail = ({ country, onClose }: CountryDetailProps) => {
  if (!country) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={country.flag} 
            alt={`${country.name} flag`}
            className="w-full h-64 object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-3xl font-bold">{country.name}</h2>
            <p className="text-xl text-gray-600 mt-1">{country.capital}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Aholi soni</p>
              <p className="text-2xl font-bold">{formatNumber(country.population)}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Maydoni</p>
              <p className="text-2xl font-bold">{formatArea(country.area)}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Til: {country.language.toUpperCase()}
            </Badge>
            {country.region && (
              <Badge variant="outline" className="text-sm px-3 py-1">
                Region: {country.region}
              </Badge>
            )}
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Statistika</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Aholi zichligi:</span>
                <span className="font-medium">
                  {formatNumber(Math.round(country.population / country.area))} kishi/km²
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-medium">#{country.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};