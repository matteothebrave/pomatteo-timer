import 'styled-components'
import { defaultTheme } from '../styles/themes/default'
import { defaultDark } from '../styles/themes/defaultDark'

// this is the main exportion of theme
type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
