import { combineReducers } from 'redux';
import { messagesReducer } from '../statemanagement/messagereducer';
import authreducer from './authreducer';
import chatIdreducer from './chatIdreducer';
//import chathistoryreducer from './chathistoryreducer';
import selectedchatidreducer from './selectedchatidreducer';


const rootReducer = combineReducers({
  messages: messagesReducer,
  auth: authreducer,
  chatIds : chatIdreducer,
  selectedChatId : selectedchatidreducer,
  //chathistory: chathistoryreducer,
  // Other reducers if needed
});

export default rootReducer;
