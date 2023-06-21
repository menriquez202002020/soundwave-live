import type { Filter } from '../common/types'

export const filterItems: Filter[] = [
  {
    id: 1,
    title: 'Style',
    options: [
      {
        id: 1,
        checked: false,
        text: 'Style #1'
      },
      {
        id: 2,
        checked: false,
        text: 'Style #2'
      }
    ]
  },
  {
    id: 2,
    title: 'Theme',
    options: [
      {
        id: 3,
        checked: false,
        text: 'Love'
      },
      {
        id: 4,
        checked: false,
        text: 'Family'
      },
      {
        id: 5,
        checked: false,
        text: 'Holiday'
      },
      {
        id: 6,
        checked: false,
        text: 'Celebrations'
      },
      {
        id: 7,
        checked: false,
        text: 'Motivational'
      }
    ]
  },
  {
    id: 3,
    title: 'Prominent Color',
    options: [
      {
        id: 8,
        checked: false,
        text: 'Red'
      },
      {
        id: 9,
        checked: false,
        text: 'Purple'
      },
      {
        id: 10,
        checked: false,
        text: 'Blue'
      },
      {
        id: 11,
        checked: false,
        text: 'Orange'
      }
    ]
  }
]
