export const TAX_YEARS = [
  { value: "TAX_TABLE_2024", label: "FY 2023-24" },
  { value: "TAX_TABLE_2025", label: "FY 2024-25" },
  { value: "TAX_TABLE_2026", label: "FY 2025-26" },
]

export const TAX_TABLES = {
  TAX_TABLE_2024: [
  { start: 0, end: 18_200, base: 0, rate: 0 },
  { start: 18_201, end: 45_000, base: 0, rate: 0.19 },
  { start: 45_001, end: 120_000, base: 5092, rate: 0.325 },
  { start: 120_001, end: 180_000, base: 29_467, rate: 0.37 },
  { start: 180_001, end: Infinity, base: 51_667, rate: 0.45 },
],
  TAX_TABLE_2025: [
  { start: 0, end: 18_200, base: 0, rate: 0 },
  { start: 18_201, end: 45_000, base: 0, rate: 0.16 },
  { start: 45_001, end: 135_000, base: 4288, rate: 0.3 },
  { start: 135_001, end: 190_000, base: 31_288, rate: 0.37 },
  { start: 190_001, end: Infinity, base: 51_638, rate: 0.45 },
],
  TAX_TABLE_2026: [
  { start: 0, end: 18_200, base: 0, rate: 0 },
  { start: 18_201, end: 45_000, base: 0, rate: 0.16 },
  { start: 45_001, end: 135_000, base: 4288, rate: 0.3 },
  { start: 135_001, end: 190_000, base: 31_288, rate: 0.37 },
  { start: 190_001, end: Infinity, base: 51_667, rate: 0.45 },
]
}