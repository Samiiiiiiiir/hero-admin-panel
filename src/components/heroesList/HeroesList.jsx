import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import {
  fetchHeroes,
  filteredHeroesSelector,
} from '../../components/heroesList/heroesSlice';

const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector);

  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
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
