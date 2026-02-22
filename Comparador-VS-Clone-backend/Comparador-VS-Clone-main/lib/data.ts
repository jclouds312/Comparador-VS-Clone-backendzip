export interface ProductSpec {
  label: string;
  value: string;
  numericValue?: number;
  unit?: string;
  higherIsBetter?: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: "SOFTGAN" | "Prometálicos";
  category: string;
  categoryKey: string;
  image: string;
  warranty: string;
  price: string;
  specs: ProductSpec[];
}

export interface Category {
  key: string;
  name: string;
  description: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  { key: "basculas_ganaderas", name: "Básculas Ganaderas", description: "Barras portátiles, plataformas y kits ganaderos", count: 10 },
  { key: "basculas_camioneras", name: "Básculas Camioneras", description: "Tipo puente, modulares, pesaje por ejes", count: 4 },
  { key: "bretes_jaulas", name: "Bretes y Jaulas", description: "Bretes ganaderos, jaulas porcinas", count: 4 },
  { key: "clasificadora_huevos", name: "Clasificadora de Huevos", description: "Máquinas clasificadoras avícolas", count: 2 },
  { key: "mesa_cirugia", name: "Mesa de Cirugía", description: "Mesas para procedimientos veterinarios", count: 2 },
  { key: "equipos_ordeno", name: "Equipos de Ordeño", description: "Sistemas mecánico y automatizado", count: 3 },
  { key: "esterilizador", name: "Equipo Esterilizador", description: "Equipos para la industria láctea", count: 2 },
  { key: "descremadores", name: "Descremadores", description: "Producción artesanal e industrial", count: 2 },
  { key: "maquinaria_alimento", name: "Maquinaria para Alimento", description: "Picadoras, mezcladoras y molinos", count: 3 },
  { key: "cuartos_frios", name: "Cuartos Fríos", description: "Cuartos fríos y plantas industriales", count: 2 },
];

export const ALL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Kit Ganadero Plataforma + Báscula",
    brand: "SOFTGAN",
    category: "Básculas Ganaderas",
    categoryKey: "basculas_ganaderas",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
    warranty: "36 meses",
    price: "Consultar",
    specs: [
      { label: "Capacidad", value: "2,000 kg", numericValue: 2000, unit: "kg", higherIsBetter: true },
      { label: "Precisión", value: "0.5 kg", numericValue: 0.5, unit: "kg", higherIsBetter: false },
      { label: "Plataforma", value: "200x80 cm", numericValue: 16000, unit: "cm²", higherIsBetter: true },
      { label: "Material", value: "Acero Inoxidable" },
      { label: "Display", value: "Indicador LED" },
      { label: "Conectividad", value: "RS232 / Bluetooth" },
      { label: "Garantía", value: "36 meses", numericValue: 36, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p2",
    name: "Báscula de Barras Portátil",
    brand: "SOFTGAN",
    category: "Básculas Ganaderas",
    categoryKey: "basculas_ganaderas",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
    warranty: "36 meses",
    price: "Consultar",
    specs: [
      { label: "Capacidad", value: "3,000 kg", numericValue: 3000, unit: "kg", higherIsBetter: true },
      { label: "Precisión", value: "1 kg", numericValue: 1, unit: "kg", higherIsBetter: false },
      { label: "Plataforma", value: "Barras 120 cm", numericValue: 12000, unit: "cm²", higherIsBetter: true },
      { label: "Material", value: "Acero al Carbón" },
      { label: "Display", value: "Indicador LED" },
      { label: "Conectividad", value: "RS232" },
      { label: "Garantía", value: "36 meses", numericValue: 36, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p3",
    name: "Plataforma de Pesaje 2x2m",
    brand: "SOFTGAN",
    category: "Básculas Ganaderas",
    categoryKey: "basculas_ganaderas",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
    warranty: "36 meses",
    price: "Consultar",
    specs: [
      { label: "Capacidad", value: "5,000 kg", numericValue: 5000, unit: "kg", higherIsBetter: true },
      { label: "Precisión", value: "1 kg", numericValue: 1, unit: "kg", higherIsBetter: false },
      { label: "Plataforma", value: "200x200 cm", numericValue: 40000, unit: "cm²", higherIsBetter: true },
      { label: "Material", value: "Acero Inoxidable" },
      { label: "Display", value: "Indicador Industrial LED" },
      { label: "Conectividad", value: "RS232 / RS485" },
      { label: "Garantía", value: "36 meses", numericValue: 36, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p4",
    name: "Báscula Camionera Tipo Puente",
    brand: "SOFTGAN",
    category: "Básculas Camioneras",
    categoryKey: "basculas_camioneras",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop",
    warranty: "36 meses",
    price: "Consultar",
    specs: [
      { label: "Capacidad", value: "80,000 kg", numericValue: 80000, unit: "kg", higherIsBetter: true },
      { label: "Precisión", value: "20 kg", numericValue: 20, unit: "kg", higherIsBetter: false },
      { label: "Plataforma", value: "18x3 m", numericValue: 540000, unit: "cm²", higherIsBetter: true },
      { label: "Material", value: "Acero Estructural" },
      { label: "Display", value: "Software de Pesaje" },
      { label: "Conectividad", value: "Ethernet / WiFi" },
      { label: "Garantía", value: "36 meses", numericValue: 36, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p5",
    name: "Báscula Modular para Camiones",
    brand: "SOFTGAN",
    category: "Básculas Camioneras",
    categoryKey: "basculas_camioneras",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop",
    warranty: "36 meses",
    price: "Consultar",
    specs: [
      { label: "Capacidad", value: "60,000 kg", numericValue: 60000, unit: "kg", higherIsBetter: true },
      { label: "Precisión", value: "10 kg", numericValue: 10, unit: "kg", higherIsBetter: false },
      { label: "Plataforma", value: "12x3 m", numericValue: 360000, unit: "cm²", higherIsBetter: true },
      { label: "Material", value: "Acero Estructural" },
      { label: "Display", value: "Software de Pesaje" },
      { label: "Conectividad", value: "Ethernet" },
      { label: "Garantía", value: "36 meses", numericValue: 36, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p6",
    name: "Brete Ganadero Acero Inoxidable",
    brand: "SOFTGAN",
    category: "Bretes y Jaulas",
    categoryKey: "bretes_jaulas",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
    warranty: "36 meses",
    price: "Consultar",
    specs: [
      { label: "Capacidad", value: "1,500 kg", numericValue: 1500, unit: "kg", higherIsBetter: true },
      { label: "Material", value: "Acero Inoxidable" },
      { label: "Garantía", value: "36 meses", numericValue: 36, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p7",
    name: "Jaula Porcina Metálica",
    brand: "SOFTGAN",
    category: "Bretes y Jaulas",
    categoryKey: "bretes_jaulas",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
    warranty: "36 meses",
    price: "Consultar",
    specs: [
      { label: "Capacidad", value: "500 kg", numericValue: 500, unit: "kg", higherIsBetter: true },
      { label: "Material", value: "Acero Galvanizado" },
      { label: "Garantía", value: "36 meses", numericValue: 36, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p8",
    name: "Clasificadora de Huevos Automática",
    brand: "SOFTGAN",
    category: "Clasificadora de Huevos",
    categoryKey: "clasificadora_huevos",
    image: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=400&h=300&fit=crop",
    warranty: "24 meses",
    price: "Consultar",
    specs: [
      { label: "Velocidad", value: "6,000 huevos/h" },
      { label: "Material", value: "Acero Inoxidable" },
      { label: "Garantía", value: "24 meses", numericValue: 24, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p9",
    name: "Mesa de Cirugía Veterinaria",
    brand: "SOFTGAN",
    category: "Mesa de Cirugía",
    categoryKey: "mesa_cirugia",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=300&fit=crop",
    warranty: "24 meses",
    price: "Consultar",
    specs: [
      { label: "Capacidad", value: "800 kg", numericValue: 800, unit: "kg", higherIsBetter: true },
      { label: "Material", value: "Acero Inoxidable" },
      { label: "Garantía", value: "24 meses", numericValue: 24, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p10",
    name: "Ordeño Mecánico Portátil",
    brand: "SOFTGAN",
    category: "Equipos de Ordeño",
    categoryKey: "equipos_ordeno",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
    warranty: "36 meses",
    price: "Consultar",
    specs: [
      { label: "Tipo", value: "Portátil" },
      { label: "Material", value: "Acero Inoxidable" },
      { label: "Garantía", value: "36 meses", numericValue: 36, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p11",
    name: "Sistema de Ordeño Automatizado",
    brand: "SOFTGAN",
    category: "Equipos de Ordeño",
    categoryKey: "equipos_ordeno",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
    warranty: "36 meses",
    price: "Consultar",
    specs: [
      { label: "Tipo", value: "Automatizado" },
      { label: "Material", value: "Acero Inoxidable" },
      { label: "Garantía", value: "36 meses", numericValue: 36, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p12",
    name: "Esterilizador de Leche Industrial",
    brand: "SOFTGAN",
    category: "Esterilizador",
    categoryKey: "esterilizador",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
    warranty: "24 meses",
    price: "Consultar",
    specs: [
      { label: "Tipo", value: "Industrial" },
      { label: "Material", value: "Acero Inoxidable" },
      { label: "Garantía", value: "24 meses", numericValue: 24, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p13",
    name: "Descremadora de Leche Artesanal",
    brand: "SOFTGAN",
    category: "Descremadores",
    categoryKey: "descremadores",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
    warranty: "24 meses",
    price: "Consultar",
    specs: [
      { label: "Tipo", value: "Artesanal" },
      { label: "Material", value: "Acero Inoxidable" },
      { label: "Garantía", value: "24 meses", numericValue: 24, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p14",
    name: "Picadora de Forraje",
    brand: "SOFTGAN",
    category: "Maquinaria para Alimento",
    categoryKey: "maquinaria_alimento",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
    warranty: "24 meses",
    price: "Consultar",
    specs: [
      { label: "Tipo", value: "Picadora" },
      { label: "Material", value: "Acero" },
      { label: "Garantía", value: "24 meses", numericValue: 24, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p15",
    name: "Mezcladora de Alimento",
    brand: "SOFTGAN",
    category: "Maquinaria para Alimento",
    categoryKey: "maquinaria_alimento",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
    warranty: "24 meses",
    price: "Consultar",
    specs: [
      { label: "Tipo", value: "Mezcladora" },
      { label: "Material", value: "Acero" },
      { label: "Garantía", value: "24 meses", numericValue: 24, unit: "meses", higherIsBetter: true },
    ],
  },
  {
    id: "p16",
    name: "Cuarto Frío Industrial 10m³",
    brand: "SOFTGAN",
    category: "Cuartos Fríos",
    categoryKey: "cuartos_frios",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=300&fit=crop",
    warranty: "24 meses",
    price: "Consultar",
    specs: [
      { label: "Volumen", value: "10 m³" },
      { label: "Temperatura", value: "-18°C a 4°C" },
      { label: "Material", value: "Panel Aislado" },
      { label: "Garantía", value: "24 meses", numericValue: 24, unit: "meses", higherIsBetter: true },
    ],
  },
];

export const FEATURED_PRODUCTS = ALL_PRODUCTS.filter((p) =>
  ["p1", "p4", "p6", "p10", "p16"].includes(p.id)
);

export const SERVICES = [
  "Venta",
  "Instalación",
  "Mantenimiento",
  "Calibración",
  "Asesoría",
  "Obra Civil",
];

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  initial: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carlos M.",
    role: "Ganadero - Antioquia",
    text: "Las básculas de SOFTGAN son excelentes. Llevamos 3 años sin ninguna falla. El servicio técnico es rápido y eficiente.",
    initial: "C",
  },
  {
    name: "María L.",
    role: "Finca La Esperanza",
    text: "Instalaron todo el sistema de ordeño y la báscula. Muy profesionales. La garantía de 36 meses nos dio mucha tranquilidad.",
    initial: "M",
  },
  {
    name: "Jorge R.",
    role: "Planta de Lácteos - Boyacá",
    text: "Los cuartos fríos y el esterilizador funcionan perfecto. El equipo de Carolina nos asesoró muy bien en todo el proceso.",
    initial: "J",
  },
];

export const WHY_CHOOSE = [
  "Soluciones integrales para el campo",
  "Equipos de alta calidad y durabilidad",
  "Garantía de 36 meses por defectos de fabricación",
  "Disponibilidad de repuestos (Life Warranty)",
  "Despacho a todo Colombia",
  "Asesoría técnica personalizada",
  "Instalación y montaje profesional",
  "Soporte post-venta continuo",
];

export interface ComparisonResult {
  specLabel: string;
  valueA: string;
  valueB: string;
  winner: "A" | "B" | "tie" | "none";
}

export function compareProducts(productA: Product, productB: Product): ComparisonResult[] {
  const results: ComparisonResult[] = [];
  for (const specA of productA.specs) {
    const specB = productB.specs.find((s) => s.label === specA.label);
    if (!specB) continue;
    let winner: "A" | "B" | "tie" | "none" = "none";
    if (specA.numericValue !== undefined && specB.numericValue !== undefined) {
      if (specA.higherIsBetter) {
        if (specA.numericValue > specB.numericValue) winner = "A";
        else if (specB.numericValue > specA.numericValue) winner = "B";
        else winner = "tie";
      } else {
        if (specA.numericValue < specB.numericValue) winner = "A";
        else if (specB.numericValue < specA.numericValue) winner = "B";
        else winner = "tie";
      }
    }
    results.push({ specLabel: specA.label, valueA: specA.value, valueB: specB.value, winner });
  }
  return results;
}

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export interface SavedComparison {
  id: string;
  productAId: string;
  productBId: string;
  date: string;
}
