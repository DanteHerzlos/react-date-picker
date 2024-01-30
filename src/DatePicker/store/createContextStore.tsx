import {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

export default function createContextStore<Store>(initialState: Store) {
  function useStoreData(state: Store): {
    get: () => Store;
    set: (value: Partial<Store>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(state);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  function Provider({value, children }: {value?: Store, children: React.ReactNode }) {
    let storeData
    if(value){
      storeData = useStoreData(value)
    } else {
      storeData = useStoreData(initialState)
    }
    return (
      <StoreContext.Provider value={storeData}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Store not found");
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState),
    );

    return [state, store.set];
  }

  return {
    Provider,
    useStore,
  };
}
