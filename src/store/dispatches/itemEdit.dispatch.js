import { itemTypes } from "../types/item.types";
import instance from "../../api/request";

export const fetchItemEdit = (text, id, checked) => async (dispatch) => {
  try {
    if (text === "") {
      return dispatch({
        type: itemTypes.DATA_ERROR,
        payload: "Пусте значення",
      });
    }
    const res = await instance.post("router?action=editItem", {
      activeID: localStorage.getItem("activeID"),
      text,
      id,
      checked,
    });

    if (res.data.ok) {
      return dispatch({
        type: itemTypes.ITEM_EDIT,
        payload: true,
      });
    }

    return dispatch({
      type: itemTypes.DATA_ERROR,
      payload: "Запис не змінено",
    });
  } catch (e) {
    return dispatch({
      type: itemTypes.SERVER_ERROR,
      payload: "Помилка сервера",
    });
  }
};
