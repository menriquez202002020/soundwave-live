import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Customizer } from '../../common/types'

export interface CustomizerState {
  customizer: Customizer
}

const initialState: CustomizerState = {
  customizer: {
    layout: 'landscape',
    backgroundImage: '/src/assets/img/layout-background.jpeg'
  }
}

export const customizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    changeLayout: (state: CustomizerState, action: PayloadAction<string>) => {
      state.customizer.layout = action.payload
    },
    changeBackgroundImage: (state: CustomizerState, action: PayloadAction<string>) => {
      state.customizer.backgroundImage = action.payload
    }
  }
})

export const { changeLayout, changeBackgroundImage } = customizerSlice.actions

export default customizerSlice.reducer
