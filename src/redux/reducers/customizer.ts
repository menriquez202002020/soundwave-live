import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Customizer } from '../../common/types'

export interface CustomizerState {
  customizer: Customizer
  appLayoutState: string
}

const initialState: CustomizerState = {
  customizer: {
    layout: 'landscape',
    backgroundImage: '/src/assets/img/layout-background.jpeg'
  },
  appLayoutState: 'Desktop'
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
    },
    changeLayoutState: (state: CustomizerState) => {
      console.log(window.innerWidth <= 768 ? 'Mobile' : 'Desktop')
      state.appLayoutState = window.innerWidth <= 768 ? 'Mobile' : 'Desktop'
    }
  }
})

export const { changeLayout, changeBackgroundImage, changeLayoutState } = customizerSlice.actions

export default customizerSlice.reducer
