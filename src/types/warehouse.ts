export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  maxStock: number;
  status: 'healthy' | 'critical' | 'overstock' | 'dead';
  lastRestocked: string;
  dailySales: number;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'opportunity' | 'efficiency' | 'critical';
  title: string;
  description: string;
  impact: string;
  actionLabel: string;
  priority: number;
}

export interface WarehouseStats {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
  efficiencyScore: number;
  deadStockCount: number;
  overstockCount: number;
  turnoverRate: number;
}