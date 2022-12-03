import { Component } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
//import useFormField from "../../common/useFieldsFunction";
import { store } from "../../store";
import { fetchAddItem } from "../../store/dispatches/itemAdd.dispatch";
import styles from "./AddItem.module.scss";


//({ updateItems })
class AddItem extends Component {
  state = {
    mess: "",
    task:""
  }
  // const [mess, stateMess] = useState("");
  showMessage = (message) => {
    this.setState((prev) => { return { ...prev, mess: message } });
    setTimeout(() => {
      this.setState((prev) => { return { ...prev, mess: "" } });
    }, 3000);
  };
  // const taskField = useFormField();
  addItemFunction = async (e) => {
    e.preventDefault();

    const res = await store.dispatch(fetchAddItem(this.state.task));
    if (res.type === "ITEM_ADD") {
      this.props.updateItems(res.payload);
      return;
    }
    this.showMessage(res.payload);
  };
  render() {
    return (
      <>
        {this.state.mess !== "" ? <p>{this.state.mess}</p> : null}
        <Form className={styles.inputNewTask}>
          <Form.Control type="text" placeholder="Нова задача" value={this.state.task} onChange={(e)=>{this.setState((prev) => { return { ...prev, task:e.target.value }})}} />

          <Button
            variant="outline-primary"
            onClick={this.addItemFunction}
            type="submit"
          >
            Додати задачу
        </Button>
        </Form>
      </>
    );
  }
}

export default AddItem;
