import { Controller } from "react-hook-form";
import { Button } from "../../../../components/button";
import { ColorsDropdownInput } from "../../../../components/colors-dropdown-input";
import { Input } from "../../../../components/input";
import { InputCurrency } from "../../../../components/input-currency";
import { Modal } from "../../../../components/modal";
import { Select } from "../../../../components/select";
import { useNewAccountModalController } from "./use-new-account-modal-controller";

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    errors,
    handleSubmit,
    register,
    control,
    isLoading
  } = useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo inicial</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">
              R$
            </span>

            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
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
            placeholder="Nome da conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente'
                  },
                  {
                    value: 'INVESTMENT',
                    label: 'Investimentos'
                  },
                  {
                    value: 'CASH',
                    label: 'Dinheiro Físico'
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-10" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  )
}
