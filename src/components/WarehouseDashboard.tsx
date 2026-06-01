import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Product, AIInsight, WarehouseStats } from '../types/warehouse';
import { runAIAnalysis } from '../utils/aiEngine';
import { AIInsightCard } from './AIInsightCard';
import { AddProductModal } from './AddProductModal';
import { useAuth } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, DollarSign, AlertOctagon, Activity, Brain, RefreshCw, Plus, Warehouse, ArrowRight, LogOut, CheckCircle } from 'lucide-react';

const EmptyState = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-blue-50 p-8 rounded-full mb-6">
      <Warehouse className="w-24 h-24 text-blue-600" />
    </motion.div>
    <h2 className="text-3xl font-bold text-gray-900 mb-2">Omborxona hali bo'sh</h2>
    <p className="text-gray-500 max-w-md mb-8">Siz hali hech qanday mahsulot qo'shmagansiz. AI tizim ishlashi uchun boshlang.</p>
    <Button onClick={onOpenModal} className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto">
      <Plus className="mr-2 h-5 w-5" /> Birinchi mahsulotni qo'shish <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  </div>
);

export const WarehouseDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [stats, setStats] = useState<WarehouseStats | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    if (products.length > 0) performAnalysis();
    else { setStats(null); setInsights([]); }
  }, [products]);

  const performAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = runAIAnalysis(products);
      setInsights(result.insights);
      setStats(result.stats);
      setIsAnalyzing(false);
    }, 800);
  };

  const handleAddProduct = (newProduct: Product) => setProducts([...products, newProduct]);
  const handleDeleteProduct = (id: string) => setProducts(products.filter(p => p.id !== id));
  const handleAction = (insight: AIInsight) => alert(`Amal bajarildi: ${insight.actionLabel} -> ${insight.title}`);

  const stockData = products.map(p => ({ name: p.name.split(' ')[0], stock: p.stock, min: p.minStock, max: p.maxStock }));
  const categories = Array.from(new Set(products.map(p => p.category)));
  const categoryData = categories.map(cat => ({ name: cat, value: products.filter(p => p.category === cat).length }));
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  if (products.length === 0) {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Brain className="text-blue-600" /> AI Omborxona</h1>
            <p className="text-sm text-gray-500">Xush kelibsiz, {user?.name}!</p>
          </div>
          <Button variant="outline" onClick={logout} className="text-red-600 border-red-200 hover:bg-red-50"><LogOut className="mr-2 h-4 w-4" /> Chiqish</Button>
        </div>
        <EmptyState onOpenModal={() => setIsAddModalOpen(true)} />
        <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleAddProduct} />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2"><Brain className="text-blue-600" /> Mening Omborxonam</h1>
          <p className="text-gray-500 mt-1">Foydalanuvchi: <span className="font-medium text-blue-600">{user?.name}</span> | Mahsulotlar: {products.length} ta</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={performAnalysis} disabled={isAnalyzing} variant="outline">
            {isAnalyzing ? <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Tahlil...</> : <><Activity className="mr-2 h-4 w-4" /> Yangilash</>}
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" /> Qo'shish</Button>
          <Button variant="outline" onClick={logout} className="text-red-600 border-red-200 hover:bg-red-50"><LogOut className="mr-2 h-4 w-4" /> Chiqish</Button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-l-4 border-l-blue-500"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Jami Mahsulotlar</p><p className="text-2xl font-bold">{stats.totalProducts}</p></div><Package className="h-8 w-8 text-blue-500 opacity-20" /></div></CardContent></Card>
          <Card className="bg-white border-l-4 border-l-green-500"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Ombor Qiymati</p><p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p></div><DollarSign className="h-8 w-8 text-green-500 opacity-20" /></div></CardContent></Card>
          <Card className="bg-white border-l-4 border-l-red-500"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Kritik Kamomad</p><p className="text-2xl font-bold text-red-600">{stats.lowStockCount}</p></div><AlertOctagon className="h-8 w-8 text-red-500 opacity-20" /></div></CardContent></Card>
          <Card className="bg-white border-l-4 border-l-purple-500"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Samaradorlik</p><p className="text-2xl font-bold">{stats.efficiencyScore}%</p></div><Activity className="h-8 w-8 text-purple-500 opacity-20" /></div></CardContent></Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">Zaxira Holati</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stockData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="stock" fill="#3b82f6" name="Hozirgi" />
                      <Bar dataKey="min" fill="#ef4444" name="Min" />
                      <Bar dataKey="max" fill="#10b981" name="Max" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Kategoriyalar</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, percent = 0 }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                        {categoryData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Mahsulotlar Ro'yxati</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th className="px-4 py-3">Mahsulot</th>
                      <th className="px-4 py-3">Kategoriya</th>
                      <th className="px-4 py-3">Zaxira</th>
                      <th className="px-4 py-3">Narx</th>
                      <th className="px-4 py-3">Holat</th>
                      <th className="px-4 py-3">Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                        <td className="px-4 py-3 text-gray-500">{product.category}</td>
                        <td className="px-4 py-3">
                          <span className={product.stock <= product.minStock ? 'text-red-600 font-bold' : ''}>{product.stock}</span>
                          <span className="text-gray-400 text-xs ml-1">/ {product.maxStock}</span>
                        </td>
                        <td className="px-4 py-3">${product.price}</td>
                        <td className="px-4 py-3">
                          <Badge variant={product.status === 'critical' ? 'secondary' : 'default'} className={product.status === 'healthy' ? 'bg-green-100 text-green-800 hover:bg-green-200' : product.status === 'overstock' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : ''}>
                            {product.status === 'critical' ? 'Kritik' : product.status === 'overstock' ? 'Ortiqcha' : 'Normal'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteProduct(product.id)}>O'chirish</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6 h-fit">
            <CardHeader className="bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2"><Brain className="animate-pulse" /> AI Tavsiyalar</CardTitle>
            </CardHeader>
            <CardContent className="p-4 max-h-150 overflow-y-auto">
              {insights.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>Barcha jarayonlar normal!</p>
                </div>
              ) : (
                <div className="space-y-2">{insights.map((insight) => <AIInsightCard key={insight.id} insight={insight} onAction={handleAction} />)}</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleAddProduct} />
    </div>
  );
};