import { API_URL } from "../Client";
import { GroupsType } from "../../types/group";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchGroups = () => {
  const response = useQuery({
    queryKey: ["groups"],
    queryFn: async (): Promise<GroupsType[]> => {
      const response = await axios.get(API_URL + "/groups");
      const data: GroupsType[] = await response.data;
      console.log(data);
      return data;
    },
  });
  return response;
};
