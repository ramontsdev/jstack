import { Controller } from "react-hook-form";
import { Button } from "../../../../components/button";
import { DatePickerInput } from "../../../../components/date-picker-input";
import { Input } from "../../../../components/input";
import { InputCurrency } from "../../../../components/input-currency";
import { Modal } from "../../../../components/modal";
import { Select } from "../../../../components/select";
import { useNewTransactionModalController } from "./use-new-transaction-modal-controller";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">
              R$
            </span>

            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da despesa' : 'Nome da receita'}
            error={errors.name?.message}
            {...register('name')}
          />


          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name
                }))}
              />
            )}
          />


          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  )
}
