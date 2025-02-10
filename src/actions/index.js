export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  };
};

export const heroesDelete = (id) => {
  return {
    type: 'HEROES_DELETE',
    payload: id,
  };
};

export const heroesAdd = (hero) => {
  return {
    type: 'HEROES_ADD',
    payload: hero,
  };
};

export const filtersFetching = () => {
  return {
    type: 'FILTER_FETCHING',
  };
};

export const filtersFetched = (data) => {
  return {
    type: 'FILTER_FETCHED',
    payload: data,
  };
};

export const filtersFetchingError = () => {
  return {
    type: 'FILTER_FETCHING_ERROR',
  };
};

export const changeActiveFilter = (name) => {
  return {
    type: 'FILTER_ACTIVE_CHANGE',
    payload: name,
  };
};
