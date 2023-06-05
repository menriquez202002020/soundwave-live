import React, { useState } from 'react'
import './RadioButtonToggle.css'

interface ToggleButtonProps {
  options: Array<{ value: string, image: string, title: string }>
  handleFrameSelection: (value: string) => void
}

const RadioButtonToggle: React.FC<ToggleButtonProps> = ({ options, handleFrameSelection }) => {
  const [selectedOption, setSelectedOption] = useState('frame')

  const handleOptionChange = (value: string): any => {
    setSelectedOption(value)
    handleFrameSelection(value)
  }
  return (
    <>
        <div className='frame-type'>
            {options.map((option: any) => (
                <label className={`col-4 frame-selection frame ${selectedOption === option.value && 'active'}`} key={option.value}>
                <input
                    type="radio"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={() => handleOptionChange(option.value)}
                />
                <img src={option.image} alt={option.value} />
                <span>{option.title}</span>
                </label>
            ))}
        </div>
    </>
  )
}

export default RadioButtonToggle
