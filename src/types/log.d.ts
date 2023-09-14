import { BooksType } from "./book";
import { QuestionsType } from "./question";
export interface Collection {
  group_id: number;
  book_id: number;
  created_at: string;
  book: BooksType;
}

export interface Record {
  book_id: number;
  question_id: number;
  created_at: string;
  question: QuestionsType;
}

export interface InfomationLog {
  infomation_log_id: number;
  user_id: number;
  question_id: number;
  format: string;
}

export interface Log {
  user_id: number;
  info: InfomationLog[];
}
