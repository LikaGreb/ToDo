
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import useFormField from "../../common/useFieldsFunction";
import { fetchDeleteItem } from "../../store/dispatches/itemDelete.dispatch";
import { fetchItemEdit } from "../../store/dispatches/itemEdit.dispatch";
import styles from "./Item.module.scss";
import { store } from "../../store";

function Item({ item, updateItems, messageError }) {
  const [isEdit, setIsEdit] = useState(false);
  const textField = useFormField(item.text);
  
  const editItem = async (id, checked, text) => {
    const res = await store.dispatch(fetchItemEdit(text, id, checked))
    console.log(res);
    if (res.type==="ITEM_EDIT") {
        updateItems(res.payload);
    
    } else {
      setIsEdit(false);
      messageError(res.payload)
     }
  };

 const deleteItem = async (id) => {
    const res = await store.dispatch(fetchDeleteItem(id));
    if (res.type === "ITEM_DELETE") {
      updateItems(res.payload);
    } else {
      console.log(res.payload);
    }
  };
  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      editItem(item.id, item.checked, textField.value);
    }
  };

  return (
    <li className={styles.item}>
      <Form.Check
        type="checkbox"
        checked={item.checked}
        onChange={() => editItem(item.id, !item.checked, item.text)}
      />
      {!isEdit ? (
        <p
          className={
            item.checked ? `${styles.text} ${styles.checked}` : styles.text
          }
        >
          {item.text}
        </p>
      ) : (
        <Form.Control
          type="text"
          value={item.text}
          {...textField}
          onKeyPress={keyPressHandler}
        />
      )}
      <Button
        variant="outline-warning"
        onClick={() => {
          setIsEdit((prev) => !prev);
        }}
      >
        Edit
      </Button>
      <Button
        variant="outline-success"
        onClick={() => editItem(item.id, item.checked, textField.value)}
      >
        Save
      </Button>
      <Button variant="outline-danger" onClick={() => deleteItem(item.id)}>
        Delete
      </Button>
    </li>
  );
}

export default Item;
