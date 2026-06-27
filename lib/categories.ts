import {
  Home,
  Car,
  Plane,
  Laptop,
  GraduationCap,
  Shield,
  Star,
  type LucideIcon,
} from 'lucide-react';
import type { CategoryType } from '@/types';

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  Icon: LucideIcon;
  color: string;
  bg: string;
  ring: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'vivienda',    label: 'Vivienda',    Icon: Home,           color: 'text-blue-600',   bg: 'bg-blue-100',   ring: 'ring-blue-400' },
  { id: 'vehiculo',    label: 'Vehículo',    Icon: Car,            color: 'text-slate-600',  bg: 'bg-slate-100',  ring: 'ring-slate-400' },
  { id: 'viaje',       label: 'Viaje',       Icon: Plane,          color: 'text-sky-600',    bg: 'bg-sky-100',    ring: 'ring-sky-400' },
  { id: 'tecnologia',  label: 'Tecnología',  Icon: Laptop,         color: 'text-violet-600', bg: 'bg-violet-100', ring: 'ring-violet-400' },
  { id: 'educacion',   label: 'Educación',   Icon: GraduationCap,  color: 'text-amber-600',  bg: 'bg-amber-100',  ring: 'ring-amber-400' },
  { id: 'emergencia',  label: 'Emergencia',  Icon: Shield,         color: 'text-red-600',    bg: 'bg-red-100',    ring: 'ring-red-400' },
  { id: 'otro',        label: 'Otro',        Icon: Star,           color: 'text-teal-600',   bg: 'bg-teal-100',   ring: 'ring-teal-400' },
];

export function getCategoryInfo(id: CategoryType): CategoryInfo {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
}
