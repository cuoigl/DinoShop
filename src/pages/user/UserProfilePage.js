import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios";

const UserProfilePage = () => {
  const updateUserApiRequest = async (
    name,
    lastName,
    phoneNumber,
    address,
    country,
    zipCode,
    city,
    state,
    password
  ) => {
    const { data } = await axios.put(
      "http://localhost:3000/api/users/profile",
      {
        name,
        lastName,
        phoneNumber,
        address,
        country,
        zipCode,
        city,
        state,
        password,
      }
    );
    return data;
  };

  return (
    <UserProfilePageComponent updateUserApiRequest={updateUserApiRequest} />
  );
};

export default UserProfilePage;
