import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Audio, Frame, Size } from '../../common/types'

export interface CheckoutState {
  audio: Audio
  material: {
    frame: Frame
    size: Size
  }
}

const initialState: CheckoutState = {
  audio: {
    file: null,
    name: ''
  },
  material: {
    frame: {
      title: '',
      value: '',
      image: ''
    },
    size: {
      inch: '',
      cm: '',
      title: ''
    }
  }
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setAudio: (state: CheckoutState, action: PayloadAction<Audio>) => {
      state.audio = action.payload
    },
    setMaterialFrame: (state: CheckoutState, action: PayloadAction<Frame>) => {
      state.material.frame = action.payload
    },
    setMaterialSize: (state: CheckoutState, action: PayloadAction<Size>) => {
      state.material.size = action.payload
    }
  }
})

export const { setAudio, setMaterialFrame, setMaterialSize } = checkoutSlice.actions

export default checkoutSlice.reducer
