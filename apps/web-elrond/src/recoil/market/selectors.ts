import { atomState } from '@/recoil/market/atom';
import type { AtomState } from '@/recoil/market/types';
import { mergeStateChange } from '@/utils/merge_state_change';
import { ReadOnlySelectorOptions, selector } from 'recoil';

const getMarket: ReadOnlySelectorOptions<AtomState>['get'] = ({ get }): AtomState => {
  const state = get(atomState);
  return state;
};

export const writeMarket = selector({
  key: 'elrond/market.write.market',
  get: getMarket,
  set: ({ get, set }, value) => {
    const prevState = get(atomState);
    const newState = mergeStateChange(prevState, value);
    set(atomState, newState);
  },
});

export const readMarket = selector({
  key: 'elrond/market.read.market',
  get: getMarket,
});
