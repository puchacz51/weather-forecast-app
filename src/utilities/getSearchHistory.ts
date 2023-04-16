import { City } from "./type";

type SearchHistory = City[] | [];

export const getSearchHistory = () => {
  const searchHistory = localStorage.getItem('searchHistory');
  if (!searchHistory) return [];
  return JSON.parse(searchHistory) as SearchHistory;
};
export const setSearchHistory = (newHistory: SearchHistory) => {
  localStorage.setItem('searchHistory', JSON.stringify(newHistory));
};
