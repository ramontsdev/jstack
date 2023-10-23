import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactions-service";
import { TransactionFilters } from "../services/transactions-service/get-all";

export function useTransactions(filters: TransactionFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters)
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch
  }
}
