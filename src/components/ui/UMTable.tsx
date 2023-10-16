import { Button, Table } from "antd";

type PaginationOptions = {
  pageSize?: number;
  total?: number;
  showSizeChanger: boolean;
  onChange: (page: number, size: number) => void;
};

interface ITableProps {
  loading: boolean;
  columns: any;
  dataSource: any;
  showPagination: boolean;
  paginationOptions: PaginationOptions;
  handleChangeTableOptions: (pagination: any, filter: any, sorter: any) => void;
}

const UMTable = ({
  loading = false,
  columns,
  dataSource,
  paginationOptions,
  handleChangeTableOptions,
  showPagination,
}: ITableProps) => {
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={showPagination ? paginationOptions : false}
      onChange={handleChangeTableOptions}
      scroll={{ x: 700 }}
      sticky
    />
  );
};

export default UMTable;
