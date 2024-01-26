type RequestRedirect = 'error' | 'follow' | 'manual';
type RequestCache =
  | 'default'
  | 'force-cache'
  | 'no-cache'
  | 'no-store'
  | 'only-if-cached'
  | 'reload';
type RequestCredentials = 'same-origin' | 'include' | 'omit';
type RequestMode = 'cors' | 'navigate' | 'no-cors' | 'same-origin';
type BufferSource = ArrayBufferView | ArrayBuffer;
type XMLHttpRequestBodyInit = string | Blob | BufferSource | FormData | URLSearchParams;
type BodyInit = ReadableStream<any> | XMLHttpRequestBodyInit;
type HeadersInit = [string, string][] | Record<string, string> | Headers;

export type RequestOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
};

type HttpMethodsWithBody = 'post' | 'put' | 'patch' | 'delete';
type HttpMethodsWithoutBody = 'get' | 'head' | 'options';
export type AuthorizedAWSFetch = {
  /**
   * @param path - The request URL path
   * @param method - The HTTP method
   * @param data - The request body (Required for 'post' | 'put' | 'patch' | 'delete')
   * @param options - Additional request options
   */
  (path: string, method: HttpMethodsWithBody, data: string, options?: object): Promise<any>;
  (path: string, method?: HttpMethodsWithoutBody, options?: object): Promise<any>;
};
