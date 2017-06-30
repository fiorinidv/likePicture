var React     = require('react');
var ReactDOM  = require('react-dom');
var createStore =  require('redux').createStore;
var Provider    =  require('react-redux').Provider;
var connect     = require('react-redux').connect;

var combineReducers = require('redux').combineReducers;
var messages  = require('./message.reducer');

var globalReducers = combineReducers({messages});
var store = createStore(globalReducers);

class Picture extends React.Component {
 
   constructor() {
    super();
  
  }
  
  render() {

    return(
      <div className="row">
        <div className="col-xs-offset-4 col-xs-4">
          <img className="img-responsive" src="./flowers.jpg" />
          <MessageFormRedux/>
          <MessageListRedux/>
        </div>
      </div>
     )
  }
}



class MessageForm extends React.Component {
  
  constructor() {
    super();
    this.handleChange     = this.handleChange.bind(this);
    this.handleSubmit     = this.handleSubmit.bind(this);
    this.state = {};
  }
  
  handleChange(event) {
    this.setState({nouveauMessage: event.target.value});
  }
 
  handleSubmit(event) {
    event.preventDefault();
    this.props.onHandleSubmit(this.state.nouveauMessage);
  }
  
  render() {

    return(
  
      <div className="form-signin">
        <form onSubmit={this.handleSubmit}>
          <label className="sr-only">Message</label>
          <input onChange={this.handleChange} type="text" id="message" className="form-control" placeholder="votre message" />
          <input id="valider" className="btn btn-warning  btn-lg btn-block" value="Valider" type="submit" />
        </form>
      </div>
        
     )
  }
}  


function mapDispatchToProps(dispatch) {
  return {
    onHandleSubmit: function(message) { 
        dispatch( {type: 'addmessage', nouveauMessage: message} ) 
    }
  }
}
var MessageFormRedux = connect(
    null, 
    mapDispatchToProps
)(MessageForm);


class MessageList extends React.Component {
  
  constructor() {
    super();
    this.handleClick     = this.handleClick.bind(this);
    this.state = { likes : 0};
  }
  
  handleClick() {
    this.setState({likes: this.state.likes + 1});
  }
  
  render() {
     
     var messages = [];     
     for(var i=0; i<this.props.messages.length; i++) {
      messages.push(<li className="list-group-item">{this.props.messages[i]}</li>);
     }   
   
    return(
      <div>
        <h2 className="form-signin-heading">{this.state.likes} like(s) <a onClick={this.handleClick}><span className="glyphicon glyphicon-thumbs-up"></span></a></h2>
        <ul className="list-group">
        {messages}
        </ul>
      </div>
     )
  }
}  

function mapStateToProps(state) {
  return { 
    messages: state.messages,
  }
}

var MessageListRedux = connect(
    mapStateToProps, 
    null
)(MessageList);

ReactDOM.render(  
    <Provider store={store}>
      <Picture/>
    </Provider>
  ,
  document.getElementById('container')
);