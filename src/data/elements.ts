import type { Element, Reaction } from '../types/chemistry';

export const ELEMENTS: Record<string, Element> = {
  H: {
    id: 'H',
    symbol: 'H',
    name: 'Hydrogen',
    nameUz: 'Vodorod',
    color: '#FFFFFF',
    mass: 1,
    radius: 20
  },
  O: {
    id: 'O',
    symbol: 'O',
    name: 'Oxygen',
    nameUz: 'Kislorod',
    color: '#FF4136',
    mass: 16,
    radius: 24
  },
  C: {
    id: 'C',
    symbol: 'C',
    name: 'Carbon',
    nameUz: 'Uglerod',
    color: '#333333',
    mass: 12,
    radius: 22
  },
  Na: {
    id: 'Na',
    symbol: 'Na',
    name: 'Sodium',
    nameUz: 'Natriy',
    color: '#AAAAAA',
    mass: 23,
    radius: 26
  },
  Cl: {
    id: 'Cl',
    symbol: 'Cl',
    name: 'Chlorine',
    nameUz: 'Xlor',
    color: '#85FF00',
    mass: 35.5,
    radius: 25
  }
};

export const REACTIONS: Reaction[] = [
  {
    id: 'water',
    name: 'Water Synthesis',
    nameUz: 'Suv sintezi',
    reactants: [
      { elementId: 'H', count: 2 },
      { elementId: 'O', count: 1 }
    ],
    products: [
      { elementId: 'H2O', count: 1 }
    ],
    equation: '2H₂ + O₂ → 2H₂O',
    color: '#A0D8EF'
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    nameUz: 'Karbonat angidrid',
    reactants: [
      { elementId: 'C', count: 1 },
      { elementId: 'O', count: 2 }
    ],
    products: [
      { elementId: 'CO2', count: 1 }
    ],
    equation: 'C + O₂ → CO₂',
    color: '#E0E0E0'
  },
  {
    id: 'salt',
    name: 'Salt Synthesis',
    nameUz: 'Tuz sintezi',
    reactants: [
      { elementId: 'Na', count: 1 },
      { elementId: 'Cl', count: 1 }
    ],
    products: [
      { elementId: 'NaCl', count: 1 }
    ],
    equation: '2Na + Cl₂ → 2NaCl',
    color: '#F5F5DC'
  }
];

// Helper to get molecule visual properties
export const MOLECULES: Record<string, { color: string; structure: string[] }> = {
  'H2O': { color: '#A0D8EF', structure: ['H', 'O', 'H'] },
  'CO2': { color: '#555555', structure: ['O', 'C', 'O'] },
  'NaCl': { color: '#F5F5DC', structure: ['Na', 'Cl'] }
};