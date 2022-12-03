import { Component } from "react";
import { Button } from "react-bootstrap";
import { store } from "../../store";
import Item from "../Item/Item";
import styles from "./Items.module.scss";
import { fetchSearch } from "../../store/dispatches/search.dispatch";
//({ items, updateItems })
class Items extends Component {
  state={
    term:"",
    error:"",
    filter:this.props.items,

  }

   reset = () => {
        this.setState((prev)=>{
          return {...prev, filter: this.props.items}});
          this.setState((prev)=>{
            return {...prev, term:""}});
  };
  

  
    showMessage = (message) => {
      this.setState((prev)=>{return {...prev, error: message}});
    setTimeout(() => {
      this.setState((prev)=>{return {...prev, error: ""}});
    }, 3000);
  };

  messageError = (message) => {
    this.showMessage(message);
  };

  submitHandler = async (e) => {
    e.preventDefault();
    
    const res = store.dispatch(fetchSearch(this.state.term));
    

    if (res.type === "SEARCH_SUCCESS") {
      this.setState((prev)=>{
        return {...prev, filter:res.payload}});

    }
    else if (res.type === "SEARCH_ERROR_NO_MATHES") {
      this.showMessage(res.payload);
      
    }

    else {
      this.showMessage(res.payload);
      
    }
  };
render(){
  return (
    <>
      {this.state.error !== "" ? <p>{this.state.error}</p> : null}
      <div className={styles.search_bar}>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            value={this.state.term}
            placeholder="Пошук"
            onChange={(e) => {
              this.setState((prev)=>{
                return {...prev, term: e.target.value}});
            }}
          />
          <Button type="submit" variant="outline-primary">
            Пошук
          </Button>
          <Button onClick={this.reset} variant="outline-primary">
            Скинути
          </Button>
        </form>
      </div>
      <div>
        <ul className={styles.items}>
          {this.state.filter.map((item, i) => (
            <Item
              key={`${item.text}-${i}`}
              item={item}
              updateItems={this.props.updateItems}
              messageError={this.messageError}
            />
          ))
          }
        </ul>
      </div>
    </>
  );
        }
}

export default Items;
