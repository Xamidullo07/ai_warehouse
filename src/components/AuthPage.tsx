import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Lock, Mail, User, Warehouse } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../App';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let success = false;
      if (isLogin) {
        success = await login(formData.email, formData.password);
        if (!success) setError("Email yoki parol noto'g'ri!");
      } else {
        if (!formData.name) {
          setError("Iltimos, ismingizni kiriting.");
          setIsLoading(false);
          return;
        }
        success = await register(formData.name, formData.email, formData.password);
        if (!success) setError("Bu email allaqachon ro'yxatdan o'tgan!");
      }
    } catch (err) {
      setError("Xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-blue-600 rounded-full filter blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-purple-600 rounded-full filter blur-[120px] opacity-30 animate-pulse"></div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md z-10">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white rounded-2xl">
          <CardHeader className="text-center space-y-4 pb-8 pt-8">
            <div className="mx-auto bg-linear-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-fit mb-2 shadow-lg shadow-blue-500/30">
              <Warehouse className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {isLogin ? 'Tizimga Kirish' : 'Hisob Yaratish'}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {isLogin ? 'AI Omborxona boshqaruv tizimiga xush kelibsiz' : 'Yangi hisob ochish orqali boshlang'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-8 px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-blue-200 text-xs font-medium uppercase tracking-wider">Ism va Familiya</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-4 w-4 text-blue-300/50" />
                    <Input id="name" type="text" placeholder="John Doe" className="pl-11 bg-white/5 border-white/10 focus:border-blue-500 focus:ring-blue-500/50 text-white placeholder:text-blue-300/40 h-12 rounded-xl" value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })} required={!isLogin} />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-200 text-xs font-medium uppercase tracking-wider">Elektron pochta</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-4 w-4 text-blue-300/50" />
                  <Input id="email" type="email" placeholder="siz@example.com" className="pl-11 bg-white/5 border-white/10 focus:border-blue-500 focus:ring-blue-500/50 text-white placeholder:text-blue-300/40 h-12 rounded-xl" value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-200 text-xs font-medium uppercase tracking-wider">Parol</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-4 w-4 text-blue-300/50" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-11 bg-white/5 border-white/10 focus:border-blue-500 focus:ring-blue-500/50 text-white placeholder:text-blue-300/40 h-12 rounded-xl" value={formData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })} required />
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 text-sm text-red-200 bg-red-500/20 rounded-xl border border-red-500/30 text-center backdrop-blur-sm">
                  {error}
                </motion.div>
              )}

              <Button type="submit" className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 text-base font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-blue-600/50 hover:scale-[1.02]" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Tekshirilmoqda...
                  </span>
                ) : isLogin ? (
                  <span className="flex items-center gap-2"><LogIn className="h-5 w-5" /> Kirish</span>
                ) : (
                  <span className="flex items-center gap-2"><UserPlus className="h-5 w-5" /> Ro'yxatdan o'tish</span>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm">
              <span className="text-blue-200/70">{isLogin ? "Hisobingiz yo'qmi?" : "Allaqachon hisobingiz bormi?"}</span>
              <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }} className="ml-1.5 text-white font-semibold hover:text-blue-300 transition-colors duration-200 border-b border-white/30 hover:border-blue-300">
                {isLogin ? "Ro'yxatdan o'ting" : "Tizimga kiring"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};