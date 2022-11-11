import { HeaderContainer } from './styles'
import logo from '../../assets/logo.svg'
import { Clock, Scroll, Star } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import ReactSwitch from 'react-switch'

export function Header() {
  return (
    <HeaderContainer>
      <div>
     
      </div>
      <img src={logo} alt="Logo do Tomate" />
      <nav>
        <NavLink to="/" title="Timer">
          <Clock size={24} />
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
