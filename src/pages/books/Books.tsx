import "./books.scss";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { useState } from "react";
import Add from "../../components/add/Add";
import { UseQueryResult } from "@tanstack/react-query";
import { BooksType } from "../../types/book";
import { useFetchBooks } from "../../api/books/Books";
import Loading from "../loading/Loading";

const columns: GridColDef[] = [
  { field: "book_id", headerName: "ID", width: 90 },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "summary",
    type: "string",
    headerName: "Summary",
    width: 200,
  },
  {
    field: "access_key",
    type: "string",
    headerName: "AccessKey",
    width: 150,
  },
  {
    field: "user_id",
    type: "number",
    headerName: "CreatorID",
    width: 150,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 200,
    type: "datetime",
  },
];

const Books = () => {
  const [open, setOpen] = useState(false);
  const postQuery: UseQueryResult<BooksType[], unknown> = useFetchBooks();
  console.log(postQuery);

  if (postQuery.isLoading) return <Loading />;
  if (postQuery.isError) return <h1>Error loading data!!!</h1>;
  const bookRows = postQuery.data.map((book) => ({
    id: book.book_id, // 一意のIDを設定
    ...book, // 他のプロパティも保持
  }));

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allusers"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/users").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="books">
      <div className="info">
        <h1>Books</h1>
        <button onClick={() => setOpen(true)}>Add New Book</button>
      </div>
      <DataTable slug="books" columns={columns} rows={bookRows} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="book" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Books;
