import React, { useRef, useState } from 'react'
import { type RootState } from '../../redux/store'
import './DragAndDropInput.scss'
import { useSelector } from 'react-redux'

interface DragAndDropInputProps {
  onFileChange: (file: File) => void
}

interface DragAndDropInputState {
  isDragging: boolean
}

const DragAndDropInput: React.FC<DragAndDropInputProps> = ({ onFileChange }) => {
  const [state, setState] = useState<DragAndDropInputState>({
    isDragging: false
  })
  const { appLayoutState } = useSelector((state: RootState) => state.customizer)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (event: React.DragEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setState({ isDragging: true })
  }

  const handleDragLeave = (event: React.DragEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setState({ isDragging: false })
  }

  const handleDrop = (event: React.DragEvent<HTMLInputElement>): void => {
    event.preventDefault()
    const { files } = event.dataTransfer
    if (files.length > 0) {
      onFileChange(files[0])
    }
    setState({ isDragging: false })
  }

  const handleClick = (): void => {
    if (inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  return (
    <div
      className={`drag-and-drop-input ${state.isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <img src='../src/assets/icons/svg/add-circle-dark.svg' alt='' onClick={handleClick} className='plus-icon' />
      <input
        type='file'
        accept='audio/*'
        onChange={(event: any) => { onFileChange(event.target.files?.[0]) }}
        hidden
        ref={inputRef}
      />
      <p onClick={handleClick}>Click to upload { appLayoutState === 'Desktop' ?? <span className='drag-drop-title-light'>or drag & drop</span> }</p>
      <span className='drag-drop-subtitle'>MP3, MP4  &middot;  10MB</span>
    </div>
  )
}

export default DragAndDropInput
