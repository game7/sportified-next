import { RefObject } from "react";
interface HubOptions {
  name?: string;
  origin: string;
  target: Window | RefObject<HTMLIFrameElement>;
}
const defaultOptions: HubOptions = {
  origin: "*",
  target: typeof window !== "undefined" && window,
};

export interface Hub<TMessageMap extends Record<string, any>> {
  send: <TName extends keyof TMessageMap>(
    name: TName,
    payload: TMessageMap[TName]
  ) => void;
  subscribe: <TName extends keyof TMessageMap>(
    name: TName,
    handler: MessageHandler<TMessageMap[TName]>
  ) => { unsubscribe: () => void };
}

export const useHub = <TMessageMap extends Record<string, any>>(
  options: Partial<HubOptions> = {}
): Hub<TMessageMap> => {
  //
  options = { ...defaultOptions, ...options };

  const target: Window = (() => {
    if ((options.target as Window).postMessage) {
      return (options.target as Window).parent;
    }
    if ((options.target as RefObject<HTMLIFrameElement>).current) {
      return (options.target as RefObject<HTMLIFrameElement>).current
        .contentWindow;
    }
    return null;
  })();

  const send = <TName extends keyof TMessageMap>(
    name: TName,
    payload: TMessageMap[TName] = null
  ) => {
    target && target.postMessage({ name, payload }, options.origin);
  };

  const subscribe = <TName extends keyof TMessageMap>(
    name: TName,
    handler: MessageHandler<TMessageMap[TName]>
  ) => {
    //
    const messageEventHandler = (
      event: MessageEvent<Message<TMessageMap, TName>>
    ) => subscription(event, name, handler);

    const attachEventListener = () => {
      target.addEventListener("message", messageEventHandler);
    };

    const detachEventListener = () => {
      target.removeEventListener("message", messageEventHandler);
    };

    attachEventListener();
    return { unsubscribe: detachEventListener };
  };

  const subscription = <TName extends keyof TMessageMap>(
    event: MessageEvent<Message<TMessageMap, TName>>,
    name: TName | "*",
    handler: MessageHandler<TMessageMap[TName]>
  ) => {
    if (name === "*" || event.data.name === name) {
      handler(event.data.payload);
    }
  };

  return { send, subscribe };
};

export interface Message<M extends Record<string, any>, T extends keyof M> {
  name: T;
  payload: M[T];
}

export type MessageHandler<TPayload extends any> = (payload: TPayload) => void;
