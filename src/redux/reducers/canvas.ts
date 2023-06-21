import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Canvas, CanvasTitle } from '../../common/types'

const initialState: Canvas = {
  id: '',
  orientation: 'landscape',
  frameType: 'Frame',
  size: 'Small',
  totalPrice: 0,
  content: {
    title: {
      text: 'ENTER YOUR TITLE',
      family: 'Cormorant',
      weight: 500,
      size: 56
    },
    subtitle: {
      text: 'Enter your subtitle here',
      family: 'Arial',
      size: 18,
      weight: 400
    }
  },
  specifications: {
    audioBuffer: null,
    waveHeight: 20,
    width: 350,
    height: 170
  },
  audioFile: null,
  audioFileName: 'No Files Selected'
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    updateTitle: (state: Canvas, action: PayloadAction<CanvasTitle>) => {
      state.content.title = action.payload
    },
    updateSubtitle: (state: Canvas, action: PayloadAction<CanvasTitle>) => {
      state.content.subtitle = action.payload
    },
    updateOrientation: (state, action: PayloadAction<string>) => {
      state.orientation = action.payload
    },
    updateSpecifications: (state, action: PayloadAction<any>) => {
      const data = action.payload

      state.specifications.audioBuffer = data.audio ?? null
      state.specifications.waveHeight = data.waveHeight ?? 20
      state.specifications.width = data.width ?? 350
      state.specifications.height = data.height ?? 170
    },
    setAudioFile: (state, action: PayloadAction<File | null>) => {
      state.audioFile = action.payload
    },
    setAudioFileName: (state, action: PayloadAction<string>) => {
      state.audioFileName = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateTitle, updateSubtitle, updateOrientation, updateSpecifications, setAudioFile, setAudioFileName } = canvasSlice.actions

export default canvasSlice.reducer
