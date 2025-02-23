import { activeFilterChange } from './filtersSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useGetFiltersQuery } from '../../api/apiSlice';

const HeroesFilters = () => {
  const {
    data: filters = [],
    isLoading,
    isFetching,
    isError,
  } = useGetFiltersQuery();
  const dispatch = useDispatch();

  const { activeFilter } = useSelector((state) => state.filters.activeFilter);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {(isLoading || isFetching) && <span>Loading...</span>}
          {isError && (
            <span style={{ color: 'darkred' }}>Something went wrond</span>
          )}
          {filters.map((item) => {
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
