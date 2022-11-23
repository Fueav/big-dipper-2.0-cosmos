import { useCallback, useEffect, useState } from 'react';
import numeral from 'numeral';
import * as R from 'ramda';
import axios from 'axios';
import { PRICE_HISTORY } from '@/api';
import type { PriceState } from '@/screens/home/components/price/types';

export const usePrice = () => {
  const [state, setState] = useState<PriceState>({
    items: [],
  });

  const handleSetState = useCallback((stateChange: Partial<PriceState>) => {
    setState((prevState) => {
      const newState = { ...prevState, ...stateChange };
      return R.equals(prevState, newState) ? prevState : newState;
    });
  }, []);

  useEffect(() => {
    const getPrices = async () => {
      try {
        const { data: prices } = await axios.get(PRICE_HISTORY);

        handleSetState({
          items: prices.slice(-7),
        });
      } catch (error: any) {
        console.error(error.message);
      }
    };

    getPrices();
  }, [handleSetState]);

  const tickPriceFormatter = useCallback((num: number) => `$${numeral(num).format('0,0')}`, []);

  return {
    state,
    tickPriceFormatter,
  };
};
