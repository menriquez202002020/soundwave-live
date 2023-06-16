import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Template } from '../../common/types'

export interface TemplatesState {
  templates: Template[]
}

const initialState: TemplatesState = {
  templates: []
}

export const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    load: (state: TemplatesState, action: PayloadAction<Template[]>) => {
      state.templates = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { load } = templatesSlice.actions

export default templatesSlice.reducer
