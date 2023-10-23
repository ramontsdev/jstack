import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/dropdown-menu";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";

type TransactionTypeDropdownProps = {
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void;
  selectedType?: 'INCOME' | 'EXPENSE'
}

export function TransactionTypeDropdown({ onSelect, selectedType }: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">

          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {selectedType === 'INCOME' && <IncomeIcon />}
          {!selectedType && <TransactionsIcon />}

          <span className="text-sm text-gray-800 tracking-[-0.5] font-medium">
            {selectedType === 'EXPENSE' && 'Despesas'}
            {selectedType === 'INCOME' && 'Receitas'}
            {!selectedType && 'Transações'}
          </span>

          <ChevronDownIcon className="text-sm text-gray-800 tracking-[-0.5] font-medium" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
