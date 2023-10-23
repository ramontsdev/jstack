import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { bankAccountsService } from "../../../../../app/services/bank-accounts-service";
import { currencyStringToNumber } from "../../../../../app/utils/currency-string-to-number";
import { useDashboard } from "../../components/dashboard-context/useDashboard";

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().nonempty('Cor é obrigatório'),
})

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: '',
      initialBalance: '0',
      name: '',
      type: 'CHECKING'
    }
  });

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(bankAccountsService.create);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance)
      })

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Conta cadastrada com sucesso!');
      closeNewAccountModal();
      reset();
    } catch {
      toast.error('Erro ao cadastrar a conta!')
    }
  })

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading
  }
}
