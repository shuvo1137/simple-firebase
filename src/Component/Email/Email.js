import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Email.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../Firebase/firebase.init";

const Email = () => {
  const auth = getAuth(app);
  const [validated, setValidated] = useState(false);
  const [registered, SetRegistered] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [clickedRegister, setClickedRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handlRegisterButton() {
    setClickedRegister(!clickedRegister);
  }
  function handleCheckBox(event) {
    console.log(event.target.checked);
    SetRegistered(event.target.checked);
  }
  function handleEmailBlur(e) {
    setEmail(e.target.value);
  }
  function handlePasswordBlur(e) {
    setPassword(e.target.value);
  }
  const formSubmission = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[A-Z])/.test(password)) {
      setError("Password should contain atleast one captital letter");
      return;
    }
    setValidated(true);
    setError("");
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          emailVerification();
          setSuccess("Create account successfully");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(`email :${email}  pass: ${password}`);
    }
  };

  function emailVerification() {
    sendEmailVerification(auth.currentUser).then(() =>
      console.log("email verification has been sent")
    );
  }
  function passwordReset() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("reset email sent");
      })
      .catch((error) => {
        const errormessege = error.message;
        console.log(errormessege);
      });
  }
  return (
    <div>
      <h2 className="text-primary mt-5">
        Welcome,Please {registered ? "Login" : "Register"} here
      </h2>
      <button onClick={handlRegisterButton}>register</button>
      {clickedRegister === true ? (
        <div className="register w-50 mx-auto mt-5">
          <Form noValidate validated={validated} onSubmit={formSubmission}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onBlur={handleEmailBlur}
                type="email"
                placeholder="Enter email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please write a email.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onBlur={handlePasswordBlur}
                type="password"
                placeholder="Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a valid password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              onChange={handleCheckBox}
              className="mb-3"
              controlId="formBasicCheckbox"
            >
              <Form.Check type="checkbox" label="already user?" />
            </Form.Group>
            <p className="text-danger">{error}</p>
            <button onClick={passwordReset} variant="link">
              forgot password
            </button>
            <Button variant="primary" type="submit">
              {registered ? "Login" : "Register"}
            </Button>
            <p className="text-success">{success}</p>
          </Form>
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default Email;
