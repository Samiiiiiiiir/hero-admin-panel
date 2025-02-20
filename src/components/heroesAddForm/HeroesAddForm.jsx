import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { heroCreated } from '../heroesList/heroesSlice';
import { useHttp } from '../../hooks/http.hook';
import { selectAll } from '../heroesFilters/filtersSlice';
import store from './../../store';

const HeroesAddForm = () => {
  const filters = selectAll(store.getState());
  const { filtersLoadingStatus } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const newHero = {
      id: uuidv4(),
      ...data,
    };
    try {
      const req = await request(
        'http://localhost:3001/heroes',
        'POST',
        JSON.stringify(newHero)
      );
      dispatch(heroCreated(newHero));
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border p-4 shadow-lg rounded"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Как меня зовут?"
          {...register('name', { required: true })}
        />
        {errors.name && (
          <span style={{ color: 'darkred' }}>This field is required</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          className="form-control"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
          {...register('text', { required: true })}
        />
        {errors.text && (
          <span style={{ color: 'darkred' }}>This field is required</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        {filtersLoadingStatus === 'loading' && <div>Loading...</div>}
        {filtersLoadingStatus === 'idle' && filters.length && (
          <select
            className="form-select"
            {...register('element', { required: true })}
            defaultValue=""
          >
            <option value="" disabled>
              Я владею элементом...
            </option>
            {filters.map((item) => {
              if (item.name === 'all') return;
              return (
                <option key={item.id} value={item.name}>
                  {item.label}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
