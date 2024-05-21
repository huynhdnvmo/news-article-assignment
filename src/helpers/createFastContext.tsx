import lodashGet from "lodash/get";
import isEqual from "lodash/isEqual";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type BaseStates = { [x: string]: any };

type UseSetStateReturns<StateValues extends BaseStates = BaseStates> = (
  value: Partial<StateValues> | ((states?: StateValues) => StateValues)
) => void;

// https://github.com/jherr/fast-react-context/blob/main/fast-context-generic/src/createFastContext.tsx
export default function createFastContext<
  StateValues extends BaseStates = BaseStates
>(initialState?: StateValues) {
  function useContextStatesData(): {
    get: () => StateValues;
    set: UseSetStateReturns<StateValues>;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(initialState as StateValues);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set: UseSetStateReturns<StateValues> = useCallback((value) => {
      if (typeof value === "function") {
        store.current = { ...store.current, ...value(store.current) };
        subscribers.current.forEach((callback) => callback());
        return;
      }
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return { get, set, subscribe };
  }

  type UseContextStatesDataReturns = ReturnType<typeof useContextStatesData>;

  const StoreContext = createContext<UseContextStatesDataReturns | null>(null);

  function Provider({ children }: { children: ReactNode }) {
    return (
      <StoreContext.Provider value={useContextStatesData()}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useGetState<SelectorOutput>(
    selector: (store: StateValues) => SelectorOutput
  ): SelectorOutput {
    const store = useContext(StoreContext);

    if (!store) {
      throw new Error("Store not found");
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState as StateValues)
    );

    return state;
  }

  function useSetState(): UseSetStateReturns<StateValues> {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Store not found");
    }
    return store.set;
  }

  function useInitState(
    field: keyof StateValues,
    value?: number | string | boolean | Array<any> | { [x: string]: any },
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    options: {
      when: "once-on-mount" | "whenever-value-changes";
    } = {
      when: "once-on-mount",
    }
  ) {
    const setState = useSetState();
    const state = useGetState((s) => lodashGet(s, field));
    const [init, setInit] = useState(false);

    const forceUpdate = options?.when === "whenever-value-changes";

    useEffect(() => {
      if (init && !forceUpdate) return;
      if (
        (typeof value === "undefined" || value === null || value === "") &&
        !forceUpdate
      ) {
        return;
      }

      if (value instanceof Array || typeof value === "object") {
        if (isEqual(value, state)) return;
        setInit(true);
        setState({ [field]: value } as any);
        return;
      }

      if (typeof value === "function") {
        setInit(true);
        setState({ [field]: value } as any);
        return;
      }

      if (value === state) return;

      setInit(true);
      setState({ [field]: value } as any);
      // eslint-disable-next-line no-useless-return
      return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
  }

  return {
    Provider,
    useGetState,
    useSetState,
    useInitState,
  };
}
