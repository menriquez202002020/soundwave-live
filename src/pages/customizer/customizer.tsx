import React, { useEffect } from 'react'
import type { MouseEventHandler } from 'react'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { toggleShowTemplates, toggleEditBackground, toggleShowAudioResetConfirmation, setIsContinueDisabled, setShowPreviewModal, setCurrentActiveAccordion } from '../../redux/reducers/controls'
import { setAudioFile, updateSpecifications } from '../../redux/reducers/canvas'
import '~/pages/customizer/customizer.scss'
import TitleEditor from '../../components/TitleEditor'
import SubtitleEditor from '../../components/SubtitleEditor'
import PreviewModal from '../../components/PreviewModal'
import html2canvas from 'html2canvas'

// Components
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal'
import Templates from '../../components/Templates'
import Canvas from '../../components/Canvas/Canvas'
import ImageUploadAccordion from '../../components/Accordions/ImageUploadAccordion'
import AudioUploadAccordion from '../../components/Accordions/AudioUploadAccordion'
import MaterialAccordion from '../../components/Accordions/MaterialAccordion'
import OrderReviewAccordion from '../../components/Accordions/OrderReviewAccordion'
import { setAudio, setMaterialFrame, setMaterialSize, setCustomizedImage } from '../../redux/reducers/checkout'
import { fetchAllProducts } from '../../redux/reducers/products'
import config from '../../config'
import Client from 'shopify-buy'
import { setProduct } from '../../redux/reducers/selected'
import { changeLayoutState } from '../../redux/reducers/customizer'

export const Customizer: React.FC = () => {
  const { controls } = useSelector((state: RootState) => state.controls)
  const { selected } = useSelector((state: RootState) => state.selected)
  const { orientation, audioFile, audioFileName } = useSelector((state: RootState) => state.canvas)
  const dispatch = useDispatch()

  const handleCloseEditLayoutBackground: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement
    const classList = Array.from(target.classList)
    const filteredClassList = classList.filter((element: string) => {
      const canvasClass = ['overlay', 'frame-color-selection-img', 'frame-color-selection-input', 'd-d-content']
      return canvasClass.includes(element)
    })
    dispatch(toggleEditBackground(filteredClassList.length > 0))
  }

  const handleConfirmDelete = (): void => {
    const payload = {
      file: null,
      name: ''
    }
    dispatch(setAudio(payload))
    dispatch(setAudioFile(null))
    dispatch(updateSpecifications({ audio: null }))
    dispatch(toggleShowAudioResetConfirmation(false))
    dispatch(setIsContinueDisabled(true))
  }

  const handleCancelDelete = (): void => {
    dispatch(toggleShowAudioResetConfirmation(false))
  }

  const handleCurrentStep = (): void => {
    if (controls.currentStep === 'audio') {
      const payload = {
        file: audioFile,
        name: audioFileName
      }
      dispatch(setAudio(payload))
      dispatch(setIsContinueDisabled(true))
      dispatch(setCurrentActiveAccordion('1'))
    }

    if (controls.currentStep === 'material') {
      dispatch(setMaterialFrame(selected.frame))
      dispatch(setMaterialSize(selected.size))
      dispatch(setIsContinueDisabled(true))
      dispatch(setCurrentActiveAccordion('2'))
    }
  }

  const fetchProducts = (): void => {
    const client = Client.buildClient({
      storefrontAccessToken: config.STOREFRONT_ACCESS_TOKEN,
      domain: config.STOREFRONT_BASE_URL,
      apiVersion: '2023-04'
    })

    client.product.fetchAll()
      .then(async (res) => {
        dispatch(fetchAllProducts(res))
        dispatch(setProduct(res[0]))
      })
      .catch(async (err) => {
        console.log(err)
      })
  }

  const handlePreviewClick = (): void => {
    const node: HTMLElement | null = document.getElementById('canvas-container') as HTMLElement
    node.style.position = 'unset'
    node.style.left = '0'
    node.style.transform = 'unset'

    html2canvas(node)
      .then(async (canvas) => {
        dispatch(setCustomizedImage(canvas.toDataURL()))
        node.style.position = 'relative'
        node.style.left = '50%'
        node.style.transform = 'translateX(-50%)'
      })
      .catch(async (err) => {
        console.log(err)
      })

    dispatch(setShowPreviewModal(true))
  }

  useEffect(() => {
    dispatch(changeLayoutState())
    fetchProducts()
  }, [])

  return (
    <>
      <div className='template-container'>
        <div className="template-action-container">
          <button onClick={() => dispatch(toggleShowTemplates(true))} className="add-template-button">Template gallery</button>
          <button onClick={() => dispatch(toggleShowTemplates(false))} className="close-template-button"><img src="/src/assets/icons/close.png" alt="" className="icon" /></button>
        </div>
        <div className='col-12 customizer-container' onClick={handleCloseEditLayoutBackground}>
          { controls.showTemplates || controls.showTitleEditor || controls.showSubtitleEditor
            ? (
              <div className="col-5 input-container">
                {controls.showTemplates &&
                  <Templates />
                }
                {controls.showTitleEditor &&
                  <TitleEditor />
                }
                {controls.showSubtitleEditor &&
                  <SubtitleEditor />
                }
              </div>
              )
            : <div className='col-5 input-container'>
            { controls.editBackground
              ? (
                  <Accordion defaultActiveKey={['0']} className='main-accordion-layout'>
                    <ImageUploadAccordion eventKey='0' />
                  </Accordion>
                )
              : (
                  <Accordion defaultActiveKey={['0']} activeKey={controls.currentActiveAccordion} className='main-accordion-layout'>
                    {/* Audio Upload Accordion */}
                    <AudioUploadAccordion eventKey='0' />

                    {/* Material Accordion */}
                    <MaterialAccordion eventKey='1' />

                    {/* Order Review Accordion */}
                    <OrderReviewAccordion eventKey='2' />

                    {(!controls.showTemplates) &&
                      <div className='input-btns col-12'>
                        <button onClick={handlePreviewClick} className='btn-transparent col-6'>
                          Preview
                        </button>
                        { controls.isContinueDisabled
                          ? <button disabled className='btn disabled col-6'>
                              Continue
                            </button>
                          : <button onClick={handleCurrentStep} className='btn btn-primary col-6'>
                              Continue
                            </button>
                        }
                      </div>
                    }
                  </Accordion>
                )
            }
            {controls.showRemoveAudioConfirmation
              ? <ConfirmationModal
                  isOpen={controls.showRemoveAudioConfirmation}
                  message="Are you sure you want to remove the audio you uploaded?"
                  subMessage="You will not be able to undo this action."
                  onConfirm={handleConfirmDelete}
                  onCancel={handleCancelDelete}
                  confirmText='Continue'
                  cancelText='Cancel' />
              : null
            }
            {controls.showPreviewModal &&
              <PreviewModal />
            }
          </div>
          }
          {/* Canvas Container */}
          <div className={`col-7 canvas-container ${orientation}`}>
            <Canvas />
          </div>
        </div>
      </div>
    </>
  )
}
