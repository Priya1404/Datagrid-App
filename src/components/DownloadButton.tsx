import React from 'react';
import downloadIcon from '../app/assets/download.png';
import Image from 'next/image';

interface DownloadButtonProps {
  selectedRows: number[];
  data: { name: string; device: string; path: string; status: string }[];
  style?: React.CSSProperties;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ selectedRows, data, style }) => {
  const handleDownload = () => {
    const selectedData = selectedRows.map(index => data[index]);
    if (selectedData.length > 0) {
      const alertMessage = selectedData.map(item => 
        `Name: ${item.name} Device: ${item.device} Path: ${item.path}`
      ).join('\n');
      alert(`Downloaded Items:\n${alertMessage}`);
    }
  };

  const allAvailable = selectedRows.every(index => data[index].status === 'available');
  const isDisabled = selectedRows.length === 0 || !allAvailable; // Disable if no rows are selected or not all are available

  return (
    <button 
      onClick={isDisabled ? undefined : handleDownload}
      disabled={isDisabled} 
      style={{ 
        marginLeft: '10px', 
        display: 'flex', 
        alignItems: 'center', 
        background: 'transparent',
        color: isDisabled ? '#d3d3d3' : 'black', // Light grey when disabled, black when enabled
        border: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        padding: '0', 
        textDecoration: 'underline', // Underline to indicate it's clickable
        ...style // Apply any additional styles passed as props
      }}
    >
      <Image src={downloadIcon} alt="Download" style={{ marginRight: '5px', width: '20px', height: '20px' }} />
      Download Selected
    </button>
  );
};

export default DownloadButton;