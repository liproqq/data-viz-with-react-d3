import React from 'react';

export const Dropdown = ({ options, id, labelText, selectedValue, onSelectedValueChange }) => (
  <>
    <label for={id}>{labelText}</label>
    <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
      {options.map(({ value, label }) => (
        <option value={value} selected={value === selectedValue}>
          {label}
        </option>
      ))}
    </select>
  </>
);