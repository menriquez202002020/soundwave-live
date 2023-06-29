import './styles/main.scss'
import { Customizer } from './pages/customizer/customizer'
import React, { useEffect } from 'react'
import fontsData from './data/fonts.json'

const App: React.FC = () => {
  useEffect(() => {
    const loadFonts = async (): Promise<void> => {
      try {
        await Promise.all(fontsData.map((font): string => {
          const fontFace = new FontFace(font.code, `url(${font.path})`)
          void fontFace.load().then((): void => {
            document.fonts.add(fontFace)
          })
          return font.code
        }))
      } catch (error) {
        console.error('Failed to load fonts:', error)
      }
    }
    void loadFonts()
  }, [])
  return (
    <>
      <Customizer />
    </>
  )
}
export default App
