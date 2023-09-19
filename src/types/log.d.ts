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
  information_log_id: number;
  user_id: number;
  question_id: number;
  format: string;
}

export interface Log {
  user_id: number;
  info: InfomationLog[];
}

export interface CardLog {
  user_id: number;
  info: CardInfo[];
}

export interface CardInfo extends InfomationLog {
  card_detail_logs: CardDetailLog[];
}

interface SelectHistory {
  isMove: boolean;
  option: string;
  isDammy: boolean;
  cardNumber: number;
  destination: number;
  optionNumber: number;
}

interface CardDetailLog {
  information_log_id: string;
  card_detail_log_id: string;
  select_history: SelectHistory | null;
  trial: number;
  result_type: string | null;
  levenshtein_distance: number;
  answer: {
    code: string;
  } | null;
  elapsed_time: number;
  answer_at: string;
}
