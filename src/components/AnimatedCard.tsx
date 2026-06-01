import { motion } from 'framer-motion';
import type { Country } from '../types';
import { formatArea, formatPopulation } from '../utils/formatters';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Users, Globe } from 'lucide-react';

interface AnimatedCardProps {
  country: Country;
  index: number;
  onClick: () => void;
}

export const AnimatedCard = ({ country, index, onClick }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="relative group">
            <motion.img 
              src={country.flag} 
              alt={`${country.name} flag`}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              initial={false}
            >
              <h3 className="text-xl font-bold">{country.name}</h3>
              <p className="text-sm opacity-90 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {country.capital}
              </p>
            </motion.div>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Users className="w-4 h-4" />
                Aholi
              </span>
              <motion.span 
                className="font-semibold text-blue-600"
                whileHover={{ scale: 1.1 }}
              >
                {formatPopulation(country.population)}
              </motion.span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Maydon
              </span>
              <motion.span 
                className="font-semibold text-green-600"
                whileHover={{ scale: 1.1 }}
              >
                {formatArea(country.area)}
              </motion.span>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};