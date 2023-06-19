import React, { useEffect } from 'react'
import './ColorTemplate.css'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../redux/store'
import { setColors } from '../../redux/reducers/listing'
import { setColor } from '../../redux/reducers/selected'
import { toggleEditBackground } from '../../redux/reducers/controls'

interface ToggleButtonProps {
  view: string
}

const ColorTemplate: React.FC<ToggleButtonProps> = ({ view = 'desktop' }) => {
  const { colors } = useSelector((state: RootState) => state.listing.listing)
  const { color } = useSelector((state: RootState) => state.selected.selected)
  const dispatch = useDispatch()

  const fetchColors = (): void => {
    fetch('/src/data/colors.json')
      .then(async (res) => await res.json())
      .then(async (data) => dispatch(setColors(data)))
      .catch(err => {
        console.log(err)
      })
  }

  const handleOptionChange = (option: any): void => {
    dispatch(setColor(option))
    dispatch(toggleEditBackground(true))
  }

  useEffect(() => {
    fetchColors()
  }, [])

  return (
    <>
        <div className='template-color'>
            {colors.map((option) => {
              return view === option.view
                ? <label className={`col-3 frame-color-selection frame-color ${option.view} ${color.id === option.id ? 'active' : ''}`} key={option.id}>
                    <input
                      className='frame-color-selection-input'
                      type="radio"
                      value={option.key}
                      checked={color.id === option.id}
                      onChange={() => { handleOptionChange(option) }} />
                    <img className='frame-color-selection-img' src={option.image} alt={option.key} />
                </label>
                : null
            })}
        </div>
    </>
  )
}

export default ColorTemplate
