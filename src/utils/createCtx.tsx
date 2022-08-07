import { createContext, useContext, Provider } from 'react';

export function createCtx<T>(): readonly [() => T, Provider<T | undefined>] {
  const ctx = createContext<T | undefined>(undefined);

  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }

  return [useCtx, ctx.Provider] as const;
}
