import { API_URL } from "../Client";
import { UserType, UsersType } from "../../types/user";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useFetchUsers = () => {
  const response = useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<UsersType[]> => {
      const response = await axios.get(API_URL + "/users");
      const data: UsersType[] = await response.data;
      return data;
    },
  });
  return response;
};

export const useFetchUser = () => {
  const { userId } = useParams();
  const response = useQuery({
    queryKey: ["user", userId],
    queryFn: async (): Promise<UserType> => {
      const response = await axios.get(API_URL + "/users/" + userId);
      const data: UserType = await response.data;
      return data;
    },
  });
  return response;
};
