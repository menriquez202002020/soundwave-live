import React, { useEffect, useRef } from 'react'

interface CanvasProps {
  id: string
  audioBuffer: AudioBuffer
  waveHeight: number
  width: number
  height: number
}
/* eslint max-len: ['error', { 'code': 280 }] */
const WaveCanvas: React.FC<CanvasProps> = ({ id, waveHeight, audioBuffer, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(
    () => {
      if (audioBuffer === null) {
        return
      }
      const canvas = canvasRef.current
      const channelData = audioBuffer.getChannelData(0)
      const step = Math.ceil(channelData.length / width)
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
        width,
        height
      )
      // Set the fill color to black
      context.fillStyle = '#000'
      context.beginPath()
      for (let val = 0; val < width; val += 0.75) {
        const sum = channelData.slice(
          val * step,
          (val + 1) * step
        ).reduce(
          (aa, bb) => aa + Math.abs(bb),
          0
        )
        const avg = sum / (step * 7)
        // Adjust the height
        const barHeight = avg * height * waveHeight
        const xxx = val
        const yyy = height / 2 - barHeight / 2
        context.fillRect(
          xxx,
          yyy,
          1,
          barHeight + 2
        )
      }
    },
    [waveHeight, audioBuffer, width, height]
  )

  return (
    <>
      <canvas id={id} ref={canvasRef} width={width} height={height} />
    </>
  )
}

export default WaveCanvas
