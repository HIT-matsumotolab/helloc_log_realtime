import { MaterialReactTable } from "material-react-table";

type Props = {
  columns: any;
  rows: any;
  slug: string;
};

const Example = (props: Props) => {
  return (
    <MaterialReactTable
      columns={props.columns}
      data={props.rows}
      enableColumnFilterModes
      enableColumnOrdering
      enableGrouping
      enablePinning
      enableRowSelection
      initialState={{ showColumnFilters: true }}
      positionToolbarAlertBanner="bottom"
    />
  );
};

export default Example;
