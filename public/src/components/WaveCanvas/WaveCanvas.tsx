import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
interface WaveCanvasInterface {
  id: string
}

/* eslint max-len: ['error', { 'code': 280 }] */
const WaveCanvas: React.FC<WaveCanvasInterface> = ({ id }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { specifications } = useSelector((state: RootState) => state.canvas)

  useEffect(
    () => {
      console.log(specifications)
      if (specifications.audioBuffer === null) {
        return
      }
      const canvas = canvasRef.current
      const channelData = specifications.audioBuffer.getChannelData(0)
      const step = Math.ceil(channelData.length / specifications.width)
      if (canvas === null) {
        return
      }
      const context = canvas.getContext('2d')
      if (context === null) {
        return
      }
      context.clearRect(
        0,
        0,
        specifications.width,
        specifications.height
      )
      // Set the fill color to black
      context.fillStyle = id === 'main-canvas' ? '#FFFFFF' : '#000'
      context.beginPath()
      for (let val = 0; val < specifications.width; val += 0.75) {
        const sum = channelData.slice(
          val * step,
          (val + 1) * step
        ).reduce(
          (aa: number, bb: number) => aa + Math.abs(bb),
          0
        )
        const avg = sum / (step * 7)
        // Adjust the height
        const barHeight = avg * specifications.height * specifications.waveHeight
        const xxx = val
        const yyy = specifications.height / 2 - barHeight / 2
        context.fillRect(
          xxx,
          yyy,
          1,
          barHeight + 2
        )
      }
    },
    [specifications.waveHeight, specifications.audioBuffer, specifications.width, specifications.height]
  )

  return (
    <>
      <canvas id={id} ref={canvasRef} width={specifications.width} height={specifications.height} />
    </>
  )
}

export default WaveCanvas
