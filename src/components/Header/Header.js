import { Button } from "react-bootstrap";
import { store } from "../../store";
import { fetchLogout } from "../../store/dispatches/logout.dispatch";
import styles from "./Header.module.scss";

function Header({ toggleLogin}) {

  const logoutFunction = async () => {
    const data = await store.dispatch(fetchLogout());

    if (data.type === "LOGOUT_SUCCESS") {
      toggleLogin(false);
      return;
    } else {
      console.log(data.payload);
    }
  };
 
  return (
    <header>
      <div className="container">
        <div className={styles.header} onClick={logoutFunction}>
          <p className={styles.loginName}>{localStorage.getItem("loginField")}</p>
         {localStorage.token? <Button variant="primary">Logout</Button> : null} 
          
        </div>
      </div>
    </header>
  );
}

export default Header;
