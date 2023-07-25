import UsersPageComponent from "./components/UsersPageComponent";

import axios from "axios";

const fetchUsers = async (abctrl) => {
  const { data } = await axios.get(
    "http://localhost:3000/api/users",
    {
      signal: abctrl.signal,
    },
    { withCredentials: true }
  );
  return data;
};

const deleteUser = async (userId) => {
  const { data } = await axios.delete(
    `http://localhost:3000/api/users/${userId},`,
    { withCredentials: true }
  );
  return data;
};

const AdminUsersPage = () => {
  return <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />;
};

export default AdminUsersPage;
