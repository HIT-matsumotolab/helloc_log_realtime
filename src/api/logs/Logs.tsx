import { API_URL } from "../Client";
import { GroupsType } from "../../types/group";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Collection, InfomationLog, Log, Record } from "../../types/log";

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

export const useFetchCollections = () => {
  const { collectionId } = useParams();
  const response = useQuery({
    queryKey: ["collections", collectionId],
    queryFn: async (): Promise<Collection[]> => {
      const response = await axios.get(
        API_URL + "/groups/" + collectionId + "/books"
      );
      const data: Collection[] = await response.data;
      return data;
    },
  });
  return response;
};

export const useFetchRecords = () => {
  const { recordId } = useParams();
  const response = useQuery({
    queryKey: ["records", recordId],
    queryFn: async (): Promise<Record[]> => {
      const response = await axios.get(
        API_URL + "/books/" + recordId + "/questions"
      );
      const data: Record[] = await response.data;
      return data;
    },
  });
  return response;
};

export const useFetchInfomationLogs = () => {
  const { logId } = useParams();
  const response = useQuery({
    queryKey: ["infomations", logId],
    queryFn: async (): Promise<Log[]> => {
      const response = await axios.get(API_URL + "/logs/info/" + logId);
      const data: Log[] = await response.data;
      return data;
    },
  });
  return response;
};
