import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Template, Selected, Frame, Size, Color } from '../../common/types'
import type { Product } from 'shopify-buy'

export interface SelectedState {
  selected: Selected
}

const initialState: SelectedState = {
  selected: {
    product: null,
    frame: {
      value: 'frame',
      image: 'src/assets/img/frame.png',
      title: 'Frame'
    },
    size: {
      key: '8x10',
      inch: '8x10 inch',
      cm: '20.32 x 25.4 cm',
      title: 'Small'
    },
    color: {
      id: 1,
      key: 'option_0',
      image: 'src/assets/img/first.png',
      view: 'desktop'
    },
    template: {
      id: 1,
      image: '/src/assets/img/frames/frame-1.png',
      selected: true,
      previewImage: '',
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
          name: 'Josefin sans',
          code: 'JosefSans-R'
        }
      ],
      selectedThumbnail: {
        id: 1,
        image: '/src/assets/img/previews/preview-3.jpg',
        imagePosition: {
          height: '160px',
          width: '228px',
          top: '294px',
          left: '101px'
        }
      },
      thumbnails: [
        {
          id: 1,
          image: '/src/assets/img/previews/preview-3.jpg',
          imagePosition: {
            height: '160px',
            width: '228px',
            top: '294px',
            left: '101px'
          }
        },
        {
          id: 2,
          image: '/src/assets/img/previews/preview-1.jpg',
          imagePosition: {
            height: '101px',
            width: '143px',
            top: '177px',
            left: '108px'
          }
        },
        {
          id: 3,
          image: '/src/assets/img/previews/preview-2.jpg',
          imagePosition: {
            height: '196px',
            width: '139px',
            top: '125px',
            left: '171px'
          }
        },
        {
          id: 4,
          image: '/src/assets/img/previews/preview-3.jpg',
          imagePosition: {
            height: '160px',
            width: '228px',
            top: '294px',
            left: '101px'
          }
        }
      ]
    }
  }
}

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setProduct: (state: SelectedState, action: PayloadAction<Product>) => {
      state.selected.product = action.payload
    },
    setFrame: (state: SelectedState, action: PayloadAction<Frame>) => {
      state.selected.frame = action.payload
    },
    setSize: (state: SelectedState, action: PayloadAction<Size>) => {
      state.selected.size = action.payload
    },
    setColor: (state: SelectedState, action: PayloadAction<Color>) => {
      state.selected.color = action.payload
    },
    setTemplate: (state: SelectedState, action: PayloadAction<Template>) => {
      const template = action.payload
      state.selected.template.selectedThumbnail = template.thumbnails[0]
      state.selected.template = template
    },
    setSelectedThumbnail: (state: SelectedState, action: PayloadAction<any>) => {
      const thumbnailPayload = action.payload
      state.selected.template.thumbnails.map(thumbnail => {
        thumbnail.selected = thumbnailPayload.id === thumbnail.id
        return thumbnail
      })
      state.selected.template.selectedThumbnail = thumbnailPayload
    },
    setPreviewImage: (state: SelectedState, action: PayloadAction<string>) => {
      state.selected.template.previewImage = action.payload
    }
  }
})

export const { setProduct, setFrame, setSize, setColor, setTemplate, setSelectedThumbnail, setPreviewImage } = selectedSlice.actions

export default selectedSlice.reducer
