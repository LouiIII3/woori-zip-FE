import React from 'react'
import './TrueFalseButton.css'

const TrueFalseButton = ({ options, name, selectedValue, onChange }) => {
  return (
    <div className="btn-container">
      {options.map((option, index) => (
        <div key={`${name}-${index}`} className="form_radio_btn">
          <input
            id={`${name}-${index}`}
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <label htmlFor={`${name}-${index}`}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TrueFalseButton;