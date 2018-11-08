import * as React from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react";


// interface StateType {
//     eurVal: string,
//     inputTitle: string,
//     inputPln: string,
//     inputEur: string,
//     sum: Array<number>,
//     sumEur: Array<number>,
// }

interface Row {
    title: string,
    amountPLN: number,
}

@observer
export class List extends React.Component {
    
    @observable inputEur:number = 4.382;
    @observable inputPln:number = 0;
    @observable sumEur:number = 0;
    @observable sumPln:number = 0;
    @observable arrayEur:Array<number> = [];
    @observable arrayPln:Array<number> = [];
    @observable inputTitle: string = '';
    @observable arrayTitle:Array<string> = [];
    @observable sumAllEuro:number = 0;

    @observable list: Array<Row>

    constructor(props:Row) {
        super(props);
        this.list = [];
    }

    handleClick = () => {
        this.list.push({
            title: this.inputTitle,
            amountPLN: this.inputPln
        });

        this.arrayEur.push(this.inputEur);
        this.sumEur = this.arrayEur.reduce((a , b )=> a + b, 0);

        this.arrayTitle.push(this.inputTitle);
        console.log(this.inputTitle);

        this.arrayPln.push(this.inputPln);
        this.sumPln = this.arrayPln.reduce((a , b )=> a + b, 0);

        this.sumAllEuro = this.sumPln / this.inputEur;
    }

//             eurVal: '4.382',
//             inputTitle: '',
//             inputPln: '',
//             inputEur: '',
//             sum: [],
//             sumEur: []

    handleChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
        let eurValFromInput = e.currentTarget.value;
        this.inputEur = parseFloat(eurValFromInput);
    }

    handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) =>{
        this.inputTitle = e.currentTarget.value;
    }

    handleChangeAmount = (e: React.FormEvent<HTMLInputElement>) =>{
        let plnValFromInput = e.currentTarget.value;
        this.inputPln = parseFloat(plnValFromInput);
    }
    renderList() {
        return this.list.map(this.renderRow);
    }

    renderRow = (row: Row) => {
        return (
            <div className="rows">
                <div className="title">{ row.title }</div>
                <div className="amountPLN">{ row.amountPLN }</div>
                <div className="amountEUR">{ this.renderEuro(row.amountPLN) }</div>
                <button className="deleteButton">Delete</button>
            </div>
        );
    };

    renderEuro(amountPLN: number): number {
        return amountPLN / this.inputEur;
    }

    //handleClick = () => {     
                                        //TODO
        /*
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
        let sumPLN = document.querySelectorAll('.amountPLN');
        let arr = [];
        for(let i = 0; i < sumPLN.length; i++){
            arr.push(parseFloat(sumPLN[i].innerText))
            console.log("tablica: "+arr);
        }

        let stateSums = [...arr];
        console.log("stateSums: "+stateSums);
        this.setState({
            sum: stateSums.reduce((a,b)=>a+b, 0)
        })
        
        //counting the sum of EUR
        let sumEUR = document.querySelectorAll('.amountEUR');
        let arr2 = [];
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
            stateSumsEur.pop()
                this.setState({
                    sum: stateSums.reduce((a,b)=>a+b, 0),
                    sumEur: stateSumsEur.reduce((a,b)=>a+b, 0).toFixed(2)
                })    
              })  
          }
          */
       // } //close if statement
    //    renderRow = () => {
    //     const a = this.arrayEur.map((el, i) =>
    //     <div className="amountEUR">
    //         <li key = { `el-${i}`}> {el} </li>
    //     </div>
    //     );}

    render(){
        return (
        <div>
        <div className="inputs">
            <h1>List of expenses</h1>
            <div className="error-message"></div>
            
            <label>Type value: 1 EUR
            <input onChange={this.handleChangeValue} type="number" min="0" value={this.inputEur} />
            </label>
             
            <label>Title of transaction
            <input onChange={this.handleChangeTitle} type="text" value={this.inputTitle}/>
            </label>
            <label>Amount ( in PLN )
            <input onChange={this.handleChangeAmount} type="number" min="0" />
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
            <div>  
                { this.renderList()  }
            </div> 
        <h2>{this.sumAllEuro}</h2>
            
    </div>
        )   
    }

}

export default List;