
function isEqual(lhs: any, rhs: any): boolean {
    return lhs === rhs;
}

function render(query: string, block: any): HTMLElement {
    const root = document.getElementById(query);
    if (!root) {
        throw new Error(`No element found for selector: ${query}`);
    }
    root.innerHTML = '';
    root.append(block.getContent())
    return root as HTMLElement;
}

export class Route {
    _pathname: string;
    _blockClass: any;
    _block: any;
    _props: { rootQuery: string };

    constructor(pathname: string, view: any, props: { rootQuery: string }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            const root = document.getElementById(this._props.rootQuery);
            if (root) {
                root.innerHTML = ''; // Удалить содержимое root
            }
            this._block = null;
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(_route?: Route, _pathname?: string): void {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }
        render(this._props.rootQuery, this._block);
    }
}

export default class Router {
    static __instance: Router;
    routes: Route[] = [];
    history: History = window.history;
    _currentRoute: Route | null = null;
    _rootQuery!: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: any) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start(): void {
        window.onpopstate = ((event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}
