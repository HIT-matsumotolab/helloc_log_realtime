import "./logs.scss";
import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import Loading from "../loading/Loading";
import { useFetchInfomationLogs } from "../../api/logs/Logs";
import { InfomationLog, Log, Record } from "../../types/log";
import { Link, useParams } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import Examples from "../../components/dataTable/Examples";

const Logs = () => {
  const { collectionId, recordId, logId } = useParams();
  const postQuery: UseQueryResult<Log[], unknown> = useFetchInfomationLogs();
  const columns = useMemo<MRT_ColumnDef<InfomationLog>[]>(
    () => [
      {
        id: "question",
        header: "InfomationLogs",
        columns: [
          {
            accessorKey: "question_id",
            id: "question_id",
            header: "QuestionID",
            size: 150,
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
        ],
      },
      {
        id: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <Link to={`/logs/${collectionId}/${recordId}/info`}>
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
    [collectionId, recordId]
  );
  if (postQuery.isLoading) return <Loading />;
  if (postQuery.isError) return <h1>Error loading data!!!</h1>;
  const infoRows = postQuery.data.map((user) => ({
    id: `info/${user.user_id}`,
    ...user,
  }));
  console.log(infoRows);

  return (
    <div className="logs">
      <div className="info">
        <h1>Logs</h1>
        <p>取得したい問題を選択</p>
      </div>
      <Examples slug="info" columns={columns} rows={infoRows} />
    </div>
  );
};

export default Logs;
