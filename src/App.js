import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: props.todo,
      newItemValue: ''
    };
  }
  FormSubmit(e) {
    e.preventDefault();
    var ItemValue = this.state.todo.concat([this.state.newItemValue]);
    this.setState({todo: ItemValue, newItemValue: ""});
    localStorage.setItem('todo', JSON.stringify(ItemValue))
  }
  ItemValueChanged(e) {
    this.setState({newItemValue: e.target.value})
  }
  onItemClick(index, e) {
    var head = this.state.todo.slice(0, index);
    var tail = this.state.todo.slice(index + 1, this.state.todo.length);
    var newItems = head.concat(tail);
    this.setState({todo: newItems})
    localStorage.setItem('todo', JSON.stringify(newItems))
  }
  render() {
    return (
      <div className="App">
        <div style={{paddingBottom: '3rem'}} className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Todo List</h2>
          <form onSubmit={this.FormSubmit.bind(this)}>
            <input style={{fontSize: '16px'}} placeholder='enter new item todo' value={this.state.newItemValue} onChange={this.ItemValueChanged.bind(this)}/>
            <button className="active" style={{fontSize: '18px', marginLeft: '.5rem', borderRadius: '5px', borderStyle: 'groove'}}>Add to list</button>
          </form>
        </div>
        <div style={{
          minHeight: '1100px',
          background: 'url(http://i.stack.imgur.com/ynxjD.png) repeat-y',
          backgroundPosition: 'center'
        }}>
          <ul style={{margin: '0'}}>
            {this.state.todo.map((listItem, index) => {
              return (
                <li className='first' style={{
                  listStyle: 'none',
                  margin: '0',
                }} onClick={this.onItemClick.bind(this, index)} key={index}>
                  {listItem}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
