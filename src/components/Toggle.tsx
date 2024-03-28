import React, { useState } from "react";

const Toggle = ({ label, defaultChecked, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        checked={checked}
        onChange={handleChange}
      />
      <span className="ml-2 text-white">{label}</span>
    </div>
  );
};

export default Toggle;