import React from 'react';

const Select = ({ options, valueKey, titleKey, allTitle, onSelect, activeKey, value="all" }) => {
  return (
    <select value={value} onChange={onSelect}>
      <option key={allTitle}>{allTitle}</option>
      {options.map((option) => {
        return <option key={option[valueKey]} value={option[valueKey]} disabled={!!option[activeKey]}>{option[titleKey]}</option>
      })}
    </select>
  );
};

export default Select;
