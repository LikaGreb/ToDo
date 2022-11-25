import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { store } from "../../store";
import Item from "../Item/Item";
import styles from "./Items.module.scss";
import { fetchSearch } from "../../store/dispatches/search.dispatch";

function Items({ items, updateItems }) {
  const [term, setTerm] = useState("");
  const [error, setError] = useState("");
  const [filter, setItemsFiltered] = useState([]);
  useEffect(() => { setItemsFiltered(items) }, [items]);
  const reset = () => {
    setItemsFiltered(items);
   setTerm("");
  };
  console.log(filter);
  const showMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };
  const messageError = (message) => {
    showMessage(message);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(term);
    const res = store.dispatch(fetchSearch(term));
    console.log(res);

    if (res.type === "SEARCH_SUCCESS") {
      setItemsFiltered(res.payload);

    }
    else if (res.type === "SEARCH_ERROR_NO_MATHES") {
      showMessage(res.payload);
      
    }

    else {
      showMessage(res.payload);
      
    }
  };

  return (
    <>
      {error !== "" ? <p>{error}</p> : null}
      <div className={styles.search_bar}>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Пошук"
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
          <Button type="submit" variant="outline-primary">
            Пошук
          </Button>
          <Button onClick={reset} variant="outline-primary">
            Скинути
          </Button>
        </form>
      </div>
      <div>
        <ul className={styles.items}>
          {filter.map((item, i) => (
            <Item
              key={`${item.text}-${i}`}
              item={item}
              updateItems={updateItems}
              messageError={messageError}
            />
          ))
          }
        </ul>
      </div>
    </>
  );
}

export default Items;
