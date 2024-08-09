import axios from "axios";
import { Bill } from "../dataType";

export const addEditBillData = async (formData: Bill, id?: string) => {
  let route = `${import.meta.env.VITE_REACT_APP_API_URL}bills`;

  if (id) {
    route = `${import.meta.env.VITE_REACT_APP_API_URL}bills/${id}`;
  }

  const response = id ? await axios.put(route, formData) : await axios.post(route, formData);

  return response;
};
