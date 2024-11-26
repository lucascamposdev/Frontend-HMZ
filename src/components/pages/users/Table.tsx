import { Button } from "@/components/ui/button";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AppTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  hasMoreData: boolean;
}

export default function AppTable<TData, TValue>({
  columns,
  data,
  page,
  setPage,
  pageSize,
  setPageSize,
  hasMoreData,
}: AppTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {data?.length ? (
            data.map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {table
                  .getRowModel()
                  .rows[rowIndex]?.getVisibleCells()
                  .map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-2">
        {/* Linhas por página */}
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-sm">
            Linhas por página:
          </label>
          <select
            id="pageSize"
            className="border rounded p-1 text-sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value)); 
              setPage(1); 
            }}
          >
            {[3, 5, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        {/* Navegação */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <span className="text-sm">Página {page}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasMoreData}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
