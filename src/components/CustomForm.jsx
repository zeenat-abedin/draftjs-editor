import { useState } from "react";

function CustomForm({ onEditorChange, customData }) {
  const [inputValue, setInputValue] = useState(customData.inputValue || "");
  const [selectValue, setSelectValue] = useState(
    customData.selectValue || "option1"
  );

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onEditorChange({ inputValue });
  };

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
    onEditorChange({ selectValue: event.target.value });
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <select value={selectValue} onChange={handleSelectChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
}

export default CustomForm;
