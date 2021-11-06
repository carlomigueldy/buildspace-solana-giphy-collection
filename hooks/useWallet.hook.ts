import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useSolana } from "./useSolana.hook";

export const useWallet = () => {
  const toast = useToast();
  const [wallet, setWallet] = useState<string | null | undefined>(null);

  async function initialize() {
    const solana = useSolana();

    try {
      if (!solana) {
        return _solanaWalletNotFoundToast();
      }

      if (!solana.isConnected) {
        console.warn("[useWallet] Wallet not connected to dApp");
      }

      if (solana.isPhantom) {
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          "✅ Connected with Public Key:",
          response.publicKey?.toString()
        );
        setWallet(response.publicKey?.toString());
      }
    } catch (error) {
      console.error(error);
      return _unexpectedErrorToast();
    }
  }

  async function connect() {
    const solana = useSolana();

    if (!solana) {
      return _solanaWalletNotFoundToast();
    }

    try {
      const response = await solana.connect();
      console.log(
        "✅ Connected with Public Key:",
        response.publicKey?.toString()
      );
      setWallet(response.publicKey?.toString());
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

  return { initialize, connect, wallet, hasWallet: !!wallet };
};
