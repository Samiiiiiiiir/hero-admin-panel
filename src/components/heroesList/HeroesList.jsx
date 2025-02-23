import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import { useGetHeroesQuery } from '../../api/apiSlice';

const HeroesList = () => {
  const { data: heroes, isFetching, isLoading, isError } = useGetHeroesQuery();

  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    if (activeFilter === 'all') {
      return heroes;
    }
    return heroes.filter((item) => item.element === activeFilter);
  }, [heroes, activeFilter]);

  if (isLoading || isFetching) {
    return <Spinner />;
  } else if (isError) {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr?.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }
    return arr?.map((item) => <HeroesListItem key={item.id} {...item} />);
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
