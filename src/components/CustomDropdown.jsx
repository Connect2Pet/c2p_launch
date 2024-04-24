import React from "react";

const Dropdown = React.forwardRef(
  ({ label, options, value, onChange, classNames, disabled }, ref) => {
    return (
      <div className="w-full gap-2 text-center">
        <label className="flex flex-col items-center justify-center w-full gap-4">
          {label}
          <select
            disabled={disabled}
            name="profileType"
            value={value}
            required
            onChange={onChange}
            ref={ref} // Attach the forwarded ref to the select element
            aria-label="Profile Type" // Clear label for screen readers
            aria-required="true" // Indicates that the field is required
            className={`w-full max-w-xs p-3 rounded-lg bg-slate-600  ${classNames}`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
);

export default Dropdown;
