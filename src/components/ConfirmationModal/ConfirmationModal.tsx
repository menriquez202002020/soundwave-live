import React, { useState, useEffect } from 'react'
import './ConfirmationModal.scss'

interface ConfirmationModalProps {
  isOpen: boolean
  message: string
  subMessage: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  subMessage,
  onConfirm,
  onCancel
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleConfirm = (): void => {
    onConfirm()
  }

  const handleCancel = (): void => {
    onCancel()
  }

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  const onAnimationEnd = (): void => {
    if (!isOpen) {
      setIsVisible(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className={`modal ${isVisible ? 'is-visible' : ''}`}
          onAnimationEnd={onAnimationEnd}
        >
          <div className="modal-overlay" onClick={handleCancel}></div>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-center align-items-center">
                <img src='src/assets/icons/info-circle.png' />
              </div>
              <div className="modal-body">
                <p className='modal-title'>{message}</p>
                <p className='modal-subtitle'>{subMessage}</p>
              </div>
              <div className="modal-footer modal-header row">
                <div className="col">
                  <button className="btn btn-light btn-block w-100" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-primary w-100" onClick={handleConfirm}>
                    Confirm
                  </button>
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

export default ConfirmationModal
