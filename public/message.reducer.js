
function messages(state = [], action) {
  if(action.type == 'addmessage') {
    var newState = state.concat([action.nouveauMessage]);
    return newState;
  } else {
    console.log('messages');
    return state;
  }
}

module.exports = messages;
