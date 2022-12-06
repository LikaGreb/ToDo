import { Component } from "react";
import { store } from "../../store";
import { fetchItem } from "../../store/dispatches/item.dispatch";
import AddItem from "../AddItem/AddItem";
import Items from "../Items/Items";
import styles from "./ToDo.module.scss";
import Pagination from 'react-bootstrap/Pagination';
import { fetchSearch } from "../../store/dispatches/search.dispatch";


const itemsOnPage = 5;
class ToDo extends Component {
  state = {
    items: [],
    active: 1,
    error: "",
   
  }

  getItems = async () => {
    const data = await store.dispatch(fetchItem());
    if (data.payload) {
      this.setState((previousState) => {
        return { ...previousState, items: data.payload }
      });
    }
  }

  updateItems = (isUpdate) => {
    if (this.state.items.length === 0) {
      return;
    }
    if (isUpdate) {
      this.getItems();
    }
  };

  showMessage = (message) => {
    this.setState((prev) => { return { ...prev, error: message } });
    setTimeout(() => {
      this.setState((prev) => { return { ...prev, error: "" } });
    }, 3000);
  };

  filterHandler = async (term) => {
    if (term === ""&& this.state.counter>0) {
      this.showMessage("Пусте значення")
      this.getItems();
      return;
    }
    const res = await store.dispatch(fetchSearch(term));

    if (res.type === "SEARCH_SUCCESS") {
      this.setState((prev) => {
        return { ...prev, items: res.payload }
      });

    }
    else if (res.type === "SEARCH_ERROR_NO_MATHES") {
      this.showMessage(res.payload);

    }

    else {
      this.showMessage(res.payload);

    }
  }

  componentDidMount() {
    this.getItems();
  }

  render() {
    let pages = [];
    for (let number = 1; number <= Math.ceil(this.state.items.length / itemsOnPage); number++) {
      pages.push(
        <Pagination.Item key={number} active={number === this.state.active} onClick={() => {
          this.setState((previousState) => {
            return { ...previousState, active: number }
          })
        }}
        >
          {number}
        </Pagination.Item>
      );
    }
    return (

      <section>
        <div className="container">
          <h1 className={styles.title}>Додати нову задачу:</h1>
          <div className={styles.todoWrap}>
            <AddItem updateItems={this.updateItems} />
            {this.state.error !== "" ? <p>{this.state.error}</p> : null}
            <Items items={this.state.items.slice(
              (this.state.active - 1) * itemsOnPage,
              this.state.active * itemsOnPage)}
              updateItems={this.updateItems}
              filterHandler={this.filterHandler}
              getItems={this.getItems}
            />

          </div>
          <Pagination size="sm" className={styles.pag}>{pages}</Pagination>
        </div>
      </section>

    );
  }
}

export default ToDo;
