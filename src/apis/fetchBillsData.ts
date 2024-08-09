import axios from "axios";

export const fetchBillsData = async (
  id?: string,
  currentPage: number = 1,
  perPage: number = 10,
  searchField: string = "",
  search: string = ""
) => {
  let route = `${
    import.meta.env.VITE_REACT_APP_API_URL
  }bills?_page=${currentPage}&_per_page=${perPage}&_sort=-created_at`;

  if (search) {
    route += `&${searchField ? searchField : "name"}=${search}`;
  }

  if (id) {
    route = `${import.meta.env.VITE_REACT_APP_API_URL}bills/${id}`;
  }

  const response = await axios.get(route);

  return response;
};
