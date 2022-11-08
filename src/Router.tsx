import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { End } from './pages/End'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout/Index'

export function Router() {
  return (
    <Routes>
      {/* ELEMENT = PAGE */}
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/History" element={<History />} />
        <Route path="/End" element={<End />} />
      </Route>
    </Routes>
  )
}
