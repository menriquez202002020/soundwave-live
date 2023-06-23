import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Audio, Frame, Size } from '../../common/types'
import type { Product } from 'shopify-buy'

export interface CheckoutState {
  audio: Audio
  material: {
    frame: Frame
    size: Size
  }
  price: {
    total: number
    code: string
  }
}

export interface PricePayload {
  product: Product | null
  size: Size
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
      key: '',
      inch: '',
      cm: '',
      title: ''
    }
  },
  price: {
    total: 0,
    code: 'USD'
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
    },
    setTotalPrice: (state: CheckoutState, action: PayloadAction<any>) => {
      const payload = action.payload

      if (payload.product !== null) {
        payload.product.variants.map((variant: any) => {
          if (payload.size.key === variant.title) {
            state.price = {
              total: variant.price.amount,
              code: variant.price.currencyCode
            }
          }

          return variant
        })
      }
    }
  }
})

export const { setAudio, setMaterialFrame, setMaterialSize, setTotalPrice } = checkoutSlice.actions

export default checkoutSlice.reducer
