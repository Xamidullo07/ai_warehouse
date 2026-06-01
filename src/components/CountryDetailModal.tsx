import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Users, Globe, Clock, DollarSign, CheckCircle, Landmark } from 'lucide-react';
import type { Country } from '../types';
import { formatNumber, formatArea } from '../utils/formatters';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

interface CountryDetailModalProps {
  country: Country | null;
  onClose: () => void;
}

export const CountryDetailModal = ({ country, onClose }: CountryDetailModalProps) => {
  if (!country) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <motion.img 
              src={country.flag} 
              alt={`${country.name} flag`}
              className="w-full h-64 object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7 }}
            />
            <motion.div 
              className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
            <motion.div 
              className="absolute bottom-6 left-6 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-2">{country.name}</h2>
              <p className="text-xl opacity-90 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {country.capital}
              </p>
            </motion.div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Key Statistics */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Aholi soni</p>
                  <p className="text-2xl font-bold text-blue-800">{formatNumber(country.population)}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 text-center">
                  <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Maydoni</p>
                  <p className="text-2xl font-bold text-green-800">{formatArea(country.area)}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Valyuta</p>
                  <p className="text-2xl font-bold text-purple-800">{country.currency}</p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Additional Information */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg mb-3">Asosiy ma'lumotlar</h3>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Region</span>
                    <span className="font-medium">{country.region}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Subregion</span>
                    <span className="font-medium">{country.subregion}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Til</span>
                    <Badge variant="secondary">{country.language.toUpperCase()}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Vaqt zonası
                    </span>
                    <span className="font-medium">{country.timezone}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg mb-3">Xususiyatlar</h3>
                  
                  <div className="flex items-center gap-2 py-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Mustaqil: {country.independent ? 'Ha' : 'Yo\'q'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 py-2">
                    <Landmark className="w-5 h-5 text-blue-600" />
                    <span>BMT a'zosi: {country.unMember ? 'Ha' : 'Yo\'q'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 py-2">
                    <Globe className="w-5 h-5 text-orange-600" />
                    <span>Quruqlik bilan o'ralgan: {country.landlocked ? 'Ha' : 'Yo\'q'}</span>
                  </div>
                  
                  {country.borders && country.borders.length > 0 && (
                    <div className="py-2">
                      <p className="text-gray-600 mb-2">Qo'shni davlatlar:</p>
                      <div className="flex flex-wrap gap-1">
                        {country.borders.map((border, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {border}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Statistics */}
            <motion.div 
              className="bg-gray-50 p-4 rounded-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="font-semibold mb-3">Statistika</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-600">Aholi zichligi</p>
                  <p className="font-bold text-lg">
                    {formatNumber(Math.round(country.population / country.area))} kishi/km²
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">ID</p>
                  <p className="font-bold text-lg">#{country.id}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Qit'a</p>
                  <p className="font-bold text-lg">{country.continent}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Qo'shnilar soni</p>
                  <p className="font-bold text-lg">{country.borders?.length || 0}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};