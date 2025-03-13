import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataGrid from '../DataGrid';
import { data } from '../../utils/data';

describe('DataGrid Component', () => {
  test('renders DataGrid with correct headers', () => {
    render(<DataGrid />);
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Device")).toBeDefined();
    expect(screen.getByText("Path")).toBeDefined();
    expect(screen.getByText("Status")).toBeDefined();
  });

  test('handles individual row selection', () => {
    render(<DataGrid />);
    const checkboxes = screen.getAllByRole('checkbox');
    const firstRowCheckbox = checkboxes[1]; // to select the first row
    fireEvent.click(firstRowCheckbox);
    
    expect(screen.getByText("1 Selected")).toBeDefined();
  });

  test('shows alert with selected rows data', () => {
    window.alert = jest.fn();
    render(<DataGrid />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[2]); // Click the second row checkbox
    const downloadButton = screen.getByText("Download Selected");
    console.log(downloadButton)
    fireEvent.click(downloadButton);
    
    expect(window.alert).toHaveBeenCalled();
  });
});