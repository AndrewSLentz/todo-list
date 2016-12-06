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
  onItemCompleteClick(index, e) {
    var completedToggle = this.state.todo.slice(0);
    completedToggle[index].completed = !completedToggle[index].completed;
    this.setState({'todo': completedToggle})
    localStorage.setItem('todo', JSON.stringify(completedToggle))
  }
  clearCompletedItems(array) {
    var stillTodo = array.filter((item, index) => {
      return !item.completed
    })
    this.setState({todo: stillTodo})
    localStorage.setItem('todo', JSON.stringify(stillTodo))
  }
  onItemDeleteClick(index, e) {
    var head = this.state.todo.slice(0, index);
    var tail = this.state.todo.slice(index + 1, this.state.todo.length);
    var newItems = head.concat(tail);
    if (this.state.todo[index].completed) {
      this.setState({todo: newItems})
      localStorage.setItem('todo', JSON.stringify(newItems))
    } else {
      var confirmed = confirm(this.state.todo[index].text + " has not been marked as complete. Are you sure you wish to delete?");
      if (confirmed === true) {
        this.setState({todo: newItems})
        localStorage.setItem('todo', JSON.stringify(newItems))
      }
    }
  }
  onMouseEnterDelete() {
    this.setState({
      buttonIsHovered: true
    })
  }
  onMouseLeaveDelete() {
    this.setState({
      buttonIsHovered: false
    })
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
              backgroundColor: 'lightgrey',
              fontSize: '18px',
              marginLeft: '.5rem',
              borderRadius: '5px',
              borderStyle: 'groove'
            }}>Add to list</button>
            <button onMouseEnter={this.onMouseEnterDelete.bind(this)} onMouseLeave={this.onMouseLeaveDelete.bind(this)} className='active' style={{
              fontSize: '18px',
              backgroundColor: 'lightgrey',
              marginTop: '5px',
              marginLeft: '.5rem',
              borderRadius: '5px',
              borderStyle: 'groove'
            }} onClick={this.clearCompletedItems.bind(this, this.state.todo)}>Clear Completed items</button>
          </form>
        </div>
        <div style={{
          boxShadow: '1px 2px 10px black',
          margin: '0 auto',
          maxWidth: '974px',
          minHeight: '1100px',
          background: 'url(https://i.stack.imgur.com/ynxjD.png) repeat-y',
          backgroundPosition: 'center'
        }}>
          <ul style={{
            padding: '0',
            margin: '0'
          }}>
            {this.state.todo.map((listItem, index) => {
              return (
                <li className='first' style={{
                  listStyle: 'none',
                  margin: '0'
                }} key={index}>
                  <i onClick={this.onItemDeleteClick.bind(this, index)} className="fa fa-trash" aria-hidden="true"></i>
                  <span className={listItem.completed && this.state.buttonIsHovered ? 'hover completed' : 'hover'} style={{
                    textDecoration: listItem.completed
                      ? 'line-through'
                      : 'none'
                  }} onClick={this.onItemCompleteClick.bind(this, index)}>{listItem.text}</span>
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
