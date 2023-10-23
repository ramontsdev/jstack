import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/format-currency";
import { formatDate } from "../../../../../app/utils/format-date";
import emptyStateImage from '../../../../../assets/empty-state.svg';
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { Spinner } from "../../../../components/spinner";
import { EditTransactionModal } from "../../modals/edit-transaction-modal";
import { FilterModal } from "./filters-modal";
import { SliderNavigation } from "./slider-navigation";
import { SliderOption } from "./slider-option";
import { TransactionTypeDropdown } from "./transaction-type-dropdown";
import { useTransactionsController } from "./use-transaction-controller";

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleOpenEditModal,
    handleCloseEditModal,
    isEditModalOpen,
    transactionBeingEdited
  } = useTransactionsController()

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-200 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner className='w-10 h-10' />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FilterModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={swiper => {
                  handleChangeFilters('month')(swiper.realIndex)
                }}
              >
                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner className='w-10 h-10' />
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={emptyStateImage} alt="Empty state" />
                <p className="text-gray-700">
                  Não encontramos nenhuma transação.
                </p>
              </div>
            )}

            {(hasTransactions && !isLoading) && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>

                        <span className="text-sm">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "tracking-[-0.5px] font-medium",
                        transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800',
                        !areValuesVisible && 'blur-sm'
                      )}
                    >
                      {transaction.type === 'EXPENSE' ? '- ' : '+ '}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
