import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { store } from "../../store";
import { fetchReg } from "../../store/dispatches/register.dispatch";
import AuthFormInner from "../AuthFormInner/AuthFormInner";

//toggleLogin
class Register extends Component {
  state = {
    error: "",
    login: "",
    pass: ""
  }
  // const loginField = useFormField();
  // const passField = useFormField();
  // const [error, setError] = useState("");
  getLogin = (login) => {
    this.setState({ login });
  };
  getPass = (pass) => {
    this.setState({ pass });
  };
  showMessage = (message) => {
    this.setState((prev) => { return { ...prev, error: message } });
    setTimeout(() => {
      this.setState((prev) => { return { ...prev, error: "" } });
    }, 3000);
  };

  registerFunction = async (e) => {
    e.preventDefault();
  
    const data = await store.dispatch(fetchReg(this.state.login, this.state.pass));
    if (data.type === "AUTH_SUCCESS") {
      this.props.toggleLogin(true);
    } else {
      this.showMessage(data.payload);
    }
  };
  render() {
    const loginField = {
      login: this.state.login,
      getLogin:this.getLogin
    };
    const passField = {
      pass: this.state.pass,
      getPass:this.getPass
    };
    return (
      <section className="login">
        <div className="container">
          {this.state.error !== "" ? <p>{this.state.error}</p> : null}
          <Form>
            <AuthFormInner
              loginField={loginField}
              passField={passField}
              error={this.state.error}
            />
            <Button variant="primary" type="submit"
              onClick={this.registerFunction}>
              Register
            </Button>
          </Form>
        </div>
      </section>
    );
  }
}
export default Register;
