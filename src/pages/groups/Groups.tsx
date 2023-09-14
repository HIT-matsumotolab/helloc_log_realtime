import "./groups.scss";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { useState } from "react";
import Add from "../../components/add/Add";
import { UseQueryResult } from "@tanstack/react-query";
import { GroupsType } from "../../types/group";
import { useFetchGroups } from "../../api/groups/Groups";
import Loading from "../loading/Loading";

const columns: GridColDef[] = [
  { field: "group_id", headerName: "ID", width: 90 },
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

const Groups = () => {
  const [open, setOpen] = useState(false);
  const postQuery: UseQueryResult<GroupsType[], unknown> = useFetchGroups();
  console.log(postQuery);

  if (postQuery.isLoading) return <Loading />;
  if (postQuery.isError) return <h1>Error loading data!!!</h1>;
  const groupRows = postQuery.data.map((group) => ({
    id: group.group_id, // 一意のIDを設定
    ...group, // 他のプロパティも保持
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
    <div className="groups">
      <div className="info">
        <h1>Groups</h1>
        <button onClick={() => setOpen(true)}>Add New Group</button>
      </div>
      <DataTable slug="gorups" columns={columns} rows={groupRows} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="group" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Groups;
