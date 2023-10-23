import { iconsMap } from "./iconsMap";

interface CategoryIconProps {
  type: 'income' | 'expense';
  category?: string //keyof typeof iconsMap.expense;
}

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const Icon = iconsMap[type][
    category as keyof (typeof iconsMap.expense | typeof iconsMap.income) ?? 'default'
  ] ?? iconsMap[type].default;

  return <Icon />
}
