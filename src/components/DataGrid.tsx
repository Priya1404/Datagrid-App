"use client";

import React, { useState } from 'react';
import { data } from '../utils/data';
import Checkbox from './Checkbox';
import DownloadButton from './DownloadButton';

const DataGrid = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows(data.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (rowIndex: number) => {
    setSelectedRows(prevSelected => {
      if (prevSelected.includes(rowIndex)) {
        return prevSelected.filter(index => index !== rowIndex);
      } else {
        return [...prevSelected, rowIndex];
      }
    });
  };

  const isAllSelected = selectedRows.length === data.length;
  const isSomeSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  return (
    <div style={{ backgroundColor: 'white', color: 'black', padding: '20px' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Datagrid</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Checkbox 
          isChecked={isAllSelected} 
          isIndeterminate={isSomeSelected} 
          onChange={handleSelectAll} 
        />
        <span style={{ marginLeft: '10px' }}>{selectedRows.length > 0 ? `${selectedRows.length} Selected` : 'None Selected'}</span>
        <DownloadButton 
          selectedRows={selectedRows} 
          data={data} 
          style={{ marginLeft: '10px', whiteSpace: 'nowrap' }}
        />
      </div>
      <table style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ width: '50px', textAlign: 'left' }}></th>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Device</th>
            <th style={{ textAlign: 'left' }}>Path</th>
            <th style={{ textAlign: 'left' }}>Status</th>
          </tr>
          <tr style={{ borderBottom: '2px solid #ddd' }} />
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td>
                <Checkbox 
                  isChecked={selectedRows.includes(index)} 
                  onChange={() => handleRowSelect(index)} 
                />
              </td>
              <td>{item.name}</td>
              <td>{item.device}</td>
              <td>{item.path}</td>
              <td>
                {item.status === 'available' && <span className="green-dot">🟢 </span>}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;