import { Button } from "./components/Button";
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global'
export function App() {
    return  (
        // Here is where you switch the theme from styles/themes/default.ts (DONT FORGET TO IMPORT)
      <ThemeProvider theme={defaultTheme}>
        <Button variant="primary"/>
        <Button variant="secondary"/>
        <Button variant="success"/>
        <Button variant="danger"/>
        <Button />

        <GlobalStyle />
        </ThemeProvider>
    )
}
