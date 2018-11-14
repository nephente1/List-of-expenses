import * as React from 'react';
import {observable, computed} from "mobx";
import {observer} from "mobx-react";

interface RowDataPropsType {
    rowTitle:string, 
    rowAmountPln:number,
    rowAmountEur:number | string, 
    rowID:number,
    key: number,
    list: Array<Row>,
    handleDelete:(id: number) => void
}

@observer 
class RowData extends React.Component <RowDataPropsType>{
    render(){
        return (
            <div className="rows">
                <div className="title">{ this.props.rowTitle}</div>
                <div className="amountPLN">{ this.props.rowAmountPln }</div>
                <div className="amountEUR">{ this.props.rowAmountEur }</div>
                <button className="deleteButton"  onClick={this.onHandleDelete}>Delete</button>
            </div>
        );
    }

    onHandleDelete = () => {
        const {rowID, handleDelete } = this.props;
        handleDelete(rowID)
    }
}

interface Row {
    id: number,
    title: string,
    amountPLN: number,
}

/*interface ArrayPln {
    inputPln: number,
    idPln: number
}*/

@observer
export class List extends React.Component {
    
    @observable inputEur:number = 4.382;
    @observable inputPln:number = 0;
    //@observable sumEur:number = 0;
    //@observable sumPln:number = 0;
    //@observable arrayEur:Array<number> = [];
    //@observable arrayPln: Array<ArrayPln> = [];
    @observable inputTitle: string = '';
    //@observable arrayTitle:Array<string> = [];
    //@observable sumAllEuro:number = 0;

    @observable list: Array<Row>
    @observable licznik: number = 0;

    constructor(props:Row) {
        super(props);
        this.list = [];
    }

    handleClick = () => {
        this.list.push({
            title: this.inputTitle,
            amountPLN: this.inputPln,
            id: this.licznik++
        });

        ///this.arrayEur.push(this.inputEur);
        //this.sumEur = this.arrayEur.reduce((a , b )=> a + b, 0);

        //this.arrayTitle.push(this.inputTitle);

        /*this.arrayPln.push({
            inputPln: this.inputPln,
            idPln: this.licznik++
        });*/
            
        //this.sumPln=this.arrayPln.map(x => x.inputPln).reduce((a , b )=> a + b, 0);
        //this.sumaPln();
        
        //console.log('this.sumPln',this.sumPln)
        
    }

    @computed get sumaPln() {
        let sum = 0;
        for (const item of this.list) {
            sum = sum + item.amountPLN;
        }
        return sum;
        //return this.arrayPln.map(x => x.inputPln).reduce((a , b )=> a + b, 0);
    }

    @computed get sumAllEuro() {
        return parseFloat( (this.sumaPln / this.inputEur).toFixed(2) );
    }

    // sumaEuro = () => {
    // this.sumAllEuro = parseFloat( (this.sumPln / this.inputEur).toFixed(2) );
    // }

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
        const tablica = this.list.map(this.renderRow);
        return tablica;
    }
    renderEuro(amountPLN: number): number {
        return amountPLN / this.inputEur;
    }

    renderRow = (row: Row) => {
        const rowID = row.id;
        return(
            <RowData 
                list={this.list} 
                rowTitle={row.title} 
                rowAmountPln={row.amountPLN} 
                rowAmountEur={this.renderEuro(row.amountPLN).toFixed(2)} 
                rowID={rowID}
                handleDelete={this.handleDelete}
                key={rowID} />)
    };

    handleDelete = (idToDelete: number ) => {
        const newList = this.list.filter(  //modyfikuje
            (item) => item.id !== idToDelete
            );
        this.list = newList; //zwracam nowa liste
        
        //const newArrayPln = newList.filter( (el) => el.id !== idToDelete);
        
        //this.sumaPln();
        
        //this.sumPln = newArrayPln.map( (el) => el.amountPLN ).reduce((a , b )=> a + b, 0);
        //console.log('del',this.sumPln )
        //this.sumAllEuro = parseFloat( (this.sumPln / this.inputEur).toFixed(2) );
        
        console.log('this.sumAllEuro',this.sumAllEuro)
    }

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
