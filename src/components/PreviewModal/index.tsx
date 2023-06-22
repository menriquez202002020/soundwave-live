import React, { useEffect } from 'react'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setShowPreviewModal } from '../../redux/reducers/controls'
import type { RootState } from '../../redux/store'

const PreviewModal: React.FC = () => {
  const dispatch = useDispatch()
  const { showPreviewModal } = useSelector((state: RootState) => state.controls.controls)

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
                  <img className="image" src="/src/assets/img/frames/frame-1.png" alt="" />
                  <div className="colors-container">
                    <div className="color-box active"></div>
                    <div className="color-box"></div>
                    <div className="color-box"></div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="card">
                  <img className="thumbnail-active" src="/src/assets/img/frames/frame-1.png" alt="" />
                </div>
                <div className="card">
                  <img className="thumbnail" src="/src/assets/img/frames/frame-1.png" alt="" />
                </div>
                <div className="card">
                  <img className="thumbnail" src="/src/assets/img/frames/frame-1.png" alt="" />
                </div>
                <div className="card">
                  <img className="thumbnail" src="/src/assets/img/frames/frame-1.png" alt="" />
                </div>
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
