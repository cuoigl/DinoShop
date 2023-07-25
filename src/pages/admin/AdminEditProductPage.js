import EditProductPageComponent from "./components/EditProductPageComponent";

import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/get-one/${productId}`,
    { withCredentials: true }
  );
  return data;
};

const updateProductApiRequest = async (productId, formInputs) => {
  const { data } = await axios.put(
    `http://localhost:3000/api/products/admin/${productId}`,
    {
      ...formInputs,
    },
    { withCredentials: true }
  );
  return data;
};

const uploadHandler = async (images, productId) => {
  const formData = new FormData();

  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  await axios.post(
    "http://localhost:3000/api/products/admin/upload?productId=" + productId,
    formData,
    { withCredentials: true }
  );
};

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);

  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath);
    await axios.delete(
      `http://localhost:3000/api/products/admin/image/${encoded}/${productId}`,
      { withCredentials: true }
    );
  };

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      reduxDispatch={reduxDispatch}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadHandler={uploadHandler}
    />
  );
};

export default AdminEditProductPage;
