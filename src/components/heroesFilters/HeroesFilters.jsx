import { useEffect } from 'react';
import {
  fetchFilters,
  selectAll,
} from '../../components/heroesFilters/filtersSlice';

import { activeFilterChange } from './filtersSlice';
import { useDispatch, useSelector } from 'react-redux';

import store from './../../store';

const HeroesFilters = () => {
  const filters = selectAll(store.getState());
  const { filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
  }, [dispatch]);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filtersLoadingStatus === 'loading' && <span>Loading...</span>}
          {filtersLoadingStatus === 'error' && (
            <span style={{ color: 'darkred' }}>Something went wrond</span>
          )}
          {filtersLoadingStatus === 'idle' &&
            filters.map((item) => {
              return (
                <button
                  key={item.id}
                  className={`btn ${item.className} ${
                    activeFilter === item.name ? 'active' : ''
                  }`}
                  onClick={() => dispatch(activeFilterChange(item.name))}
                >
                  {item.label}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
