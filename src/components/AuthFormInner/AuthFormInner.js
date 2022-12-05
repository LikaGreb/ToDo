import { Component } from "react";
import Form from "react-bootstrap/Form";

class AuthFormInner extends Component {
   
  render() {
    const { login, getLogin } = this.props.loginField;
    const { pass, getPass } = this.props.passField;

    return (
      <>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" placeholder="Enter login"
            value={login}
            onChange={(e) => getLogin(e.target.value)}
           />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            value={pass}
          onChange={(e) => getPass(e.target.value)} 
            />
        </Form.Group>
      </>
    );
  }
}

export default AuthFormInner;