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
    },
    setSelectedTemplate: (state: TemplatesState, action: PayloadAction<Template>) => {
      const newTemplate: Template[] = []

      state.templates.map(template => {
        if (template.id === action.payload.id) {
          template.selected = true
        } else {
          template.selected = false
        }

        newTemplate.push(template)
        return newTemplate
      })

      state.templates = newTemplate
    }
  }
})

// Action creators are generated for each case reducer function
export const { load, setSelectedTemplate } = templatesSlice.actions

export default templatesSlice.reducer
