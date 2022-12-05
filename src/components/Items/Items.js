import { Component } from "react";
import { Button } from "react-bootstrap";
import Item from "../Item/Item";
import styles from "./Items.module.scss";


class Items extends Component {
  state = {
    term: "",
    error: "",
  }

  reset = () => {
    this.setState((prev) => {
      return { ...prev, term: "" }
    });
    this.props.filterHandler("");
  };

  showMessage = (message) => {
    this.setState((prev) => { return { ...prev, error: message } });
    setTimeout(() => {
      this.setState((prev) => { return { ...prev, error: "" } });
    }, 3000);
  };

  // messageError = (message) => {
  //   this.showMessage(message);
  // };



  render() {
    return (
      <>
        {this.state.error !== "" ? <p>{this.state.error}</p> : null}
        <div className={styles.search_bar}>
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              value={this.state.term}
              placeholder="Пошук"
              onChange={(e) => {
                this.setState((prev) => {
                  return { ...prev, term: e.target.value }
                });
              }}
            />
            <Button onClick={() => this.props.filterHandler(this.state.term)}
              variant="outline-primary">
              Пошук
            </Button>
            <Button onClick={this.reset} variant="outline-primary">
              Скинути
            </Button>
          </form>
        </div>
        <div>
          {this.props.items.length === 0 ? (
            <p>No data</p>
          ) : (
            <ul className={styles.items}>
              {this.props.items.map((item, i) => (
                <Item
                  key={`${item.text}-${i}`}
                  item={item}
                  updateItems={this.props.updateItems}
                  showMessage={this.showMessage}
                />
              ))
              }
            </ul>)}
        </div>
      </>
    );
  }
}

export default Items;
