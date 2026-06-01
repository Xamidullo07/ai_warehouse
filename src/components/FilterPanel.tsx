import { useState } from 'react';
import type { SearchParams, Language } from '../types';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { getTranslation } from '../utils/formatters';

interface FilterPanelProps {
  onFilterChange: (filters: SearchParams) => void;
  language: Language;
}

export const FilterPanel = ({ onFilterChange, language }: FilterPanelProps) => {
  const [filters, setFilters] = useState<SearchParams>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{getTranslation(language, 'filter')}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Yopish' : 'Ochish'}
          </Button>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              {getTranslation(language, 'searchPlaceholder')}
            </label>
            <Input
              placeholder={getTranslation(language, 'searchPlaceholder')}
              value={filters.search || ''}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {getTranslation(language, 'populationMin')}
              </label>
              <Input
                type="number"
                placeholder="1000000"
                value={filters.population_min || ''}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  population_min: e.target.value ? Number(e.target.value) : undefined 
                })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                {getTranslation(language, 'populationMax')}
              </label>
              <Input
                type="number"
                placeholder="100000000"
                value={filters.population_max || ''}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  population_max: e.target.value ? Number(e.target.value) : undefined 
                })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                {getTranslation(language, 'areaMin')}
              </label>
              <Input
                type="number"
                placeholder="1000"
                value={filters.area_min || ''}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  area_min: e.target.value ? Number(e.target.value) : undefined 
                })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                {getTranslation(language, 'areaMax')}
              </label>
              <Input
                type="number"
                placeholder="1000000"
                value={filters.area_max || ''}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  area_max: e.target.value ? Number(e.target.value) : undefined 
                })}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              {getTranslation(language, 'language')}
            </label>
            <Select
              value={filters.language || 'all'}
              onValueChange={(value) => setFilters({ 
                ...filters, 
                language: value === 'all' ? undefined : value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tilni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barchasi</SelectItem>
                <SelectItem value="uz">O'zbekcha</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleApply}>
              {getTranslation(language, 'apply')}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              {getTranslation(language, 'reset')}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};