import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Controls } from '../../common/types'

export interface ControlsState {
  controls: Controls
}

const initialState: ControlsState = {
  controls: {
    showTemplates: false,
    editBackground: false
  }
}

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    toggleShowTemplates: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.showTemplates = action.payload
    },
    toggleEditBackground: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.editBackground = action.payload
    }
  }
})

export const { toggleShowTemplates, toggleEditBackground } = controlsSlice.actions

export default controlsSlice.reducer
