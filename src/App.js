import { useState } from 'react';
import { checkLoginFunction } from "./common/checkLoginFunction";
import Auth from "./components/Auth/Auth";
import Layout from "./components/Layout/Layout";
import Modal from "./components/Modal/Modal";
import "./App.scss";
import ToDo from './components/ToDo/ToDo';
import styles from "./components/Modal/Modal.module.scss"

// import Andr from './components/Andr/Andr';

function App() {
  const [isLogin, setIsLogin] = useState(checkLoginFunction());
  const [isOpen, setIsOpen] = useState(false);
  const toggleLogin = (data) => {
    setIsLogin(data)
  }
  
  if (!isLogin) {
    return (
      <Layout toggleLogin={toggleLogin}>
        <Auth toggleLogin={toggleLogin} />
        <main>
      <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </main>
        {/* <Andr /> */}
      </Layout>
    );
  }
  return <Layout toggleLogin={toggleLogin}><ToDo /></Layout>;
}

export default App;
