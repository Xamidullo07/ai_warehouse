import type { Product, AIInsight, WarehouseStats } from '../types/warehouse';

export const runAIAnalysis = (products: Product[]): { insights: AIInsight[]; stats: WarehouseStats } => {
  const insights: AIInsight[] = [];
  let priorityCounter = 1;

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const overstockCount = products.filter(p => p.stock >= p.maxStock * 0.9).length;
  const deadStockCount = products.filter(p => p.dailySales === 0).length;
  
  const healthyProducts = totalProducts - lowStockCount - overstockCount - deadStockCount;
  const efficiencyScore = Math.round((healthyProducts / totalProducts) * 100);
  const turnoverRate = Math.round(products.reduce((sum, p) => sum + p.dailySales, 0) / totalProducts);

  products.forEach(p => {
    if (p.stock <= p.minStock && p.dailySales > 0) {
      const daysUntilOut = Math.floor(p.stock / p.dailySales);
      insights.push({
        id: `crit-${p.id}`,
        type: 'critical',
        title: `Kritik Kamomad: ${p.name}`,
        description: `Mahsulot zaxirasi tugashiga atigi ${daysUntilOut} kun qoldi. Hozirgi zaxira: ${p.stock} dona.`,
        impact: `Kunlik ~$${p.dailySales * p.price} yo'qotish xavfi`,
        actionLabel: 'Zaxirani to\'ldirish',
        priority: priorityCounter++
      });
    }
  });

  products.forEach(p => {
    if (p.stock >= p.maxStock * 0.9 && p.dailySales < (p.maxStock / 30)) {
      const lockedCapital = Math.round((p.stock - (p.dailySales * 30)) * p.price);
      insights.push({
        id: `over-${p.id}`,
        type: 'efficiency',
        title: `Ortiqcha Zaxira: ${p.name}`,
        description: `Mahsulot sotilishidan ko'ra tezrok to'ldirilmoqda. Omborda keraksiz mablag' bog'lanmoqda.`,
        impact: `$${lockedCapital} mablag' bo'g'ib qolgan`,
        actionLabel: 'Aksiyani to\'xtatish',
        priority: priorityCounter++
      });
    }
  });

  if (deadStockCount > 0) {
    const deadValue = products.filter(p => p.dailySales === 0).reduce((sum, p) => sum + (p.price * p.stock), 0);
    insights.push({
      id: 'dead-stock',
      type: 'warning',
      title: 'O\'lik Zaxira Aniqlandi',
      description: `${deadStockCount} ta mahsulol so'nggi 30 kunda umuman sotilmadi. Ularni chegirma bilan sotish yoki olib tashlash kerak.`,
      impact: `$${deadValue} qiymatdagi mablag' harakatsiz`,
      actionLabel: 'Chegirma berish',
      priority: priorityCounter++
    });
  }

  if (efficiencyScore < 70) {
    insights.push({
      id: 'eff-low',
      type: 'opportunity',
      title: 'Omborxona Samaradorligi Past',
      description: `Samaradorlik ko'rsatkichi ${efficiencyScore}%. Omborxona resurslari noto'g'ri taqsimlangan.`,
      impact: 'Foyda oshishiga 15-20% to\'sqilik',
      actionLabel: 'Strategiyani o\'zgartirish',
      priority: priorityCounter++
    });
  }

  return {
    insights,
    stats: {
      totalProducts,
      totalValue,
      lowStockCount,
      overstockCount,
      deadStockCount,
      efficiencyScore,
      turnoverRate
    }
  };
};