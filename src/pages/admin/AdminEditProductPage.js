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

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
    />
  );
};

export default AdminEditProductPage;
