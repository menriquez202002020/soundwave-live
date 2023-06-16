import React, { useEffect } from 'react'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../redux/store'
import { setFrames } from '../../redux/reducers/listing'
import { setFrame } from '../../redux/reducers/selected'

const FrameOptions: React.FC = () => {
  const { listing } = useSelector((state: RootState) => state.listing)
  const { selected } = useSelector((state: RootState) => state.selected)
  const dispatch = useDispatch()

  const fetchFrames = (): void => {
    fetch('/src/data/frames.json')
      .then(async (res) => await res.json())
      .then(async (data) => {
        dispatch(setFrames(data))
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchFrames()
  }, [])

  return (
    <div className='frame-type'>
        {listing.frames.map((option: any) => (
            <label className={`col-4 frame-selection frame ${selected.frame.value === option.value ? 'active' : ''}`} key={option.value}>
            <span className='custom-select'></span>
            <input
                type="radio"
                value={option.value}
                checked={selected.frame.value === option.value}
                onChange={() => { dispatch(setFrame(option)) }}
            />
            <img src={option.image} alt={option.title} />
            <span>{option.title}</span>
            </label>
        ))}
    </div>
  )
}

export default FrameOptions
