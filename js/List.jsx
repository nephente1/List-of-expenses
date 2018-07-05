import React from 'react';
import ReactDOM from 'react-dom';

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eurVal: "4.382",
            inputTitle: "",
            inputPln: null,
            inputEur: 'null'
        }
    }

    handleChangeTitle = (e) =>{
        let inputTitle = e.target.value;
        this.setState({
            inputTitle: inputTitle
        })
    }

    handleChangeAmount = (e) =>{
        let inputPln = e.target.value;
        this.setState({
            inputPln: inputPln
        })
    }

    handleClick = () =>{
        let row = document.createElement("div");
        row.className = "rows";

        let divTitle = document.createElement("div");
        divTitle.className = "title";
        row.appendChild(divTitle);
        divTitle.innerHTML = this.state.inputTitle;

        let divAmount = document.createElement("div");
        divAmount.className = "amountPLN";
        row.appendChild(divAmount);
        divAmount.innerHTML = this.state.inputPln;

        let  amountEUR = document.createElement("div");
        amountEUR.className = "amountEUR";
        row.appendChild(amountEUR);
        let euroSum = (this.state.inputPln / this.state.eurVal).toFixed(2);
        amountEUR.innerHTML = euroSum;

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteButton";
        row.appendChild(deleteBtn);
        deleteBtn.innerText = "delete";

        document.querySelector('.table').appendChild(row);


        let input = document.querySelector('input');
        input.value = '';
        this.setState({
            inputTitle: '',
            inputPln: 0
        })

        deleteBtn.addEventListener('click',() => {
        document.querySelector('.table').removeChild(row);
        })
    }


    render(){
        return (
        <div>
        <div className="inputs">
            <h1>List of expenses</h1>
            <p>1EUR = {this.state.eurVal}</p>
            <label>Title of transaction
            <input onChange={this.handleChangeTitle} type="text"/>
            </label>
            <label>Amount ( in PLN )
            <input onChange={this.handleChangeAmount} type="number"/>
            </label>
            <button onClick={this.handleClick}>ADD</button>
        </div>
        <div className="table">
            <div className="tableHeader">
                <div className="title">Title</div>
                <div className="amountPLN">Amount (PLN)</div>
                <div className="amountEUR">Amount (EUR)</div>
                <div className="optionCell">Options</div>
            </div>
        </div>  
            
        </div>
        )
    }
}

export default List;