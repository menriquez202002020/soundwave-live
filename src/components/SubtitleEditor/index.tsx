import React, { type MouseEventHandler, useEffect, useState } from 'react'
import './index.scss'
import type { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { updateSubtitle } from '../../redux/reducers/canvas'
import { toggleSubtitleEditor, toggleTitleEditor, setShowtitleSaved } from '../../redux/reducers/controls'

const TitleEditor: React.FC = () => {
  const [hasUpdate, setHasUpdate] = useState<boolean>(false)
  const { subtitle } = useSelector((state: RootState) => state.canvas.content)
  const { template } = useSelector((state: RootState) => state.selected.selected)
  const { controls } = useSelector((state: RootState) => state.controls)
  const dispatch = useDispatch()

  const update = (param: any): void => {
    const newVal = {
      ...subtitle,
      [param.key]: param.value
    }

    dispatch(updateSubtitle(newVal))
    setHasUpdate(true)
  }

  useEffect(() => {
    const showAlert = setTimeout(() => {
      if (!hasUpdate) {
        return
      }
      dispatch(setShowtitleSaved(true))
      setTimeout(() => {
        dispatch(setShowtitleSaved(false))
      }, 2000)
    }, 1500)

    return () => { clearTimeout(showAlert) }
  }, [subtitle])

  const handleCloseTitleCustomization: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement
    const classList = Array.from(target.classList)
    const filteredClassList = classList.filter((element: string) => {
      const canvasClass = ['group-input', 'form-input', 'select-input', 'control-label', 'form-container', 'group-half']
      return canvasClass.includes(element)
    })

    if (controls.showTitleEditor) {
      dispatch(toggleTitleEditor(filteredClassList.length > 0))
    }

    if (controls.showSubtitleEditor) {
      dispatch(toggleSubtitleEditor(filteredClassList.length > 0))
    }
  }

  return (
    <div onClick={handleCloseTitleCustomization} className="sidecontainer">
      <div className="title-container">
        <div className="title">Subtitle Customization</div>
        <div className="subtitle">Style subtitle of your soundwave art</div>
      </div>
      <div className="form-container">
        {/* Title text */}
        <div className="group-input">
          <label htmlFor="title" className="control-label">Title</label>
          <input value={subtitle.text} onChange={(e) => { update({ key: 'text', value: e.target.value }) }} type="text" className="form-input" placeholder='ENTER YOUR TITLE' />
        </div>
        {/* Font family */}
        <div className="group-input">
          <label htmlFor="fontFamily" className="control-label">Font family</label>
          <select value={subtitle.family} onChange={(e) => { update({ key: 'family', value: e.target.value }) }} name="fontFamily" id="fontFamily" className="select-input">
            {
              template.fonts.map(font => (
                <option key={font.id} value={font.name}>{font.name}</option>
              ))
            }
          </select>
        </div>
        <div className="group-half">
          {/* Font weight */}
          <div className="group-input">
            <label htmlFor="fontWeight" className="control-label">Font Weight</label>
            <select value={subtitle.weight} onChange={(e) => { update({ key: 'weight', value: e.target.value }) }} name="fontWeight" id="fontWeight" className="select-input">
              <option value="300">Light</option>
              <option value="500">Normal</option>
              <option value="600">Semibold</option>
              <option value="800">Bold</option>
            </select>
          </div>

          {/* Font size */}
          <div className="group-input">
            <label htmlFor="fontSize" className="control-label">Font Size</label>
            <select value={subtitle.size} onChange={(e) => { update({ key: 'size', value: e.target.value }) }} name="fontSize" id="fontSize" className="select-input">
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="18">18</option>
              <option value="24">24</option>
              <option value="26">26</option>
              <option value="28">28</option>
              <option value="32">32</option>
              <option value="56">56</option>
            </select>
          </div>
        </div>
      </div>
      { controls.showTitleSaved &&
        <div className="message-container">
          <div className="message-box"><img src="/src/assets/icons/check-ring-green.png" alt="" />Changes saved</div>
        </div>
      }
    </div>
  )
}

export default TitleEditor
