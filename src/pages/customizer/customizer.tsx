import React, { useEffect } from 'react'
import type { MouseEventHandler } from 'react'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { toggleShowTemplates, toggleEditBackground, toggleShowAudioResetConfirmation, setIsContinueDisabled, setShowPreviewModal, setCurrentActiveAccordion, setCurrentStep, setIsPreviewLoading, toggleTitleEditor, toggleSubtitleEditor, setCurrentEditting } from '../../redux/reducers/controls'
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
import { setPreviewImage, setProduct, setSelectedThumbnail } from '../../redux/reducers/selected'
import { changeLayoutState } from '../../redux/reducers/customizer'
import { PreparePreview } from '../../components/PreparePreview'

export const Customizer: React.FC = () => {
  const { controls } = useSelector((state: RootState) => state.controls)
  const { selected } = useSelector((state: RootState) => state.selected)
  const { orientation, audioFile, audioFileName } = useSelector((state: RootState) => state.canvas)
  const { appLayoutState } = useSelector((state: RootState) => state.customizer)
  const dispatch = useDispatch()

  const handleCloseEditLayoutBackground: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement
    const classList = Array.from(target.classList)
    const filteredClassListText = classList.filter((element: string) => {
      const canvasClass = ['group-input', 'form-input', 'select-input', 'control-label', 'form-container', 'group-half']
      return canvasClass.includes(element)
    })
    const filteredClassListCanvas = classList.filter((element: string) => {
      const canvasClass = ['overlay', 'frame-color-selection-img', 'frame-color-selection-input', 'd-d-content']
      return canvasClass.includes(element)
    })
    if (controls.showTitleEditor || controls.showSubtitleEditor) {
      if (controls.showTitleEditor) {
        dispatch(toggleTitleEditor(filteredClassListText.length > 0))
        dispatch(setCurrentEditting(''))
      }

      if (controls.showSubtitleEditor) {
        dispatch(toggleSubtitleEditor(filteredClassListText.length > 0))
        dispatch(setCurrentEditting(''))
      }
    } else {
      dispatch(toggleEditBackground(filteredClassListCanvas.length > 0))
    }
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
      dispatch(setIsContinueDisabled(false))
      dispatch(setCurrentActiveAccordion('2'))
      dispatch(setCurrentStep('order'))
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

  const setCurrentPreviewImage = (): void => {
    const node: HTMLElement | null = document.getElementById('main_container_prepare') as HTMLElement

    node.style.display = 'block'

    html2canvas(node)
      .then(async (canvas) => {
        dispatch(setPreviewImage(canvas.toDataURL()))
        node.style.display = 'none'
        dispatch(setIsPreviewLoading(false))
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

    dispatch(setIsPreviewLoading(true))

    html2canvas(node)
      .then(async (canvas) => {
        dispatch(setCustomizedImage(canvas.toDataURL()))
        node.style.position = 'relative'
        node.style.left = '50%'
        node.style.transform = 'translateX(-50%)'

        const firstThumbnail = selected.template.selectedThumbnail
        dispatch(setSelectedThumbnail(firstThumbnail))

        setTimeout(() => {
          setCurrentPreviewImage()
        }, 500)
      })
      .catch(async (err) => {
        console.log(err)
        dispatch(setIsPreviewLoading(false))
      })

    dispatch(setShowPreviewModal(true))
  }

  useEffect(() => {
    dispatch(changeLayoutState())
    fetchProducts()
  }, [])

  return (
    <>
      <div onClick={handleCloseEditLayoutBackground} className={`template-container ${controls.showTemplates && appLayoutState !== 'Desktop' ? 'mobile-template-container' : ''}`}>
        {
          (!(controls.showTemplates && appLayoutState !== 'Desktop')) &&
          <div className="template-action-container">
            <button onClick={() => dispatch(toggleShowTemplates(true))} className="add-template-button">Template gallery</button>
            <button onClick={() => dispatch(toggleShowTemplates(false))} className="close-template-button"><img src="/src/assets/icons/close.png" alt="" className="icon" /></button>
          </div>
        }
        <div className='col-12 customizer-container' >
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

                    {(!controls.showTemplates && appLayoutState === 'Desktop') &&
                      <div className='input-btns col-12'>
                        <button onClick={handlePreviewClick} className='btn-transparent col-6'>
                          Preview
                        </button>
                        { controls.isContinueDisabled
                          ? <button disabled className='btn disabled col-6'>
                              {controls.currentStep === 'order' ? 'Go to checkout' : 'Continue' }
                            </button>
                          : <button onClick={handleCurrentStep} className='btn btn-primary col-6'>
                              {controls.currentStep === 'order' ? 'Go to checkout' : 'Continue' }
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
          {
            (!controls.showTemplates || appLayoutState === 'Desktop') &&
            <div className={`col-7 canvas-container ${orientation}`}>
              <Canvas />
            </div>
          }
        </div>
      </div>
      {(!controls.showTemplates && appLayoutState !== 'Desktop' && !(controls.showTemplates || controls.showTitleEditor || controls.showSubtitleEditor)) && <div className='mobile-footer input-btns col-12'>
        <button onClick={handlePreviewClick} className='btn-transparent col-6'>
          Preview
        </button>
        { controls.isContinueDisabled
          ? <button disabled className='btn disabled col-6'>
              {controls.currentStep === 'order' ? 'Go to checkout' : 'Continue' }
            </button>
          : <button onClick={handleCurrentStep} className='btn btn-primary col-6'>
              {controls.currentStep === 'order' ? 'Go to checkout' : 'Continue' }
            </button>
        }
      </div>}
      <PreparePreview />
    </>
  )
}
