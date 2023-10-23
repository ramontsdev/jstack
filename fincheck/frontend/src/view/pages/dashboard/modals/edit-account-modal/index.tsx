import { Controller } from "react-hook-form";
import { Button } from "../../../../components/button";
import { ColorsDropdownInput } from "../../../../components/colors-dropdown-input";
import { ConfirmDeleteModal } from "../../../../components/confirm-delete-modal";
import { TrashIcon } from "../../../../components/icons/trash-icon";
import { Input } from "../../../../components/input";
import { InputCurrency } from "../../../../components/input-currency";
import { Modal } from "../../../../components/modal";
import { Select } from "../../../../components/select";
import { useEditAccountModalController } from "./use-edit-account-modal-controller";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    errors,
    handleSubmit,
    register,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return <ConfirmDeleteModal
      isLoading={isLoadingDelete}
      onClose={handleCloseDeleteModal}
      onConfirm={handleDeleteAccount}
      title="Tem certeza que deseja excluir esta conta?"
      description="Ao excluir a conta, também serão excluídos todos os registros de receitas e despesas relacionados."
    />
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      )}
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
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
