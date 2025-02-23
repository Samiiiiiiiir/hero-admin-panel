import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useCreateHeroMutation, useGetFiltersQuery } from '../../api/apiSlice';

const HeroesAddForm = () => {
  const {
    data: filters = [],
    isLoading: filtersLoading,
    isFetching: filtersFetching,
    isSuccess: filtersLoaded,
  } = useGetFiltersQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [createHero] = useCreateHeroMutation();

  const onSubmit = async (data) => {
    const newHero = {
      id: uuidv4(),
      ...data,
    };
    createHero(newHero).unwrap();
    reset();
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
        {(filtersLoading || filtersFetching) && <div>Loading...</div>}
        {filtersLoaded && filters.length && (
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
