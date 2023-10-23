import 'swiper/css';

import { PlusIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/format-currency';
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { Spinner } from '../../../../components/spinner';
import { AccountCard } from "./account-card";
import { SliderNavigation } from './slider-navigation';
import { useAccountsController } from './use-accounts-controller';

export function Accounts() {
  const {
    sliderState, setSliderState, windowWidth, areValuesVisible, toggleValuesVisibility, isLoading, accounts, openNewAccountModal, currentBalance,
  } = useAccountsController()

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">

      {isLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner className='text-teal-950/60 fill-white w-10 h-10' />
        </div>
      )}


      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-white block">Saldo total</span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-[-1px] text-white",
                  !areValuesVisible && 'blur-md'
                )}
              >
                {formatCurrency(currentBalance)}

              </strong>

              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div slot='container-start' className="mb-4">
                  <strong className="text-white tracking-[-1px] text-lg font-bold">
                    Minhas contas
                  </strong>
                </div>

                <button
                  className='mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center
                justify-center gap-4 text-white'
                  onClick={openNewAccountModal}
                >
                  <div className='w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center
                justify-center'>
                    <PlusIcon className='w-6 h-6' />
                  </div>
                  <span className='tracking-[-0.5px] font-medium block w-32 text-center'>
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 500 ? 2.2 : 1.2}
                  onSlideChange={swiper => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd
                    })
                  }}
                >
                  <div slot='container-start' className="flex items-center justify-between mb-4">
                    <strong className="text-white tracking-[-1px] text-lg font-bold">
                      Minhas contas
                    </strong>

                    <SliderNavigation isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd} />
                  </div>

                  {accounts.map(account => (
                    <SwiperSlide key={account.id}>
                      <AccountCard
                        data={account}
                      />
                    </SwiperSlide>
                  ))}

                </Swiper>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  )
}
