type Subscriber<T> = (state: T) => void;
type Action = { type: string; [key: string]: any };
type Reducer<S, A> = (state: S, action: A) => S;

interface Store<S, A> {
  getState: () => S;
  subscribe: (fn: Subscriber<S>) => void;
  dispatch: (action: A) => void;
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

interface State {
  buttonText: string;
}
  
  const reducer = (state: State, action: Action) => {
    let newState = deepCopy(state);
    if(action.type === 'SET_TEXT') {
      console.log('SET_TEXT')
      newState.buttonText = action.buttonText;
      return newState;
    } else {
      return state;
    }
  };
    
    
  let state: State = {
    buttonText: 'Initial text'
  };
  
  // let setTextAction: Action = {
  //   type: 'SET_TEXT',
  //   buttonText: ''
  // };

  let store = Object.freeze(createStore(reducer, state));

  // store.dispatch({
  //   type: 'SET_TEXT',
  //   buttonText: 'Updated text'
  // });

  export default store;
