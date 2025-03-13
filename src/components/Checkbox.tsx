import React from 'react';

interface CheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onChange: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, isIndeterminate, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}
      ref={(input) => {
        if (input) {
          input.indeterminate = isIndeterminate || false;
        }
      }}
    />
  );
};

export default Checkbox;