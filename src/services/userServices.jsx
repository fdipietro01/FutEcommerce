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
export const deleteAllUsers = async (uid) => {
  try {
    const response = await axios.delete(`http://localhost:8081/api/users/`, {
      withCredentials: true,
    });
    return { deleted: response.data.deleted, status: response.status };
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

export const uploadDocuments = async (uid, documents) => {
  try {
    const response = await axios.post(
      `http://localhost:8081/api/users/${uid}/documents`,
      {
        id: documents[0],
        comproDom: documents[1],
        comproCuen: documents[2],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return {
      message: response.data.message,
      isUpgradeable: response.data.isUpgradeable,
      status: response.status,
    };
  } catch (err) {
    return { message: err.response.data.message };
  }
};
