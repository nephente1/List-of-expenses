import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';


class App extends React.Component{
    render(){
        return <div>
            <List />
            
            </div>
    }
}

ReactDOM.render( <App />, document.getElementById('app'));