import UsersPageComponent from "./components/UsersPageComponent";

import axios from "axios";

const fetchUsers = async (abctrl) => {
  const { data } = await axios.get("http://localhost:3000/api/users", {
    signal: abctrl.signal,
  });
  return data;
};
const AdminUsersPage = () => {
  return <UsersPageComponent fetchUsers={fetchUsers} />;
};

export default AdminUsersPage;
