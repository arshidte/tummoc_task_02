import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginGoogle, login } from "../Actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleFail, setGoogleFail] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const googleLogin = useSelector((state) => state.googleLogin);
  const { error: googleError } = googleLogin;

  useEffect(() => {
    if (userInfo) navigate("/home");
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const responseSuccessGoogle = (res) => {
    const tokenId = res.tokenId;
    console.log(res);
    dispatch(loginGoogle(tokenId));
  };

  const responseFailGoogle = () => {
    setGoogleFail(true);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h4 className="mb-3">Log In</h4>
          {error && (
            <Alert variant="danger">
              <h5>{error}</h5>
            </Alert>
          )}
          {googleError && (
            <Alert variant="danger">
              <h6>Please check if you entered using registered E-mail</h6>
            </Alert>
          )}
          {googleFail && (
            <Alert variant="danger">
              <h5>Something went wrong, Try again!</h5>
            </Alert>
          )}
          {loading && <Spinner animation="grow" size="md" />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row className="py-3">
              <Col>
                Are you new here?{" "}
                <Link to={'/register'}>
                  Register
                </Link>
              </Col>
            </Row>
            <Button className="mt-2" type="submit" variant="primary">
              Sign in
            </Button>
          </Form>

          <GoogleLogin
            className="mt-3"
            clientId="376606969984-svumg5jav85utntetp1jlnr6f4i1pine.apps.googleusercontent.com"
            buttonText="Login with Google account"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
