import React, { useEffect } from 'react'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../redux/store'
import { setFrames } from '../../redux/reducers/listing'
import { setIsContinueDisabled } from '../../redux/reducers/controls'
import type { Product } from 'shopify-buy'
import { setProduct } from '../../redux/reducers/selected'
import { setTotalPrice } from '../../redux/reducers/checkout'

const FrameOptions: React.FC = () => {
  const { selected } = useSelector((state: RootState) => state.selected)
  const { products } = useSelector((state: RootState) => state.products)
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

  const setSelectedFrame = (product: Product): void => {
    dispatch(setProduct(product))
    dispatch(setIsContinueDisabled(false))

    const payload = {
      product: selected.product,
      size: selected.size
    }

    dispatch(setTotalPrice(payload))
  }

  useEffect(() => {
    fetchFrames()
  }, [])

  return (
    <div className='frame-type'>
      { products.map((product: any) => (
          <label className={`col-4 frame-selection frame ${(selected.product !== null && selected.product.id === product.id) ? 'active' : ''}`} key={product.id}>
          <span className='custom-select'></span>
          <input
              type="radio"
              value={product.hande}
              checked={(selected.product.id === product.id)}
              onChange={() => { setSelectedFrame(product) }}
          />
          <img src={product.images[0].src} alt={product.images[0].altText} />
          <span>{product.title}</span>
          </label>
      ))
      }
    </div>
  )
}

export default FrameOptions
