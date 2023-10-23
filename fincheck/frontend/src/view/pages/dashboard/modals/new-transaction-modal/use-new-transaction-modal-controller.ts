import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"
import { useBankAccounts } from "../../../../../app/hooks/use-bank-accounts"
import { useCategories } from "../../../../../app/hooks/use-categories"
import { transactionsService } from "../../../../../app/services/transactions-service"
import { currencyStringToNumber } from "../../../../../app/utils/currency-string-to-number"
import { useDashboard } from "../../components/dashboard-context/useDashboard"

const schema = z.object({
  value: z.union([
    z.string().nonempty('Informe o valor'),
    z.number()
  ]),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a categoria'),
  date: z.date()
})

type FormData = z.infer<typeof schema>

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType
  } = useDashboard()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()
  const { isLoading, mutateAsync } = useMutation(transactionsService.create)
  const queryClient = useQueryClient()

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString()
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!'
      );
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Error ao cadastrar despesa.'
          : 'Error ao cadastrar receita.'
      );
    }
  })


  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType)
  }, [categoriesList, newTransactionType])

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading
  }
}
