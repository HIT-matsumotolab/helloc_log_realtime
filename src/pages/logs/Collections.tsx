import "./logs.scss";
import Examples from "../../components/dataTable/Examples";
import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import Loading from "../loading/Loading";
import { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Collection } from "../../types/log";
import { useFetchCollections } from "../../api/logs/Logs";

const Collections = () => {
  const { collectionId } = useParams();
  const postQuery: UseQueryResult<Collection[], unknown> =
    useFetchCollections();
  const columns = useMemo<MRT_ColumnDef<Collection>[]>(
    () => [
      {
        id: "book",
        header: "Collections",
        columns: [
          {
            accessorKey: "book_id",
            id: "book_id",
            header: "BookID",
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
            accessorKey: "book.name",
            enableClickToCopy: true,
            header: "Name",
            size: 300,
          },
          {
            accessorKey: "book.summary",
            enableClickToCopy: true,
            header: "Summary",
            size: 300,
          },
        ],
      },
      {
        id: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <Link to={`/logs/${collectionId}/${row.original.book_id}`}>
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
    [collectionId]
  );

  if (postQuery.isLoading) return <Loading />;
  if (postQuery.isError) return <h1>Error loading data!!!</h1>;
  const collectionRows = postQuery.data.map((collection) => ({
    id: `${collection.group_id}/${collection.book_id}`,
    ...collection,
  }));

  return (
    <div className="logs">
      <div className="info">
        <h1>Logs</h1>
        <p>取得したい教材を選択</p>
      </div>
      <Examples slug="collection" columns={columns} rows={collectionRows} />
    </div>
  );
};

export default Collections;
