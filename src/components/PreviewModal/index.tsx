import React, { useEffect } from 'react'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setShowPreviewModal } from '../../redux/reducers/controls'
import type { RootState } from '../../redux/store'
import { setSelectedThumbnail } from '../../redux/reducers/selected'

const PreviewModal: React.FC = () => {
  const dispatch = useDispatch()
  const { showPreviewModal } = useSelector((state: RootState) => state.controls.controls)
  const { selected } = useSelector((state: RootState) => state.selected)

  useEffect(() => {
    if (showPreviewModal) {
      dispatch(setShowPreviewModal(true))
    }
  }, [showPreviewModal])

  const onAnimationEnd = (): void => {
    if (!showPreviewModal) {
      dispatch(setShowPreviewModal(false))
    }
  }

  const updateSelectedThumbnail = (thumbnail: any): void => {
    dispatch(setSelectedThumbnail(thumbnail))
  }

  return (
    <>
      {showPreviewModal && (
        <div className={`modal ${showPreviewModal ? 'is-visible' : ''}`} onAnimationEnd={onAnimationEnd}>
          <div className="modal-overlay" onClick={() => { dispatch(setShowPreviewModal(false)) }}></div>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <span className="title">Preview</span>
                <button onClick={() => { dispatch(setShowPreviewModal(false)) }} className="close-button">
                  <img className="icon" src='/src/assets/icons/close.png' />
                </button>
              </div>
              <div className="modal-body">
                <div className="image-wrapper">
                  <img className="image" src={selected.template.selectedThumbnail.image} alt="" />
                  <div className="colors-container">
                    <div className="color-box active"></div>
                    <div className="color-box"></div>
                    <div className="color-box"></div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                { selected.template.thumbnails.map(thumbnail => (
                  <div onClick={() => { updateSelectedThumbnail(thumbnail) }} className="card" key={thumbnail.id}>
                    <img className={`thumbnail ${thumbnail.selected === true ? 'active' : ''}`} src={thumbnail.image} alt="" />
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  )
}

export default PreviewModal
