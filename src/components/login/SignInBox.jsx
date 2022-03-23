/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import WarningModal from "../modals/WarningModal";
import { logIn } from "../../requests/Authentication";

export default function SignInBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginError, setShowLoginError] = useState(false);

  let navigate = useNavigate();

  const SubmitData = async () => {
    const user = {email: email, password: password};
    const userRes = await logIn(user, () => setShowLoginError(true));
    if(userRes){
      navigate('/schedules');
    } 
  };
  
  return (
    <>
    <Container className="SignInBox" fluid>
      <Form onSubmit={(e) => {
        e.preventDefault();
        SubmitData();
      }}>
        <p className="BlueP" style={{textAlign: "center"}} >Preencha os campos abaixo</p>
        <Form.Group>
          <Form.Label> Email </Form.Label>
          <Form.Control
            size="lg"
            type="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label> Password </Form.Label>
          <Form.Control
            size="lg"
            type="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

          <a href="#" className="LinkToRecover" style={{marginBottom: "12px"}}>
            Esqueceu sua senha?
          </a>

        <Form.Group className="d-grid gap-2" controlId="formButton">
          <Button
            className="LoginButton"
            type="submit"
            size="lg"
            disabled={!(email && password)}
          >
            <h3 className="ButtonWhiteText"> Entrar </h3>
          </Button>
        </Form.Group>
      </Form>
    </Container>
    
    <WarningModal
        show={showLoginError}
        title="Dados Incorretos"
        mensage="E-mail ou senha incorretos! por favor tente novamente"
        handleClose={() => setShowLoginError(false)}
      />

    </>
  );
}
