import deepFreeze from 'deep-freeze';
import { isAltered } from './mergeIsAlteredState';
import state from '../../../__mocks__/state-mock';

describe('mergeIsAlteredState', () => {
  deepFreeze(state);

  it('should return true if selection is different from initial selection when multiselect', () => {
    const result = isAltered({
      ...state,
      multiselect: true,
      multiSelectSelectedIndexes: [1, 2, 3],
      multiSelectInitialSelectedIndexes: [0],
    });
    expect(result).toEqual(true);
  });

  it('should return false if selection is same as initial selection when multiselect', () => {
    const result = isAltered({
      ...state,
      multiselect: true,
      multiSelectSelectedIndexes: [4, 5, 6],
      multiSelectInitialSelectedIndexes: [4, 5, 6],
    });
    expect(result).toEqual(false);
  });

  it('should return true if selection is different from initial selection when is a single Select', () => {
    const result = isAltered({
      ...state,
      multiselect: false,
      singleSelectInitialIndex: 0,
      singleSelectSelectedIndex: 1,
    });
    expect(result).toEqual(true);
  });

  it('should return false if selection is same as initial selection when is a single Select', () => {
    const result = isAltered({
      ...state,
      multiselect: false,
      singleSelectInitialIndex: 5,
      singleSelectSelectedIndex: 5,
    });
    expect(result).toEqual(false);
  });
});
