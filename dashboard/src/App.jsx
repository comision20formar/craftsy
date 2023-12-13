import { Outlet } from 'react-router-dom'
import './assets/css/app.css'
import { SideBar } from './components/SideBar'
import { TopBar } from './components/TopBar'
import { Footer } from './components/Footer'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function App() {
  const [show, setShow] = useState(-250);

  return (
    <Row>
      <SideBar  show={show} setShow={setShow}/>
      <Col sm={12}>
      <TopBar setShow={setShow}/>
      
      </Col>
      <Col sm={12}>
      <Container>
      <Outlet/>
      </Container>
      </Col>
      <Col>
      <Footer />
      </Col>
      </Row>
  )
}

export default App
