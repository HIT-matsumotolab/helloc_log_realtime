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
