import { ThemeProvider } from 'styled-components'
import { dark } from './styles/themes/dark'
import { light } from './styles/themes/light'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CyclesContextProvider } from './contexts/CyclesContext'
// import { defaultDark } from "./styles/themes/defaultDark";

export function App() {
  return (
    // Here is where you switch the theme from styles/themes/default.ts (DONT FORGET TO IMPORT)
    // https://www.youtube.com/watch?v=ngVU74daJ8Y Watch it to implement the Switcher (Atualizando)
   
    <ThemeProvider theme={dark}>
      <BrowserRouter>
        {/* // Need to fix this */}
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>

  )
}
