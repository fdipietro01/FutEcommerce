import axios from "axios";

export const getAllUsers = async () => {
  try {
    const response = await axios(`http://localhost:8081/api/users`, {
      withCredentials: true,
    });
    return { users: response.data.usuarios, status: response.status };
  } catch (err) {
    console.log(err);
    return { status: err.response.status };
  }
};

export const updateUserSettingCart = async (id, cid) => {
  try {
    const response = await axios.put(
      `http://localhost:8081/api/users/${id}/${cid}`,
      {},
      {
        withCredentials: true,
      }
    );
    return { user: response.data.user, status: response.status };
  } catch (err) {
    console.log(err);
    return { status: err.response.status };
  }
};

export const deleteUser = async (uid) => {
  try {
    const response = await axios.delete(
      `http://localhost:8081/api/users/${uid}`,
      {
        withCredentials: true,
      }
    );
    return { user: response.data.user, status: response.status };
  } catch (err) {
    console.log(err);
    return { status: err.response.status };
  }
};

export const setMembresyRole = async (uid) => {
  try {
    const response = await axios.put(
      `http://localhost:8081/api/users/premium/${uid}`,
      {},
      {
        withCredentials: true,
      }
    );
    return {
      user: response.data.newUser,
      status: response.status,
      newToken: response.data.token,
    };
  } catch (err) {
    console.log(err);
    return { status: err.response.status };
  }
};
