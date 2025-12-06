// client/src/components/admin/DataTable.tsx
'use client';
import { ReactNode } from 'react';

interface DataTableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
  renderCell?: (row: T, column: { key: keyof T; label: string }) => ReactNode;
}

export const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  renderCell,
}: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {renderCell ? renderCell(row, column) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};