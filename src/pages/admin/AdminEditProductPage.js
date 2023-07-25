import EditProductPageComponent from "./components/EditProductPageComponent";

import { useSelector } from "react-redux";
import axios from "axios";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/get-one/${productId}`,
    { withCredentials: true }
  );
  return data;
};

const updateProductApiRequest = (productId, formInputs) => {
  console.log(productId);
  console.log(formInputs);
};

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
    />
  );
};

export default AdminEditProductPage;
