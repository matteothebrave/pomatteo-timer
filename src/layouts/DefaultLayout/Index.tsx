import { Header } from '../../components/Header'
import { Outlet } from 'react-router-dom'
import { LayoutCointainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutCointainer>
      <Header />
      <Outlet />
    </LayoutCointainer>
  )
}
