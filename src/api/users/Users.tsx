import { API_URL } from "../Client";
import { Users } from "./user";

export const fetchUsers = async (): Promise<Users[]> => {
  const response = await fetch(API_URL); // 実際のAPIエンドポイントを指定
  if (!response.ok) {
    throw new Error("データの取得に失敗しました");
  }
  const data: Users[] = await response.json();
  return data;
};
