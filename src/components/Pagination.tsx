import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getTranslation } from '../utils/formatters';
import type { Language } from '../types';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  language: Language;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, language }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2));

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        {getTranslation(language, 'previous')}
      </Button>
      
      {showPages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {getTranslation(language, 'next')}
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};