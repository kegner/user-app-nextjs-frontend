import React from 'react';
import { ColumnDef, RowType } from '@/lib/types/types';
import Pagination from './pagination';
import ColumnHeader from './column-header';

function getValue<T>(column: ColumnDef<T>, rowData: T) {
  return column.formatter
    ? column.formatter(rowData)
    : String(column.field ? rowData[column.field] : '');
}

export default function DataTable<T extends RowType>({
  columns,
  data,
  totalItems,
  totalPages,
}: {
  columns: ColumnDef<T>[];
  data: T[];
  totalItems: number;
  totalPages: number;
}) {
  return (
    <div className="m-4 overflow-hidden rounded-lg border-1">
      <table className="w-full table-auto border-b-1">
        <thead className="border-b-1">
          <tr className="bg-neutral-700">
            {columns.map((column) => (
              <ColumnHeader
                key={column.id.toString()}
                field={column.field}
                headerName={column.headerName}
              />
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((d) => (
            <tr key={d.id} className="odd:bg-neutral-800 even:bg-neutral-900">
              {columns.map((column) => (
                <td className="p-3 py-4" key={column.id.toString()}>
                  {getValue(column, d)}
                </td>
              ))}
            </tr>
          ))}
          {!data.length && (
            <tr className="w-full bg-neutral-800">
              <td colSpan={columns.length} className="py-4 text-center">
                No Data to Display
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination totalItems={totalItems} totalPages={totalPages} />
    </div>
  );
}
