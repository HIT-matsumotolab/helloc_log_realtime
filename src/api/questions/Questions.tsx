import { API_URL } from "../Client";
import { QuestionsType } from "../../types/question";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchQuestions = () => {
  const response = useQuery({
    queryKey: ["questions"],
    queryFn: async (): Promise<QuestionsType[]> => {
      const response = await axios.get(API_URL + "/questions");
      const data: QuestionsType[] = await response.data;
      console.log(data);
      return data;
    },
  });
  return response;
};
