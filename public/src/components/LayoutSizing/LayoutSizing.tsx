import React, { useEffect } from 'react'
import './LayoutSizing.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../redux/store'
import { setSize } from '../../redux/reducers/selected'
import { setSizes } from '../../redux/reducers/listing'

const LayoutSizing: React.FC = () => {
  const { sizes } = useSelector((state: RootState) => state.listing.listing)
  const { size } = useSelector((state: RootState) => state.selected.selected)
  const dispatch = useDispatch()

  const fetchSizes = (): void => {
    fetch('/src/data/sizes.json')
      .then(async (res) => await res.json())
      .then(async (data) => {
        dispatch(setSizes(data))
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchSizes()
  }, [])

  return (
    <div className='sizing-container'>
        {sizes.map((option: any) => (
          <label className={`col-6 frame-selection ${size.title === option.title ? 'active' : ''}`} key={option.title}>
            <span className='custom-select'></span>
            <input
                type="radio"
                value={option.title}
                checked={size.title === option.title}
                onChange={() => { dispatch(setSize(option)) }}
            />
            <p>{option.title}</p>
            <span>{option.size_inc}</span>
            <span>{option.size_cm}</span>
          </label>
        ))}
    </div>
  )
}

export default LayoutSizing
