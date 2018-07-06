import React from 'react';
import ReactDOM from 'react-dom';

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eurVal: '4.382',
            inputTitle: '',
            inputPln: '',
            inputEur: '',
            sum: [],
            sumEur: []
        }
    }

    handleChangeValue = (e) => {
        let eurVal = e.target.value;
        this.setState({
            eurVal: eurVal
        })
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

    handleClick = () => {     

        let errors = [];

        //validation conditions
        if(this.state.inputTitle.length < 5){
            errors.push("Title should have at least 5 characters");
            console.log(errors);
        } else if(this.state.inputPln.length < 1){
            errors.push("Type amount in PLN");
            console.log(errors)
        }

        if(errors.length > 0) {
            var errorMessage = document.querySelector('.error-message');       
             for(let i=0; i<errors.length; i++) {
                 errorMessage.innerHTML += errors[i] + '<br/>'
                 errorMessage.style.color='red';
                }
        } else {

            //clear errors messages
        document.querySelector('.error-message').innerHTML = '';

            //clear inputs after click
        this.setState({
            inputTitle: '',
            inputPln: ''
        })

        let row = document.createElement("div");
        row.className = "rows";

        let divTitle = document.createElement("div");
        divTitle.className = "title";
        row.appendChild(divTitle);
        divTitle.innerHTML = this.state.inputTitle;

        let divAmount = document.createElement("div");
        divAmount.className = "amountPLN";
        row.appendChild(divAmount);
        let plnSum = (this.state.inputPln * 1).toFixed(2);
        divAmount.innerHTML = plnSum;

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
        
        //counting the sum of PLN
        var sumPLN = document.querySelectorAll('.amountPLN');
        var arr = [];
        for(let i = 0; i < sumPLN.length; i++){
            arr.push(parseFloat(sumPLN[i].innerText))
            console.log("tablica: "+arr);
        }

        let stateSums = [...arr];
        console.log(stateSums.reduce((a,b)=>a+b, 0) )
        console.log(stateSums);
        this.setState({
            sum: stateSums.reduce((a,b)=>a+b, 0)
        })
        
        //counting the sum of EUR
        var sumEUR = document.querySelectorAll('.amountEUR');
        var arr2 = [];
        for(let i = 0; i < sumEUR.length; i++){
            arr2.push(parseFloat(sumEUR[i].innerText))
        }

        let stateSumsEur = [...arr2];
        this.setState({
            sumEur: stateSumsEur.reduce((a,b)=>a+b, 0).toFixed(2)
        })

        //delete row by button
        deleteBtn.addEventListener('click', () => {
            document.querySelector('.table').removeChild(row);
            stateSums.pop();

                this.setState({
                    sum: stateSums.reduce((a,b)=>a+b, 0)
                })    
              })  
          }
        } //close if statement

    render(){
        
        return (
        <div>
        <div className="inputs">
            <h1>List of expenses</h1>
            <div className="error-message"></div>
            <label>1 EUR =
            <input onChange={this.handleChangeValue} type="text" value={this.state.eurVal}/>
            </label>
            
            <label>Title of transaction
            <input onChange={this.handleChangeTitle} type="text" value={this.state.inputTitle}/>
            </label>
            <label>Amount ( in PLN )
            <input onChange={this.handleChangeAmount} type="text" value={this.state.inputPln}/>
            </label>
            <button onClick={this.handleClick}>ADD</button>
        </div>
        <div className="table">
            <div className="tableHeader">
                <div className="title">Title</div>
                <div className="amountPLNHead">Amount (PLN)</div>
                <div className="amountEURHead">Amount (EUR)</div>
                <div className="optionCell">Options</div>
            </div>
        </div>  
            <h2>Sum: {this.state.sum} PLN / {this.state.sumEur} EUR </h2>
            
        </div>
        )
    }
}

export default List;