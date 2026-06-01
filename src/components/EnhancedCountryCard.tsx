import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Country } from '../types';
import { formatArea, formatPopulation } from '../utils/formatters';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Users, Globe, Star, Map, ExternalLink, Heart } from 'lucide-react';

interface EnhancedCountryCardProps {
  country: Country;
  index: number;
  onClick: () => void;
  onMapClick: () => void;
}

export const EnhancedCountryCard = ({ country, index, onClick, onMapClick }: EnhancedCountryCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="relative group"
    >
      <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/95 backdrop-blur-sm rounded-2xl">
        <div className="relative">
          {/* Country Flag as Background */}
          <div className="relative h-56 overflow-hidden">
            <motion.img 
              src={country.flag} 
              alt={`${country.name} flag`}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Floating Flag Icon */}
            <motion.div 
              className="absolute top-4 right-4 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={country.flag} 
                alt={country.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Like Button */}
            <motion.button
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </motion.button>
            
            {/* Country Info Overlay */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 text-white"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-1">{country.name}</h3>
              <p className="text-sm opacity-90 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {country.capital}
              </p>
            </motion.div>
          </div>
        </div>
        
        <CardContent className="p-5 space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div 
              className="bg-linear-to-r from-blue-50 to-blue-100 rounded-lg p-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium">Aholi</span>
              </div>
              <p className="font-bold text-blue-800">{formatPopulation(country.population)}</p>
            </motion.div>
            
            <motion.div 
              className="bg-linear-to-r from-green-50 to-green-100 rounded-lg p-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">Maydon</span>
              </div>
              <p className="font-bold text-green-800">{formatArea(country.area)}</p>
            </motion.div>
          </div>
          
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                {country.language.toUpperCase()}
              </Badge>
            </motion.div>
            {country.region && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Badge variant="outline" className="text-xs">
                  {country.region}
                </Badge>
              </motion.div>
            )}
            {country.landlocked && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">
                  Quruqlik
                </Badge>
              </motion.div>
            )}
          </div>
          
          {/* Landmarks Preview */}
          {country.landmarks && country.landmarks.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 flex items-center gap-1">
                <Star className="w-3 h-3" />
                Diqqatga sazovor joylar
              </p>
              <div className="flex gap-2">
                {country.landmarks.slice(0, 3).map((landmark) => (
                  <motion.div
                    key={landmark.id}
                    className="relative w-16 h-16 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    title={landmark.name}
                  >
                    <img 
                      src={landmark.image} 
                      alt={landmark.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </motion.div>
                ))}
                {country.landmarks.length > 3 && (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                    +{country.landmarks.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <motion.button
              className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClick}
            >
              Batafsil
              <ExternalLink className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              className="bg-linear-to-r from-green-500 to-green-600 text-white p-2 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onMapClick}
              title="Xaritada ko'rish"
            >
              <Map className="w-4 h-4" />
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};