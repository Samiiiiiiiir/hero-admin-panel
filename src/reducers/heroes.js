/* import { createReducer } from '@reduxjs/toolkit';

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesDelete,
  heroesAdd,
} from '../actions';

const heroes = createReducer(initialState, (builder) => {
  builder
    .addCase(heroesFetching, (state) => {
      state.heroesLoadingStatus = 'loading';
    })
    .addCase(heroesFetched, (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = action.payload;
    })
    .addCase(heroesFetchingError, (state) => {
      state.heroesLoadingStatus = 'error';
    })
    .addCase(heroesDelete, (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    })
    .addCase(heroesAdd, (state, action) => {
      state.heroes.push(action.payload);
    })
    .addDefaultCase(() => {});
});

export default heroes;
 */
