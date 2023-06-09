import React, { useState } from 'react'
import ColorTemplate from '../ColorTemplate/ColorTemplate'
import { initialState } from './../InitialState/InitialState'
import WaveCanvas from '../WaveCanvas/WaveCanvas'
import './Canvas.css'

interface CanvasProps {
  id: string
  audioBuffer: AudioBuffer
  waveHeight: number
  width: number
  height: number
}

const Canvas: React.FC<CanvasProps> = ({ id, waveHeight, audioBuffer, width, height }) => {
  const [selectedColor, setSelectedColor] = useState<string>('Frame')
  const [canvasTitle, setCanvasTitle] = useState<string>('Enter your title')
  const [canvasSubtitle, setCanvasSubtitle] = useState<string>('Enter your subtitle here')
  const [canvasSoundwave, setCanvasSoundwave] = useState<string>('')
  const handleFrameSelection = (value: string): void => {
    setSelectedColor(value)
    console.log(value)
  }
  return (
    <>
      <div className='canvas-component'>
        <div className='canvas-header'>
          <p>Landscape Image Background Template</p><img src='src/assets/icons/header-icon.png' alt='' />
        </div>
        <div className='canvas-content'>
          <div className="canvas-text title">
            <h1>{ canvasTitle }</h1>
          </div>
          <div className="canvas-text subtitle">
            <h1>{ canvasSubtitle }</h1>
          </div>
          <div className="canvas-soundwave">
          <WaveCanvas id={id} waveHeight={waveHeight} audioBuffer={audioBuffer} width={width} height={height} />
          </div>
        </div>
        <div className='canvas-footer desktop'>
          <ColorTemplate options={initialState.colorOptions} handleFrameSelection={handleFrameSelection}/>
        </div>
        <div className='canvas-footer mobile'>
          <ColorTemplate options={initialState.colorOptionsMobile} handleFrameSelection={handleFrameSelection}/>
        </div>
      </div>
    </>
  )
}

export default Canvas
