import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { UseQueryResult } from "@tanstack/react-query";
import { UserType, UsersType } from "../../types/user";
import { useFetchUser, useFetchUsers } from "../../api/users/Users";
import Loading from "../loading/Loading";

const columns: GridColDef[] = [
  { field: "user_id", headerName: "ID", width: 90 },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "mail",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "role",
    type: "string",
    headerName: "Role",
    width: 150,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 200,
    type: "datetime",
  },
];

const UserDetail = () => {
  const [open, setOpen] = useState(false);
  const postQuery: UseQueryResult<UserType, unknown> = useFetchUser();
  if (postQuery.isLoading) return <Loading />;
  if (postQuery.isError) return <h1>Error loading data!!!</h1>;
  //   const userRows = postQuery.data.map((user) => ({
  //     id: user.user_id, // 一意のIDを設定
  //     ...user, // 他のプロパティも保持
  //   }));

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allusers"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/users").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <p>{postQuery.data.name}</p>
        <p>{postQuery.data.mail}</p>
        {/* <button onClick={() => setOpen(true)}>Add New User</button> */}
      </div>
      {/* <DataTable slug="users" columns={columns} rows={userRows} /> */}
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default UserDetail;
