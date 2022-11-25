import { searchTypes } from "../types/search.types";

const initialState = {
  item: [],
};
export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case searchTypes.SEARCH_SUCCESS:
      return action.payload;
    
    default:
      return state;
  }
};