import { API_URL } from "../Client";
import { BooksType } from "../../types/book";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchBooks = () => {
  const response = useQuery({
    queryKey: ["books"],
    queryFn: async (): Promise<BooksType[]> => {
      const response = await axios.get(API_URL + "/books");
      const data: BooksType[] = await response.data;
      console.log(data);
      return data;
    },
  });
  return response;
};
