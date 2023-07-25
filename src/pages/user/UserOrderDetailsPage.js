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

const loadPayPalScript = (cartSubtotal, cartItems) => {
  loadScript({
    "client-id":
      "AVfG0d6HdLo-SC8lJQ0BcCxbC2IPGLp21sLzqZKdMzLZH8udpU-HM71FwS7N_OgfRqHLS2hkm5nky1hf",
  })
    .then((paypal) => {
      paypal
        .Buttons(buttons(cartSubtotal, cartItems))
        .render("#paypal-container-element");
    })
    .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
    });
};

const buttons = (cartSubtotal, cartItems) => {
  return {
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: cartSubtotal,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: cartSubtotal,
                },
              },
            },
            items: cartItems.map((product) => {
              return {
                name: product.name,
                unit_amount: {
                  currency_code: "USD",
                  value: product.price,
                },
                quantity: product.quantity,
              };
            }),
          },
        ],
      });
    },
    onCancel: onCancelHandler,
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        var transaction = orderData.purchase_units[0].payments.captures[0];
        if (
          transaction.status === "COMPLETED" &&
          Number(transaction.amount.value) === Number(cartSubtotal)
        ) {
          console.log("update order in database");
        }
      });
    },
    onError: onErrorHandler,
  };
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
