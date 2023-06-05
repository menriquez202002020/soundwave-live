import React, { useCallback, useRef, useState } from 'react'
import WaveCanvas from './WaveCanvas'

const AudioWaveform: React.FC = () => {
  const widthDefault = 600
  const heightDefault = 400
  const waveDefault = 10
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
  const [canvasWidth, setCanvasWidth] = useState<number>(widthDefault)
  const [canvasHeight, setCanvasHeight] = useState<number>(heightDefault)
  const [waveHeight, setWaveHeight] = useState<number>(waveDefault)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (typeof file === 'undefined') {
      return
    }
    const audioContext = new AudioContext()
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = async () => {
      const arrayBuffer = await file.arrayBuffer()
      const audioBufferData = await audioContext.decodeAudioData(arrayBuffer)
      setAudioBuffer(audioBufferData)
    }
  }

  const handleHeightChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setWaveHeight(Number(event.target.value))
    },
    []
  )

  const handleCanvasResize = useCallback(
    () => {
      const canvas = canvasRef.current
      if (canvas === null) {
        return
      }
      const container = canvas.parentNode as HTMLDivElement
      setCanvasWidth(container.clientWidth)
      setCanvasHeight(container.clientHeight)
      if (audioBuffer !== null) {
        setAudioBuffer(audioBuffer)
      }
    },
    [audioBuffer]
  )

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (typeof file === 'undefined') {
      return
    }
    const reader = new FileReader()
    reader.onload = function (e): void {
      const img = new Image()
      img.onload = function (): void {
        const canvas = document.getElementById('image_canvas') as HTMLCanvasElement
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        const ctx = canvas.getContext('2d')
        if (ctx === null) {
          return
        }
        ctx.drawImage(
          img,
          0,
          0,
          canvasWidth,
          canvasHeight
        )
      }
      img.src = e.target?.result as string
    }
    if (typeof file === 'undefined') {
      return
    }
    reader.readAsDataURL(file)
    if (audioBuffer !== null) {
      setTimeout(
        () => {
          processImageCanvas()
        },
        2500
      )
    }
  }
  const processImageCanvas = useCallback(
    () => {
      const c1 = (document.getElementById('image_canvas') as HTMLCanvasElement).getContext('2d')
      const c2 = document.getElementById('sound_wave') as HTMLCanvasElement
      if (c1 === null || c2 === null) {
        return
      }
      c1.globalCompositeOperation = 'destination-in'
      c1.drawImage(
        c2,
        0,
        0,
        canvasWidth,
        canvasHeight
      )
    },
    [canvasWidth, canvasHeight]
  )

  return (
    <div>
      <div className='button-container'>
        <input type='file' accept='audio/*' onChange={handleFileChange} />
        <input type='file' accept='image/*' onChange={handleImageUpload} />
      </div>
      {audioBuffer !== null && (
        <div>
          <div className='button-container range-container'>
            <label htmlFor='wave_height'>Wave Height</label>
            <input id='wave_height' type='range' min={10} max={30} defaultValue={12} onChange={handleHeightChange} />
          </div>
        </div>)}
      <div className='canvas-container'>
        <div style={{ height: canvasHeight, width: canvasWidth }} onClick={handleCanvasResize}>
          <div>Sound Wave</div>
          {(audioBuffer !== null) &&
            <WaveCanvas id='sound_wave' waveHeight={waveHeight} audioBuffer={audioBuffer} width={canvasWidth} height={canvasHeight} />
          }
        </div>
        <div style={{ height: canvasHeight, width: canvasWidth }} >
          <div>Image</div>
          <canvas id='image_canvas' width={canvasWidth} height={canvasHeight} />
        </div>
      </div>
    </div>
  )
}

export default AudioWaveform
