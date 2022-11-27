import { searchTypes } from "../types/search.types"

import { store } from "../index";



export const fetchSearch = (term) => (dispatch) => {

  try {
const items = store.getState().itemReducer;
      const filter = items.filter((t) => t.text.toLowerCase().match(term.toLowerCase()));
    if (term === "") {
      return dispatch({
        type: searchTypes.SEARCH_ERROR, payload: "Пусте значення"
      });
    }

    if (term !== "" && filter.length!==0) {
      
      return dispatch({
        type: searchTypes.SEARCH_SUCCESS, payload: filter
      });
    }
    if (filter.length===0) {
      
      return dispatch({
        type: searchTypes.SEARCH_ERROR_NO_MATHES, payload: "Нема збігів"
      });
    }
    
  } catch (e) {
    return dispatch({
      type: searchTypes.SERVER_ERROR,
      payload: "ПОМИЛКА СЕРВЕРА"
    });
  }
}