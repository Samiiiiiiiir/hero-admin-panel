import { useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  changeActiveFilter,
} from './../../actions/index';
import { useDispatch, useSelector } from 'react-redux';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { request } = useHttp();
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
  }, []);

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
                    activeFilter == item.name ? 'active' : ''
                  }`}
                  onClick={() => dispatch(changeActiveFilter(item.name))}
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
