import { createContext } from "react";

export type WalletAddress = string | null | undefined;

export type GlobalContextState = {
  walletAddress?: WalletAddress;
  truncatedWalletAddress?: WalletAddress;
};

const GlobalContext = createContext<GlobalContextState>({
  walletAddress: null,
});

export default GlobalContext;
