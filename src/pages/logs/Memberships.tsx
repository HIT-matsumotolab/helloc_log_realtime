import "./logs.scss";
import Examples from "../../components/dataTable/Examples";
import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { GroupsType } from "../../types/group";
import { useFetchGroups } from "../../api/groups/Groups";
import Loading from "../loading/Loading";
import { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Memberships = () => {
  const postQuery: UseQueryResult<GroupsType[], unknown> = useFetchGroups();
  const columns = useMemo<MRT_ColumnDef<GroupsType>[]>(
    () => [
      {
        id: "group", //id used to define `group` column
        header: "Groups",
        columns: [
          {
            accessorKey: "group_id",
            id: "group_id",
            header: "GroupID",
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "name",
            enableClickToCopy: true,
            header: "Name",
            size: 300,
          },
        ],
      },
      {
        id: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <Link to={`/logs/${row.original.group_id}`}>
            <img
              src="/link.svg"
              alt=""
              style={{
                display: "block",
                margin: "auto",
              }}
            />
          </Link>
        ),
      },
    ],
    []
  );

  if (postQuery.isLoading) return <Loading />;
  if (postQuery.isError) return <h1>Error loading data!!!</h1>;
  const groupRows = postQuery.data.map((group) => ({
    id: group.group_id,
    ...group,
  }));

  return (
    <div className="logs">
      <div className="info">
        <h1>Logs</h1>
        <p>取得したいグループを選択</p>
      </div>
      <Examples slug="membership" columns={columns} rows={groupRows} />
    </div>
  );
};

export default Memberships;
