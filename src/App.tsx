import React from 'react';
import logo from './logo.svg';
import './App.css';
import { VTKRenderView } from "./Component/VTKRenderView";
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container fluid >
        <Row>
          <Col xs="2">
            <h1>Tmp</h1>
          </Col>
          <Col xs="10">
            <VTKRenderView />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
