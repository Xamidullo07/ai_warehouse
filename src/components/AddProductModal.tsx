import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { Product } from '../types/warehouse';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export const AddProductModal = ({ isOpen, onClose, onSave }: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', stock: '', minStock: '', maxStock: '', dailySales: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      minStock: parseInt(formData.minStock),
      maxStock: parseInt(formData.maxStock),
      dailySales: parseInt(formData.dailySales),
      lastRestocked: new Date().toISOString().split('T')[0],
      status: parseInt(formData.stock) <= parseInt(formData.minStock) ? 'critical' : 
              parseInt(formData.stock) >= parseInt(formData.maxStock) ? 'overstock' : 'healthy'
    };
    onSave(newProduct);
    setFormData({ name: '', category: '', price: '', stock: '', minStock: '', maxStock: '', dailySales: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-900/20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Yangi Mahsulot</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-700 p-1.5 rounded-lg transition-colors"><X className="h-5 w-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="text-slate-300 text-xs uppercase tracking-wider">Mahsulot nomi</Label>
            <Input required value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})} placeholder="Masalan: MacBook Pro" className="mt-2 bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white placeholder:text-slate-500 h-12 rounded-xl" />
          </div>
          <div>
            <Label className="text-slate-300 text-xs uppercase tracking-wider">Kategoriya</Label>
            <Input required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} placeholder="Masalan: Elektronika" className="mt-2 bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white placeholder:text-slate-500 h-12 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-slate-300 text-xs uppercase tracking-wider">Narx ($)</Label><Input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="mt-2 bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white h-12 rounded-xl" /></div>
            <div><Label className="text-slate-300 text-xs uppercase tracking-wider">Hozirgi zaxira</Label><Input type="number" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="mt-2 bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white h-12 rounded-xl" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-slate-300 text-xs uppercase tracking-wider">Minimal zaxira</Label><Input type="number" required value={formData.minStock} onChange={(e) => setFormData({...formData, minStock: e.target.value})} className="mt-2 bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white h-12 rounded-xl" /></div>
            <div><Label className="text-slate-300 text-xs uppercase tracking-wider">Maksimal zaxira</Label><Input type="number" required value={formData.maxStock} onChange={(e) => setFormData({...formData, maxStock: e.target.value})} className="mt-2 bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white h-12 rounded-xl" /></div>
          </div>
          <div>
            <Label className="text-slate-300 text-xs uppercase tracking-wider">Kunlik sotuv (dona)</Label>
            <Input type="number" required value={formData.dailySales} onChange={(e) => setFormData({...formData, dailySales: e.target.value})} className="mt-2 bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white h-12 rounded-xl" />
          </div>
          <Button type="submit" className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 rounded-xl shadow-lg shadow-blue-600/30 mt-2"><Plus className="mr-2 h-5 w-5" /> Qo'shish</Button>
        </form>
      </motion.div>
    </div>
  );
};