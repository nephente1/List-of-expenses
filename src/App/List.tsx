import * as React from 'react';
import {observable, computed} from "mobx";
import {observer} from "mobx-react";

interface RowDataPropsType {
    rowTitle:string, 
    rowAmountPln:number,
    rowAmountEur:number | string, 
    rowID:number,
    list: Array<Row>,
    handleDelete:(id: number) => void
}

interface ErrorsPropsType {
   message: string,
}

@observer
class Errors extends React.Component<ErrorsPropsType> {
    render(){
        return(
            <div className="errors">{this.props.message}</div>
        )
    }
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

@observer
export class List extends React.Component {
    @observable inputEur:number = 4.382;
    @observable inputPln:number = 0;
    @observable inputTitle: string = '';

    @observable list: Array<Row>;
    @observable licznik: number = 0;
    @observable errors: Array<string> = [];
    @observable komunikat: string = '';

    constructor(props:Row) {
        super(props);
        this.list = [];
    }


    handleClick = () => {
        this.errors = [];
        
    //validation conditions
        if(this.inputTitle.length < 5){
            this.errors.push("Title should have at least 5 characters");
        } else if(this.inputPln < 1){
            this.errors.push("Type amount in PLN");
        } else {
            console.log('clear')
            this.list.push({
                title: this.inputTitle,
                amountPLN: this.inputPln,
                id: this.licznik++
            });

            this.inputPln = 0;
            this.inputTitle = '';
        }
    }

    @computed get sumaPln() {
        let sum = 0;
        for (const item of this.list) {
            sum = sum + item.amountPLN;
        } return sum;
        //return this.arrayPln.map(x => x.inputPln).reduce((a , b )=> a + b, 0);
    }

    @computed get sumAllEuro() {
        return parseFloat( (this.sumaPln / this.inputEur).toFixed(2) );
    }

    handleChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
        let eurValFromInput = e.currentTarget.value;
        this.inputEur = parseFloat(eurValFromInput);
    }

    handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) =>{
        this.inputTitle = e.currentTarget.value;
    }

    handleChangeAmount = (e: React.FormEvent<HTMLInputElement>) => {
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

    renderRow = (row: Row, id: number) => {
        const rowID = row.id;
        return(
            <RowData 
                list={this.list} 
                rowTitle={row.title} 
                rowAmountPln={row.amountPLN} 
                rowAmountEur={this.renderEuro(row.amountPLN).toFixed(2)} 
                rowID={rowID}
                handleDelete={this.handleDelete}
                key={id}
            />)
    };

    handleDelete = (idToDelete: number ) => {
        const newList = this.list.filter( (item) => item.id !== idToDelete );
        this.list = newList;
    }

    renderError() {
        if(this.errors.length > 0) {
            return this.errors.map(
                (el, id) => <Errors message={el} key={id}/>
            );
        }
    }

    render(){
        return (
            <div>
                <div className="inputs">
                    <h1>List of expenses</h1>

                    { this.renderError() }
                    
                    <label>Type value: 1 EUR
                        <input onChange={this.handleChangeValue} type="number" min="0" value={this.inputEur} />
                    </label>
                    
                    <label>Title of transaction
                        <input onChange={this.handleChangeTitle} type="text" value={this.inputTitle}/>
                    </label>
                    <label>Amount ( in PLN )
                        <input onChange={this.handleChangeAmount} type="number" value={this.inputPln} />
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
        );
    }
}

export default List;
