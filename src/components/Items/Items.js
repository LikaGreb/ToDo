import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { store } from "../../store";
import Item from "../Item/Item";
import styles from "./Items.module.scss";
import { fetchSearch } from "../../store/dispatches/search.dispatch";
import Pagination from "react-bootstrap/Pagination";

const itemsOnPage = 5;

function Items({ items, updateItems, sortMethod }) {
  const [term, setTerm] = useState("");
  const [error, setError] = useState("");
  const [filter, setItemsFiltered] = useState([]);
  const [active, setActive] = useState(1);

  useEffect(() => {
    setItemsFiltered(items);
  }, [items]);
  const reset = () => {
    setItemsFiltered(items);
    setTerm("");
  };

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

    const res = store.dispatch(fetchSearch(term));

    if (res.type === "SEARCH_SUCCESS") {
      setItemsFiltered(res.payload);
    } else if (res.type === "SEARCH_ERROR_NO_MATHES") {
      showMessage(res.payload);
    } else {
      showMessage(res.payload);
    }
  };

  let pages = [];
  if (term !== "") {
    for (
      let number = 1;
      number <= Math.ceil(filter.length / itemsOnPage);
      number++
    ) {
      pages.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => {
            setActive(number);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
  } else {
    for (
      let number = 1;
      number <= Math.ceil(items.length / itemsOnPage);
      number++
    ) {
      pages.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => {
            setActive(number);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
  }

  const myFilter = []
    .concat(filter)
    .sort((a, b) => (a.checked > b.checked ? 1 : -1));

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
          {sortMethod==="sortCheched"?
            []
            .concat(filter)
            .sort((a, b) => (a.checked > b.checked ? 1 : -1))
            .slice((active - 1) * itemsOnPage, active * itemsOnPage)
            .map((item, i) => (
              <Item
                key={`${item.text}-${i}`}
                item={item}
                updateItems={updateItems}
                messageError={messageError}
              />
            )): []
            .concat(filter)
            .sort((a, b) => (a.text > b.text ? 1 : -1))
            .slice((active - 1) * itemsOnPage, active * itemsOnPage)
            .map((item, i) => (
              <Item
                key={`${item.text}-${i}`}
                item={item}
                updateItems={updateItems}
                messageError={messageError}
              />
            ))
          }
        </ul>
        <Pagination size="sm" className={styles.pag}>
          {pages}
        </Pagination>
      </div>
    </>
  );
}

export default Items;
