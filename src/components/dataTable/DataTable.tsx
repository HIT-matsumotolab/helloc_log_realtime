import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable = (props: Props) => {
  let actionColumn: GridColDef;
  switch (props.slug) {
    case "logs":
      actionColumn = {
        field: "action",
        type: "actions",
        pinnable: true,
        headerClassName: "actionColumn",
        renderCell: (params) => {
          return (
            <div className="action">
              <Link to={`/${props.slug}/${params.row.id}`}>
                <img src="/link.svg" alt="" />
              </Link>
            </div>
          );
        },
      };
      break;

    default:
      actionColumn = {
        field: "action",
        type: "actions",
        hideable: true,
        renderCell: (params) => {
          return (
            <div className="action">
              <Link to={`/${props.slug}/${params.row.id}`}>
                <img src="/view.svg" alt="" />
              </Link>
            </div>
          );
        },
      };
  }

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
