import {
  Box,
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import DashLayout from './components/DashLayout'
import './App.css'
const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
  },
})

function App() {

  const p = "black"
  const s = "lightgrey"
  return (
    <ChakraBaseProvider theme={theme} >
      <Routes>
        <Route path="/" className = "root" element={<Layout primary = {p} secondary = {s} />}>
          <Route index element={<Login secondary = {s} />} />
          <Route path="home" element={<DashLayout primary = {p} secondary = {s}/>} >
          </Route>
        </Route>
      </Routes>

    </ChakraBaseProvider>
  )
}

export default App;