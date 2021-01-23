import { createContext, useContext } from 'react';

export const OwnerContext = createContext();

export function useOwner() {
  return useContext(OwnerContext);
}