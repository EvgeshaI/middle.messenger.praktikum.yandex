import EventBus from "./EventBus";
import Handlebars from "handlebars";

interface Props {
  [key: string]: any;
  attr?: Record<string, string>;
  events?: Record<string, EventListener>;
}

interface PropsWithChildren extends Props {
  children?: Record<string, Block>;
  lists?: Record<string, Block[]>;
}

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
    FLOW_WILL_UNMOUNT: "flow:component-will-unmount"
  };

  _element: HTMLElement | null = null;
  _id: number = Math.floor(100000 + Math.random() * 900000);
  props: Props;
  children: Record<string, Block>;
  lists: Record<string, Block[]>;
  eventBus: () => EventBus;

  constructor(propsWithChildren: PropsWithChildren = {}) {
    const eventBus = new EventBus();
    const {props, children, lists} = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({...props});
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const {events = {}} = this.props;
    Object.keys(events).forEach(eventName => {this._element!.addEventListener(eventName, events[eventName])} );

  }
  _removeEvents() {
    const {events = {}} = this.props;
    Object.keys(events).forEach(eventName => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
  }

  componentDidMount(_oldProps?: Props) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(_oldProps?: Props, _newProps?: Props) {
    return true;
  }

  _componentWillUnmount() {
    this._removeEvents();
    this.componentWillUnmount();
    Object.values(this.children).forEach(child => {
      child.dispatchComponentWillUnmount();
    });
  }

  componentWillUnmount() {}

  dispatchComponentWillUnmount() {
    this.eventBus().emit(Block.EVENTS.FLOW_WILL_UNMOUNT);
  }

  _getChildrenPropsAndProps(propsAndChildren: PropsWithChildren) {
    const children: Record<string, Block> = {};
    const props: Props = {};
    const lists: Record<string, Block[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if(Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {children, props, lists};
  }

  addAttributes() {
    const {attr = {}} = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (typeof value === "string") {
        this._element!.setAttribute(key, value);
      }
    });
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  get element() {
    return this._element;
  }

  _render() {
    console.log("Render")
    const propsAndStubs = { ...this.props };
    const _tmpId =  Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, _child]) => {
        propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`) as Element
      stub.replaceWith(child.getContent()!);
    });

    Object.entries(this.lists).forEach(([_key, child]) => {
      const listCont = this._createDocumentElement('template') as HTMLTemplateElement;;
      child.forEach(item => {
        if (item instanceof Block) {
            listCont.content.append(item.getContent()!);
        } else {
            listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`) as Element;
      stub.replaceWith(listCont.content);
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Props, prop:string, value) {
        const oldTarget = {...target};
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty (): never {
        throw new Error('No access');
      }
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}
