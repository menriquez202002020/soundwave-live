import React from 'react'
import './index.scss'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'

export const PreparePreview: React.FC = () => {
  const { customizedImage } = useSelector((state: RootState) => state.checkout)
  const { selected } = useSelector((state: RootState) => state.selected)
  const { imagePosition } = useSelector((state: RootState) => state.selected.selected.template.selectedThumbnail)
  const { height, width, top, left } = imagePosition

  return (
    <div className="preview-container" id="main_container_prepare" style={{
      height: '700px',
      width: '400px',
      position: 'relative',
      backgroundImage: `url(${selected.template.selectedThumbnail.image})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'noo-repeat',
      backgroundSize: 'cover',
      display: 'none'
    }}>
      <img src={customizedImage} className="customized" style={{ position: 'absolute', height, width, top, left }} />
    </div>
  )
}
