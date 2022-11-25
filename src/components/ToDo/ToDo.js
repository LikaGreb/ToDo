import { useState, useEffect } from "react";
import { store } from "../../store";
import { fetchItem } from "../../store/dispatches/item.dispatch";
import AddItem from "../AddItem/AddItem";
import Items from "../Items/Items";
import styles from "./ToDo.module.scss";
import Pagination from 'react-bootstrap/Pagination';
import { render } from "@testing-library/react";

const itemsOnPage=5;
function ToDo() {
  const [items, setItems] = useState([]);
  const [isItemsUpdate, setIsItemsUpdate] = useState(0);
  const [active, setActive]=useState(1);

  const updateItems = (isUpdate) => {
    if (isUpdate) {
      setIsItemsUpdate(isItemsUpdate + 1);
    }
  };

  async function getItems() {

    const data = await store.dispatch(fetchItem());

    if (data.payload) {
      setItems(data.payload);
      return;
    }
  }

  useEffect(() => {
    getItems();
  }, [isItemsUpdate]);

 
let pages = [];
for (let number = 1; number <= Math.ceil(items.length/itemsOnPage); number++) {
  pages.push(
    <Pagination.Item key={number} active={number === active} onClick={()=>{setActive(number)}}>
      {number}
    </Pagination.Item>,
  );
}



  return (
    
    <section>
      <div className="container">
        <h1 className={styles.title}>Додати нову задачу:</h1>
        <div className={styles.todoWrap}>
          <AddItem updateItems={updateItems} />
          <Items items={items.slice((active-1)*itemsOnPage, active*itemsOnPage)} updateItems={updateItems} />
        </div>
        <Pagination size="sm" className={styles.pag}>{pages}</Pagination>
      </div>
    </section>
    
  );
}

export default ToDo;
