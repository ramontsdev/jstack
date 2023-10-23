import { useEffect, useState } from "react";
import { Transaction } from "../../../../../app/entities/transaction";
import { useTransactions } from "../../../../../app/hooks/use-transactions";
import { TransactionFilters } from "../../../../../app/services/transactions-service/get-all";
import { useDashboard } from "../dashboard-context/useDashboard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard()

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);

  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

  const { transactions, isLoading, isInitialLoading, refetchTransactions } = useTransactions(filters)

  useEffect(() => {
    refetchTransactions()
  }, [filters, refetchTransactions])


  function handleChangeFilters<TFilter extends keyof TransactionFilters>(filter: TFilter) {
    return (value: TransactionFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }))
    }
  }

  function handleApplyFilters({ bankAccountId, year }: { bankAccountId?: string; year: number }) {
    handleChangeFilters('bankAccountId')(bankAccountId)
    handleChangeFilters('year')(year)
    setIsFiltersModalOpen(false)
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true)
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false)
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true)
    setTransactionBeingEdited(transaction)
  }
  function handleCloseEditModal() {
    setIsEditModalOpen(false)
    setTransactionBeingEdited(null)
  }

  return {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isLoading,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenEditModal,
    handleCloseEditModal
  }
}
