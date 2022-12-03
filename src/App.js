import { Component } from 'react';
import { checkLoginFunction } from "./common/checkLoginFunction";
import Auth from "./components/Auth/Auth";
import Layout from "./components/Layout/Layout";
//import Modal from "./components/Modal/Modal";

import "./App.scss";
import ToDo from './components/ToDo/ToDo';
//import styles from "./components/Modal/Modal.module.scss"
//import { Try } from './components/Try2.js/Try';
//import { render } from '@testing-library/react';


export class App extends Component {
  state = {
    isLogin: checkLoginFunction()
  }
  //const [isLogin, setIsLogin] = useState(checkLoginFunction());
  //const [isOpen, setIsOpen] = useState(false);
  toggleLogin = (data) => {
    this.setState((state) => ({
      isLogin: state.isLogin = data
    }));
    //setIsLogin(data)
  }

  // if (!isLogin) {
  //   return (
  //     <Layout toggleLogin={this.toggleLogin}>
  //       <Auth toggleLogin={this.toggleLogin} />
  //      {/* <Try text="text"/>*/}
  //       <main>
  //         <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
  //           Open Modal
  //         </button>
  //         {isOpen && <Modal setIsOpen={setIsOpen} />}
  //       </main>

  //     </Layout>
  //   );
  // }
  render() {
    const isLogin = this.state.isLogin;
    let el;
    if (isLogin) {
      el = <ToDo />;
    }
    else {
      el = <Auth toggleLogin={this.toggleLogin} />
    }
    return <Layout toggleLogin={this.toggleLogin}>
      {el}
      </Layout>;
  }

}

export default App;
