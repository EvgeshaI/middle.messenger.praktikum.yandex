const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(data) {
  const str = [];
  for (const [key, value] of Object.entries(data)) {
    const k = key;
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      str.push(`${k}=[object Object]`);
    } else if (Array.isArray(value)) {
      str.push(`${k}=${value.join(',')}`);
    } else {
      str.push(`${k}=${value}`);
    }
  }
  const resultStr = str.join('&');
  return `?${resultStr}`;
}

export class HTTPTransport {
  get = (url, options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  put = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url, options, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
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
