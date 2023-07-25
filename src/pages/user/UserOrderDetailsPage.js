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

const loadPayPalScript = () => {
  loadScript({
    "client-id":
      "AVfG0d6HdLo-SC8lJQ0BcCxbC2IPGLp21sLzqZKdMzLZH8udpU-HM71FwS7N_OgfRqHLS2hkm5nky1hf",
  })
    .then((paypal) => {
      paypal
        .Buttons({
          createOrder: createPayPalOrderHandler,
          onCancel: onCancelHandler,
          onApprove: onApproveHandler,
          onError: onErrorHandler,
        })
        .render("#paypal-container-element");
    })
    .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
    });
};

const createPayPalOrderHandler = function () {
  console.log("createPayPalOrderHandler");
};

const onCancelHandler = function () {
  console.log("cancel");
};

const onApproveHandler = function () {
  console.log("onApproveHandler");
};

const onErrorHandler = function (err) {
  console.log("error");
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
      loadPayPalScript={loadPayPalScript}
    />
  );
};

export default UserOrderDetailsPage;
