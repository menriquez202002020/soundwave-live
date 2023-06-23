import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Product } from 'shopify-buy'

export interface ProductState {
  products: Product[]
}

const initialState: ProductState = {
  products: []
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchAllProducts: (state: ProductState, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    }
  }
})

export const { fetchAllProducts } = productSlice.actions

export default productSlice.reducer
