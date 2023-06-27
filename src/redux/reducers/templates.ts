import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Template } from '../../common/types'

export interface TemplatesState {
  templates: Template[]
  template: Template
}

const initialState: TemplatesState = {
  templates: [],
  template: {
    id: 1,
    image: '/src/assets/img/frames/frame-1.png',
    selected: true,
    title: {
      text: 'Minimalist nature',
      fontSize: '24px',
      fontFamily: 'Arial',
      fontWeight: '800',
      fontColor: 'blue'
    },
    subTitle: {
      text: 'Testing Sub Title 1',
      fontSize: '18px',
      fontFamily: 'Arial',
      fontWeight: '400',
      fontColor: 'red'
    },
    colors: [
      {
        id: 1,
        color: '#F27121'
      },
      {
        id: 2,
        color: '#3D9984'
      },
      {
        id: 3,
        color: '#D6B0FF'
      }
    ],
    fonts: [
      {
        id: 1,
        name: 'Josefin sans'
      }
    ],
    selectedThumbnail: {
      id: 1,
      image: '/src/assets/img/frames/frame-2.png'
    },
    thumbnails: [
      {
        id: 1,
        image: '/src/assets/img/frames/frame-2.png'
      },
      {
        id: 2,
        image: '/src/assets/img/frames/frame-1.png'
      },
      {
        id: 3,
        image: '/src/assets/img/frames/frame-3.png'
      },
      {
        id: 4,
        image: '/src/assets/img/frames/frame-2.png'
      }
    ]
  }
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
          state.template = action.payload
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
