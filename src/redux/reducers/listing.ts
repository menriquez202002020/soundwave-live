import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Listing, Frame, Size, Color } from '../../common/types'

export interface ListingState {
  listing: Listing
}

const initialState: ListingState = {
  listing: {
    frames: [],
    sizes: [],
    colors: []
  }
}

export const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    setFrames: (state: ListingState, action: PayloadAction<Frame[]>) => {
      state.listing.frames = action.payload
    },
    setSizes: (state: ListingState, action: PayloadAction<Size[]>) => {
      state.listing.sizes = action.payload
    },
    setColors: (state: ListingState, action: PayloadAction<Color[]>) => {
      state.listing.colors = action.payload
    }
  }
})

export const { setFrames, setSizes, setColors } = listingSlice.actions

export default listingSlice.reducer
