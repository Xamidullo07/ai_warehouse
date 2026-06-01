import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { WarehouseDashboard } from './components/WarehouseDashboard';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('wh_ai_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('wh_ai_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const userData = { id: found.id, name: found.name, email: found.email };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('wh_ai_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('wh_ai_users') || '[]');
    if (users.some((u: any) => u.email === email)) return false;
    
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem('wh_ai_users', JSON.stringify(users));
    
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('wh_ai_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('wh_ai_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <WarehouseDashboard /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}