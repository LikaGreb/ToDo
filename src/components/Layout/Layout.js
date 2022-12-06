import { Component } from "react";
import Header from "../Header/Header";
import styles from './Layout.module.scss'

class Layout extends Component {
  
  render() {
    return (
      <div className={styles.layout}>
        <Header toggleLogin={this.props.toggleLogin} />
        <section>
          <div className="container">{this.props.children}</div>
        </section>
        <footer>
          <div className="container">
            <p className={styles["footer-wrap"]}>
              created by Lika Greben
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
export default Layout;