
import { Component } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
//import useFormField from "../../common/useFieldsFunction";
import { fetchDeleteItem } from "../../store/dispatches/itemDelete.dispatch";
import { fetchItemEdit } from "../../store/dispatches/itemEdit.dispatch";
import styles from "./Item.module.scss";
import { store } from "../../store";


class Item extends Component {
  state = {
    isEdit: false,
    textField: this.props.item.text,
    mess: ""
  };

  showMessage = (message) => {
    this.setState((prev) => { return { ...prev, mess: message } });
    setTimeout(() => {
      this.setState((prev) => { return { ...prev, mess: "" } });
    }, 3000);
  };

  editItem = async (id, checked, text) => {
    const res = await store.dispatch(fetchItemEdit(text, id, checked))
    if (res.type === "ITEM_EDIT") {
      //this.state.isEdit = true;
      this.props.updateItems(res.payload);
    } else {
      //this.state.isEdit = false;
      this.showMessage(res.payload)
    }
    this.setIsEdit(false);
  };



  setIsEdit = (isEditVal) => {
    this.setState((prevState) => {
      return { ...prevState, isEdit: isEditVal };
    });
  };
  

  deleteItem = async (id) => {
    const res = await store.dispatch(fetchDeleteItem(id));
    if (res.type === "ITEM_DELETE") {
      this.props.updateItems(res.payload);

    } else {
      console.log(res.payload);
    }
  };
  keyPressHandler = (e) => {
    if (e.key === "Enter") {
      this.editItem(this.props.item.id, this.props.item.checked, this.state.textField);
      }
  };

  render() {
    return (
      <li className={styles.item}>
        <Form.Check
          type="checkbox"
          checked={this.props.item.checked}
          onChange={() => this.editItem(this.props.item.id, !this.props.item.checked, this.props.item.text)}
        />
        {!this.state.isEdit ? (
          <p className={this.props.item.checked ? `${styles.text} ${styles.checked}` : styles.text}>
            {this.props.item.text}
          </p>
        ) : (
          <Form.Control
            type="text"
              value={this.state.textField}
              onChange={(e) => {
                this.setState((prev) => {
                  return { ...prev, textField:e.target.value }
                })
              }}
            onKeyPress={this.keyPressHandler}
          />
        )}
        <Button
          variant="outline-warning"
          onClick={() => {
            this.setIsEdit(true);
          }}
        >
          Edit
        </Button>
        <Button
          variant="outline-success"
          onClick={() => this.editItem(this.props.item.id, this.props.item.checked, this.state.textField)}

        >
          Save
        </Button>
        <Button variant="outline-danger"
          onClick={() => this.deleteItem(this.props.item.id)}>
          Delete
        </Button>
      </li>
    );
  }
}
export default Item;
