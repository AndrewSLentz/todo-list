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
    if (this.state.newItemValue !== '') {
      var ItemValue = this.state.todo.concat([
        {
          text: this.state.newItemValue,
          completed: false
        }
      ]);
      this.setState({todo: ItemValue, newItemValue: ""});
      localStorage.setItem('todo', JSON.stringify(ItemValue))
    }
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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Todo List</h2>
          <form onSubmit={this.FormSubmit.bind(this)}>
            <input style={{
              marginBottom: '.2rem',
              fontSize: '16px'
            }} placeholder='enter new item todo' value={this.state.newItemValue} onChange={this.ItemValueChanged.bind(this)}/>
            <button className="active" style={{
              fontSize: '18px',
              marginLeft: '.5rem',
              borderRadius: '5px',
              borderStyle: 'groove'
            }}>Add to list</button>
          </form>
        </div>
        <div style={{
          boxShadow: '1px 2px 10px black',
          margin: '0 auto',
          maxWidth: '974px',
          minHeight: '1100px',
          background: 'url(http://i.stack.imgur.com/ynxjD.png) repeat-y',
          backgroundPosition: 'center'
        }}>
          <ul style={{
            padding: '0',
            margin: '0',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {this.state.todo.map((listItem, index) => {
              return (
                <li className='first' style={{
                  listStyle: 'none',
                  margin: '0'
                }} onClick={this.onItemClick.bind(this, index)} key={index}>
                  <span className='hover'>{listItem.text}</span>
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