const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
type Methods = typeof METHODS[keyof typeof METHODS]

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

interface RequestOptions {
  headers?: Record<string, string>;
  method?: Methods;
  data?: any;
  timeout?: number;
}

interface Options {
  method?: Methods;
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
}

function queryStringify(data: Record<string, any>): string  {
  const str = [];
  for (const [key, value] of Object.entries(data)) {
    const k = key;
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      str.push(`${k}=[object Object]`);
    } else if (Array.isArray(value)) {
      str.push(`${k}=${value!.join(',')}`);
    } else {
      str.push(`${k}=${value}`);
    }
  }
  const resultStr = str.join('&');
  return `?${resultStr}`;
}


export class HTTPTransport {

  createMethod(method: Methods): HTTPMethod {
    return (url: string, options: Options = {}) => (
        this.request(url, {...options, method}, options.timeout)
    );
  }

  get = this.createMethod(METHODS.GET);
  put = this.createMethod(METHODS.PUT);
  post = this.createMethod(METHODS.POST);
  delete = this.createMethod(METHODS.DELETE);

  request = (url: string, options: RequestOptions, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject)  => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
