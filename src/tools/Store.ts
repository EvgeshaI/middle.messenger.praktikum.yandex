type Subscriber<T> = (state: T) => void;
type Action = { type: string; [key: string]: any };
type Reducer<S, A> = (state: S, action: A) => S;

interface Store<S, A> {
  getState: () => S;
  subscribe: (fn: Subscriber<S>) => void;
  dispatch: (action: A) => void;
}

export interface IChat {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      email: string,
      login: string,
      phone: string
    },
    time: string,
    content: string,
  } | null
}
export interface IUser {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
  login: string,
  avatar: string,
  email: string
}


interface IMessage {
  chat_id: number,
  content: string
  file: string | null,
  id: number,
  is_read: boolean,
  time: string,
  type : string
  user_id: number
}


const createStore = <S, A extends Action>(reducer: Reducer<S, A>, initialState: S): Store<S, A> => {
    const subscribers: Subscriber<S>[] = [];
    let currentState = initialState;
    
    return {
      getState: () => currentState,
      subscribe: (fn: Subscriber<S>) => {
        subscribers.push(fn);
        fn(currentState);
      },
      dispatch: (action: A) => {
        currentState = reducer(currentState, action);
        subscribers.forEach(fn => fn(currentState));
      }
    };
  };
  
  const deepCopy = <T>(object: T): T => JSON.parse(JSON.stringify(object));

export interface State {
    chats: Array<IChat>,
    currentChat: IChat | null,
    user: IUser | null,
    token: string | null,
    messages: Array<IMessage>,
    usersId: Array<number>
}

const reducer = (state: State, action: Action) => {
    let newState = deepCopy(state);
    switch (action.type) {
        case 'SET_CHATS':
            newState.chats = action.chats;
            return newState;

        case 'SET_USER':
            newState.user = action.user;
            return newState;

        case 'SET_CURRENT_CHAT':
            newState.currentChat = action.currentChat;
            return newState;

        case 'SET_TOKEN':
            newState.token = action.token;
            return newState;
        case 'SET_USERS_ID':
            newState.usersId = action.usersId
            return newState
        case 'DELETE_USERS':
            newState.chats = newState.chats.filter(chat => chat.id !== action.chatId)
            newState.currentChat = null
            newState.messages = []
            return newState

        case 'ADD_MESSAGE':
            newState.chats.map(el => {
                if (el.id === action.chatId) {
                    if (el.last_message) {
                        el.last_message.content = action.message.content
                    }
                } else {
                    return el
                }
            });
            newState.messages.push(action.message)
            return newState;

        case 'ADD_OLD_MESSAGES':
            newState.messages = action.messages
            return newState;
        default:
            return state;
    }
};

let state: State = {
    chats: [],
    user: null,
    currentChat: null,
    token: null,
    messages: [],
    usersId: []
};

  let store = Object.freeze(createStore(reducer, state));

  export default store;
