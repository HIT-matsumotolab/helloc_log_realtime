import "./logs.scss";
import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import Loading from "../loading/Loading";
import { useFetchRecords } from "../../api/logs/Logs";
import { Record } from "../../types/log";
import { Link, useParams } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import Examples from "../../components/dataTable/Examples";

const Records = () => {
  const { collectionId, recordId } = useParams();
  const postQuery: UseQueryResult<Record[], unknown> = useFetchRecords();
  const columns = useMemo<MRT_ColumnDef<Record>[]>(
    () => [
      {
        id: "question",
        header: "Records",
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
          {
            accessorKey: "question.name",
            enableClickToCopy: true,
            header: "Name",
            size: 200,
          },
          {
            accessorKey: "question.format",
            enableClickToCopy: true,
            header: "Format",
            size: 200,
          },
          {
            accessorKey: "question.mode",
            enableClickToCopy: true,
            header: "Mode",
            size: 200,
          },
          {
            accessorKey: "question.time_limit",
            enableClickToCopy: true,
            header: "TimeLimit",
            size: 100,
          },
          {
            accessorKey: "question.number_limit",
            enableClickToCopy: true,
            header: "MinimumLine",
            size: 100,
          },
        ],
      },
      {
        id: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <Link
            to={`/logs/${collectionId}/${recordId}/${row.original.question_id}`}
          >
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
  const recordRows = postQuery.data.map((record) => ({
    id: `${collectionId}/${record.book_id}/${record.question_id}`,
    ...record,
  }));

  return (
    <div className="logs">
      <div className="info">
        <h1>Logs</h1>
        <p>取得したい問題を選択</p>
      </div>
      <Examples slug="record" columns={columns} rows={recordRows} />
    </div>
  );
};

export default Records;
