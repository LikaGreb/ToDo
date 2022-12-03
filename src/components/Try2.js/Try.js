import { Component } from "react";

export class Try extends Component {
    state = {
        items: "dffd",
        click:0,
        //date= {new Date()}
    }
     clicked=()=>{
    this.setState((state)=>({
    click:this.state.click+1,
    text:state.textN="XXX"
}));
    }
    render() {
        return <>
        <p>{this.props.text}</p>
        <p onClick={()=>{this.clicked()}}>{this.state.click}</p>
        <p>{this.state.textN}</p>
        <p>{this.state.items}</p>
        {/*<p>{this.state.date.toLocaleString()}</p>*/}
        </>
    }
}