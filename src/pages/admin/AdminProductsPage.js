import ProductsPageComponent from "./components/ProductsPageComponent";

import axios from "axios";

const fetchProducts = async (abctrl) => {
  const { data } = await axios.get("http://localhost:3000/api/products/admin", {
    signal: abctrl.signal,
  });
  return data;
};

const AdminProductsPage = () => {
  return <ProductsPageComponent fetchProducts={fetchProducts} />;
};

export default AdminProductsPage;
