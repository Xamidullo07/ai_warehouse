export interface Element {
  id: string;
  symbol: string;
  name: string;
  nameUz: string;
  color: string;
  mass: number;
  radius: number;
}

export interface Atom {
  id: string;
  element: Element;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface Reaction {
  id: string;
  name: string;
  nameUz: string;
  reactants: { elementId: string; count: number }[];
  products: { elementId: string; count: number }[];
  equation: string;
  color?: string; // Reaction result color (e.g., for solution)
}

export interface Molecule {
  id: string;
  atoms: Atom[];
  formula: string;
}