import { Component } from "react";
import { store } from "../../store";
import { fetchItem } from "../../store/dispatches/item.dispatch";
import AddItem from "../AddItem/AddItem";
import Items from "../Items/Items";
import styles from "./ToDo.module.scss";
import Pagination from 'react-bootstrap/Pagination';
//import { render } from "@testing-library/react";

const itemsOnPage = 5;
class ToDo extends Component {
  state = {
    items: [],
    active: 1

  }
  //   const [items, setItems] = useState([]);
  //   const [isItemsUpdate, setIsItemsUpdate] = useState(0);
  //   const [active, setActive]=useState(1);



  getItems = async () => {

    const data = await store.dispatch(fetchItem());

    if (data.payload) {
      this.setState((previousState)=>{
        return {...previousState, items: data.payload }
      });
    }
  }
  updateItems = (isUpdate) => {
    if (isUpdate) {
     this.getItems();
    }
  };
  //   useEffect(() => {
  //     getItems();
  //   }, [isItemsUpdate]);
  
// componentDidUpdate(prevState){
//   if (this.state.items!==prevState.items){
//     this.getItems();
//   }
// }


  componentDidMount() {
    this.getItems();
  }

  render() {
    let pages = [];
    for (let number = 1; number <= Math.ceil(this.state.items.length / itemsOnPage); number++) {
      pages.push(
        <Pagination.Item key={number} active={number === this.state.active} onClick={() => { this.setState((previousState)=>{
          return {...previousState, active: number}
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
            <Items items={this.state.items.slice((this.state.active - 1) * itemsOnPage, this.state.active * itemsOnPage)} updateItems={this.updateItems} />

          </div>
          <Pagination size="sm" className={styles.pag}>{pages}</Pagination>
        </div>
      </section>

    );
  }
}

export default ToDo;
