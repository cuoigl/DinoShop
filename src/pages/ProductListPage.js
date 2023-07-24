import ProductListPageComponent from "./components/ProductListPageComponent";
import axios from "axios";

const getProducts = async () => {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
};

const ProductListPage = () => {
  return <ProductListPageComponent getProducts={getProducts} />;
};

export default ProductListPage;
