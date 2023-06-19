import React, { useRef, useState } from 'react'
import './DragAndDropImageInput.css'

interface DragAndDropInputProps {
  onImageChange: (file: File) => void
}

interface DragAndDropInputState {
  isDragging: boolean
}

const DragAndDropImageInput: React.FC<DragAndDropInputProps> = ({ onImageChange }) => {
  const [state, setState] = useState<DragAndDropInputState>({
    isDragging: false
  })
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
      onImageChange(files[0])
    }
    setState({ isDragging: false })
  }

  const handleFileInputClick = (): void => {
    inputRef?.current?.click()
  }

  return (
    <div
      className={`d-d-content drag-and-drop-input ${state.isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleFileInputClick}
    >
      <img src='../src/assets/icons/img-upload.png' alt='' onClick={() => inputRef?.current?.click()} className='plus-icon d-d-content' />
      <input
        className='d-d-content'
        type='file'
        accept='img/*'
        onChange={(event: any) => { onImageChange(event.target.files?.[0]) }}
        hidden
        ref={inputRef}
      />
      <p className='d-d-content' onClick={() => inputRef?.current?.click()}>Upload or drag & drop your image</p>
      <span>JPG, JPEG, PNG - 5MB</span>
    </div>
  )
}

export default DragAndDropImageInput
