import React, { useState } from 'react'
import './LayoutSizing.scss'

interface ToggleButtonProps {
  options: Array<{ size_inc: string, size_cm: string, title: string }>
  handleSizingSelection: (value: string) => void
}
const LayoutSizing: React.FC<ToggleButtonProps> = ({ options, handleSizingSelection }) => {
  const [selectedOption, setSelectedOption] = useState('Small')

  const handleOptionChange = (value: string): any => {
    setSelectedOption(value)
    handleSizingSelection(value)
  }
  return (
    <>
      <div className='sizing-container'>
          {options.map((option: any) => (
            <label className={`col-6 frame-selection ${selectedOption === option.title ? 'active' : ''}`} key={option.title}>
              <span className='custom-select'></span>
              <input
                  type="radio"
                  value={option.title}
                  checked={selectedOption === option.title}
                  onChange={() => handleOptionChange(option.title)}
              />
              <p>{option.title}</p>
              <span>{option.size_inc}</span>
              <span>{option.size_cm}</span>
            </label>
          ))}
      </div>
    </>
  )
}

export default LayoutSizing
