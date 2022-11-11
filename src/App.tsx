import { ThemeProvider } from 'styled-components'
import { dark } from './styles/themes/dark'
import { light } from './styles/themes/light'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
// import { defaultDark } from "./styles/themes/defaultDark";

export function App() {
  return (
    // Here is where you switch the theme from styles/themes/default.ts (DONT FORGET TO IMPORT)
    // https://www.youtube.com/watch?v=ngVU74daJ8Y Watch it to implement the Switcher
    <ThemeProvider theme={dark}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
