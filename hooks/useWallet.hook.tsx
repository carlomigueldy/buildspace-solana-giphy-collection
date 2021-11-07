import { useToast } from "@chakra-ui/toast";
import { useContext, useEffect, useState } from "react";
import GlobalContext, { WalletAddress } from "../context/global";
import { useSolana } from "./useSolana.hook";

export const useWallet = () => {
  const toast = useToast();
  const solana = useSolana();
  const [walletAddress, setWalletAddress] = useState<WalletAddress>(null);
  const globalContext = useContext(GlobalContext);

  function truncatedWalletAddress() {
    if (!walletAddress) {
      return "";
    }

    const segments: string[] = walletAddress?.split("");
    const [first, second, third] = segments;
    const firstLast = segments[segments.length - 3];
    const secondLast = segments[segments.length - 2];
    const thirdLast = segments[segments.length - 1];

    return `${first}${second}${third}...${firstLast}${secondLast}${thirdLast}`;
  }

  useEffect(() => {
    globalContext.walletAddress = walletAddress;
    globalContext.truncatedWalletAddress = truncatedWalletAddress();
  }, [walletAddress]);

  async function initialize() {
    try {
      if (!solana) {
        return _solanaWalletNotFoundToast();
      }

      if (!solana.isConnected) {
        console.warn("[useWallet->initialize] Wallet not connected to dApp");
      }

      if (solana.isPhantom) {
        const response = await solana.connect({ onlyIfTrusted: true });
        const walletAddress = response.publicKey?.toString();
        console.log("✅ Connected with Public Key:", walletAddress);
        setWalletAddress(walletAddress);
        console.log(`[useWallet->initialize] walletAddress`, walletAddress);
      }

      setWalletAddress(walletAddress);
    } catch (error) {
      console.error(error);
      return _unexpectedErrorToast();
    }
  }

  async function connect() {
    if (!solana) {
      return _solanaWalletNotFoundToast();
    }

    try {
      const response = await solana.connect();
      const walletAddress = response.publicKey?.toString();
      console.log("✅ Connected with Public Key:", walletAddress);
      setWalletAddress(walletAddress);
      console.log("[useWallet->connect] walletAddress", walletAddress);
    } catch (error: any) {
      console.error(error);

      if (error.code === 4001) {
        return toast({
          title: "Rejected",
          description: error.message,
          status: "info",
        });
      }

      return _unexpectedErrorToast();
    }
  }

  function _solanaWalletNotFoundToast() {
    return toast({
      title: "Solana Wallet not found",
      description: "Download and install a Phantom Wallet to continue",
      status: "warning",
    });
  }

  function _unexpectedErrorToast(description?: string) {
    return toast({
      title: "Error",
      description: description || "An unexpected error occurred",
      status: "error",
    });
  }

  return {
    initialize,
    connect,
    walletAddress,
    hasWalletAddress: !!walletAddress,
    connected: solana?.isConnected,
    truncatedWalletAddress,
  };
};
