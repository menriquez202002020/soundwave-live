import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Canvas } from '../../common/types'

const initialState: Canvas = {
  id: '',
  orientation: 'landscape',
  frameType: 'Frame',
  size: 'Small',
  totalPrice: 0,
  content: {
    title: '',
    subtitle: ''
  },
  specifications: {
    audioBuffer: null,
    waveHeight: 0,
    width: 0,
    height: 0
  }
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.content.title = action.payload
    },
    updateOrientation: (state, action: PayloadAction<string>) => {
      state.orientation = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateTitle, updateOrientation } = canvasSlice.actions

export default canvasSlice.reducer
