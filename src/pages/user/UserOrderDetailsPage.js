import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import { useSelector } from "react-redux";
import axios from "axios";

import { loadScript } from "@paypal/paypal-js";

const getOrder = async (orderId) => {
  const { data } = await axios.get(
    "http://localhost:3000/api/orders/user/" + orderId,
    { withCredentials: true }
  );
  return data;
};

const UserOrderDetailsPage = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/api/users/profile/" + userInfo._id,
      { withCredentials: true }
    );
    return data;
  };

  return (
    <UserOrderDetailsPageComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
      loadScript={loadScript}
    />
  );
};

export default UserOrderDetailsPage;
