import { HeaderContainer } from './styles'
import logo from '../../assets/logo.svg'
import { Scroll, Star, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="Logo do Tomate" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
        <NavLink to="/records" title="Recordes">
          <Star size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
