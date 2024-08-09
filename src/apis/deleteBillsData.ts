import axios from "axios";

export const deleteBillData = async (id: string) => {
  let route = `${import.meta.env.VITE_REACT_APP_API_URL}bills/${id}`;

  const response = await axios.delete(route);

  return response;
};
