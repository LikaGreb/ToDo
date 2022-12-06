import { Component } from "react";
import { Button } from "react-bootstrap";
import { store } from "../../store";
import { fetchLogout } from "../../store/dispatches/logout.dispatch";
import styles from "./Header.module.scss";

class Header extends Component {

 
   logoutFunction = async () => {
    const data = await store.dispatch(fetchLogout());

    if (data.type === "LOGOUT_SUCCESS") {
      this.props.toggleLogin(false);
      return;
    } else {
      console.log(data.payload);
    }
  };
  render() {
    return (
      <header>
        <div className="container">
          <div className={styles.header} onClick={this.logoutFunction}>
            <Button variant="primary">Logout</Button>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
