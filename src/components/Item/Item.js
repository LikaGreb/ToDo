
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
    //item: this.props.item,
    //id: this.props.id,
    //checked: false,
    // text: "",
    // },
    isEdit: false,
    //textField: this.props.item.text,
    mess: ""
  };

  // const [isEdit, setIsEdit] = useState(false);
  // const textField = useFormField(item.text);
  showMessage = (message) => {
    this.setState((prev) => { return { ...prev, mess: message } });
    setTimeout(() => {
      this.setState((prev) => { return { ...prev, mess: "" } });
    }, 3000);
  };

  editItem = async (id, checked, text) => {
    const res = await store.dispatch(fetchItemEdit(text, id, checked))
    // console.log(res, "1111");
    // console.log(this.state, "this.state");
    console.log(this.textField, "this.textField");
    console.log(this.props.item, "this.props.item");
    if (res.type === "ITEM_EDIT") {
      this.state.isEdit = true;
      this.props.updateItems(res.payload);
    } else {
      this.state.isEdit = false;
      this.showMessage(res.payload)
    }
  };
  
    
  
  setIsEdit = (isEdit) => {
    //this.state.isEdit = true;
    isEdit = ((prev) => !prev)
  }

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
      this.editItem(this.props.item.id, this.props.item.checked, this.textField.value);
      // this.setisEdit();
      console.log("keyPressHandler")
    }
  };

  // componentDidMount() {
  //   this.getItems();
  // }

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
            defaultValue={this.props.item.text}
            {...this.textField}
            onKeyPress={this.keyPressHandler}
          />
        )}
        <Button
          variant="outline-warning"
          onClick={() => {
            this.editItem(this.props.item.id, this.props.item.checked, this.props.item.text);
          }}
        >
          Edit
        </Button>
        <Button
          variant="outline-success"
          onClick={() => this.editItem(this.props.item.id, this.props.item.checked, this.textField.value)}

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
