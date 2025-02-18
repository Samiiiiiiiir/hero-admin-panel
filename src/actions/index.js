import { createAction } from '@reduxjs/toolkit';

import {
  heroesFetching,
  heroesFetched,
  heroesFetching,
} from './../components/heroesList/heroesSlice';

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request('http://localhost:3001/filters')
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};

export const filtersFetching = createAction('FILTER_FETCHING');

export const filtersFetchingError = createAction('FILTER_FETCHING_ERROR');

export const filtersFetched = createAction('FILTER_FETCHED');

export const changeActiveFilter = createAction('FILTER_ACTIVE_CHANGE');
