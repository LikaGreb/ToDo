import { useState, useEffect } from "react";
import { store } from "../../store";
import { fetchItem } from "../../store/dispatches/item.dispatch";
import AddItem from "../AddItem/AddItem";
import Items from "../Items/Items";
import { RadioButton } from "../Radio/Radio";
import styles from "./ToDo.module.scss";

function ToDo() {
  const [items, setItems] = useState([]);
  const [isItemsUpdate, setIsItemsUpdate] = useState(0);
  const [sortMethod, setSortMethod] = useState("sortName");

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

  const radioChangeHandler = (e) => {
    setSortMethod(e.target.value);
  };

  return (
    <section>
      <div className="container">
        <h1 className={styles.title}>Додати нову задачу:</h1>
        <div className={styles.radio}>
          <p>Відсортувати задачі за:</p>
          <div className={styles.RadioButton} style={{ display: "flex" }}>
            <RadioButton
              changed={radioChangeHandler}
              id="1"
              isSelected={sortMethod === "sortName"}
              label="назвою"
              value="sortName"
            />

            <RadioButton
              changed={radioChangeHandler}
              id="2"
              isSelected={sortMethod === "sortCheched"}
              label="міткою"
              value="sortCheched"
            />
          </div>
        </div>
        <div className={styles.todoWrap}>
          <AddItem updateItems={updateItems} />
          <Items items={items} updateItems={updateItems} sortMethod={sortMethod} />
        </div>
      </div>
    </section>
  );
}

export default ToDo;
