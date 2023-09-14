import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./questions.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { UseQueryResult } from "@tanstack/react-query";
import { QuestionsType } from "../../types/question";
import { useFetchQuestions } from "../../api/questions/Questions";
import Loading from "../loading/Loading";

const columns: GridColDef[] = [
  { field: "question_id", headerName: "ID", width: 90 },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "format",
    type: "string",
    headerName: "Format",
    width: 150,
  },
  {
    field: "user_id",
    type: "number",
    headerName: "Creator",
    width: 100,
  },
  {
    field: "mode",
    type: "string",
    headerName: "Mode",
    width: 100,
  },
  {
    field: "time_limit",
    type: "number",
    headerName: "TimeLimit",
    width: 150,
  },
  {
    field: "number_limit",
    type: "number",
    headerName: "MinimumLine",
    width: 150,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 200,
    type: "datetime",
  },
];

const Questions = () => {
  const [open, setOpen] = useState(false);
  const postQuery: UseQueryResult<QuestionsType[], unknown> =
    useFetchQuestions();
  console.log(postQuery);

  if (postQuery.isLoading) return <Loading />;
  if (postQuery.isError) return <h1>Error loading data!!!</h1>;
  const questionRows = postQuery.data.map((question) => ({
    id: question.question_id, // 一意のIDを設定
    ...question, // 他のプロパティも保持
  }));

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allquestions"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/questions").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="questions">
      <div className="info">
        <h1>Questions</h1>
        <button onClick={() => setOpen(true)}>Add New Question</button>
      </div>
      <DataTable slug="questions" columns={columns} rows={questionRows} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="questions" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="question" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Questions;
