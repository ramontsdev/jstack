import { ReactNode, createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../../app/entities/bank-account";

type DashboardContextValue = {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  toggleValuesVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  closeNewTransactionModal(): void;
  isEditAccountModalOpen: boolean;
  openEditAccountModal: (bankAccount: BankAccount) => void
  accountBeingEdited: BankAccount | null;
  closeEditAccountModal: () => void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true)
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null)
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false)
  const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null)

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState);
  }, [])

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, [])

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true);
  }, [])

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false);
  }, [])

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount)
    setIsEditAccountModalOpen(true);
  }, [])

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null)
    setIsEditAccountModalOpen(false);
  }, [])

  return (
    <DashboardContext.Provider value={{
      areValuesVisible,
      toggleValuesVisibility,
      isNewAccountModalOpen,
      openNewAccountModal,
      closeNewAccountModal,
      isNewTransactionModalOpen,
      openNewTransactionModal,
      closeNewTransactionModal,
      newTransactionType,
      isEditAccountModalOpen,
      accountBeingEdited,
      closeEditAccountModal,
      openEditAccountModal
    }}>
      {children}
    </DashboardContext.Provider>
  )
}
