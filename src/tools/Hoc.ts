import store from "./Store";

interface State {
}
interface Props {
}

export function connect<T extends new (...args: any[]) => any>(Component: T) {
  return class extends Component {
    constructor(...args: any[]) {
      super(...args);

      store.subscribe(() => {
        this.setProps({ ...(store.getState() as State) });
      });

      console.log(this);
    }
    setProps(_props: Partial<Props> & State) {
    }
  };
}
