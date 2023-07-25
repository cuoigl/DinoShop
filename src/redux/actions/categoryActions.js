import * as actionTypes from "../constants/categoryConstants";

import axios from "axios";

export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("http://localhost:3000/api/categories", {
    withCredentials: true,
  });
  dispatch({
    type: actionTypes.GET_CATEGORIES_REQUEST,
    payload: data,
  });
};
