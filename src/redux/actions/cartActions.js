import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (productId, quantity) => async (dispatch) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/get-one/${productId}`
  );
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      productID: data._id,
      name: data.name,
      price: data.price,
      image: data.images[0] ?? null,
      count: data.count,
      quantity,
    },
  });
};
