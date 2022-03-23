/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import WarningModal from "../modals/WarningModal";
import PrivacyPoliticsModal from "../modals/PrivacyPoliticsModal";
import ConfirmationLoginModal from "../modals/ConfirmationLoginModal";
import { registerUser } from "../../requests/Authentication";
import { useNavigate } from "react-router-dom";

export default function RegisterBox() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [samePassword, setSamePassword] = useState("");
  const [completed, setCompleted] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showUsingEmail, setShowUsingEmail] = useState(false);
  const [showServerError, setShowServerError] = useState(false);
  const [showShortPassword, setShowShortPassword] = useState(false);
  const [showRegisterCompleted, setShowRegisterCompleted] = useState(false);
  const [user, setUser] = useState({});

  const SubmitData = async () => {
    const newUser = { email: email, nome: name, password: password };
    const user = registerUser(newUser, {
      setShowShortPassword: () => setShowShortPassword(true),
      setShowUsingEmail: () => setShowUsingEmail(true),
      setShowServerError: () => setShowServerError(true),
    });
    if(user) {
      setUser(user);
      setShowRegisterCompleted(true);
    }
  };

  useEffect(() => {
    let completed = false;
    if (name && email && password && samePassword) {
      completed = true;
    }
    if (password !== samePassword) {
      completed = false;
    }
    setCompleted(completed);
  }, [name, email, password, samePassword]);

  return (
    <>
      <Container
        style={{ textAlign: "center", maxWidth: 525, zIndex: "inherit" }}
      >
        <Container className="RegisterBox" style={{ padding: "3% 5%" }}>
          <Form
            className="formContainer"
            onSubmit={(e) => {
              e.preventDefault();
              SubmitData();
            }}
          >
            <h2 className="BlueH2" style={{ textAlign: "center" }}>
              Preencha os campos abaixo
            </h2>
            <p style={{ textAlign: "center" }}>É rápido, simples e seguro</p>
            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="lg"
                type="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formText">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formSamePassword">
              <Form.Label>Confirmação de senha</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                defaultValue={samePassword}
                onChange={(e) => setSamePassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="d-grid gap-2"
              style={{ marginTop: 30 }}
              controlId="formButton"
            >
              <Button
                className="LoginButton"
                type="submit"
                size="lg"
                disabled={!completed}
              >
                <h3 className="ButtonWhiteText"> Continuar </h3>
              </Button>
            </Form.Group>
          </Form>
        </Container>
        <p>
          Ao assinar você concorda com os{" "}
          <a
            href="#"
            style={{ color: "#4A4A4A" }}
            onClick={() => setShowPrivacy(true)}
          >
            termos de serviço
          </a>{" "}
          e{" "}
          <a
            href="#"
            style={{ color: "#4A4A4A" }}
            onClick={() => setShowPrivacy(true)}
          >
            politica de privacidade
          </a>
        </p>
      </Container>
      <ConfirmationLoginModal
        show={showRegisterCompleted}
        handleClose={() => setShowRegisterCompleted(false)}
        user={user}
      />

      <PrivacyPoliticsModal
        show={showPrivacy}
        handleClose={() => setShowPrivacy(false)}
      />

      <WarningModal
        show={showUsingEmail}
        title="Email Utilizado"
        mensage="Este email já está sendo utilizado por outra conta, por favor, utilize outro email para se cadastrar ou faça login com o email em questão"
        handleClose={() => setShowUsingEmail(false)}
      />

      <WarningModal
        show={showServerError}
        title="Erro no Servidor"
        mensage="Ocorreu algum erro no servidor, por favor, tente novamente"
        handleClose={() => setShowServerError(false)}
      />

      <WarningModal
        show={showShortPassword}
        title="Senha muito curta"
        mensage="A senha que você escolheu é muito curta, por favor substitua para uma senha maior"
        handleClose={() => setShowShortPassword(false)}
      />
    </>
  );
}
