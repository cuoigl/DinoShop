import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import { useSelector } from "react-redux";
import axios from "axios";

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
    <UserOrderDetailsPageComponent userInfo={userInfo} getUser={getUser} />
  );
};

export default UserOrderDetailsPage;
