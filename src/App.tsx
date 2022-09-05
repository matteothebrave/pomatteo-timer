import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
// import { defaultDark } from "./styles/themes/defaultDark";
export function App() {
  return (
    // Here is where you switch the theme from styles/themes/default.ts (DONT FORGET TO IMPORT)
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
