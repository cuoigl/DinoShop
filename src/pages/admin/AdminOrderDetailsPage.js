import OrderDetailsPageComponent from "./components/OrderDetailsPageComponent";

import axios from "axios";

const getOrder = async (id) => {
  const { data } = await axios.get(
    "http://localhost:3000/api/orders/user/" + id
  );
  return data;
};

const AdminOrderDetailsPage = () => {
  return <OrderDetailsPageComponent getOrder={getOrder} />;
};

export default AdminOrderDetailsPage;
