import { Idl, Program, Provider } from "@project-serum/anchor";
import {
  clusterApiUrl,
  Connection,
  ConnectionConfig,
  Keypair,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import idl from "../idl/giphyportal.json";
import useLogger from "./useLogger.hook";
import useSolana from "./useSolana.hook";
import kp from "../keypair.json";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";

export type Giphy = {
  gifLink: string;
  userAddress: PublicKey;
};

const useGiphyPortalIdl = () => {
  const log = useLogger("useGiphyPortalIdl");
  const solana = useSolana();
  const programId = new PublicKey(idl.metadata.address);
  const toast = useToast();
  const [baseAccount, setBaseAccount] = useState<Keypair>();

  useEffect(() => {
    const baseAccount = generateKeyPair();
    setBaseAccount(baseAccount);
  }, []);

  function generateKeyPair(): Keypair {
    const arr = Object.values(kp._keypair.secretKey);
    const secret = new Uint8Array(arr);
    const baseAccount = Keypair.fromSecretKey(secret);
    return baseAccount;
  }

  function getProgram(): Program<Idl> {
    const provider = getProvider();
    const program = new Program(idl as Idl, programId, provider);
    return program;
  }

  function getProvider(): Provider {
    const network = clusterApiUrl("devnet");
    const options = {
      preflightCommitment: "processed" as ConnectionConfig,
    };
    const connection = new Connection(network, options.preflightCommitment);
    const provider = new Provider(
      connection,
      solana,
      options.preflightCommitment
    );
    return provider;
  }

  const getGiphyList = async (): Promise<Giphy[] | null> => {
    if (!baseAccount) {
      _noBaseAccountFoundToast();
      return null;
    }

    try {
      const program = getProgram();
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      log.i("Got the account", account);
      return account.gifList;
    } catch (error) {
      log.e("Error in getGifs: ", error);
      return null;
    }
  };

  const createGiphyAccount = async () => {
    if (!baseAccount) {
      _noBaseAccountFoundToast();
      return;
    }

    try {
      const provider = getProvider();
      const program = getProgram();
      await program.rpc.initialize({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      log.i(
        "Created a new BaseAccount w/ address:",
        baseAccount.publicKey.toString()
      );
    } catch (error) {
      log.e("Error creating BaseAccount account:", error);
    }
  };

  const sendGiphy = async (giphyUrl: string) => {
    if (!baseAccount) {
      _noBaseAccountFoundToast();
      return;
    }

    try {
      const program = getProgram();
      await program.rpc.addGif(giphyUrl, {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      });
      log.i("GIF sucesfully sent to program", giphyUrl);
    } catch (error) {
      log.e("Error sending GIF:", error);
    }
  };

  function _noBaseAccountFoundToast() {
    toast({
      title: "No Account",
      description: "No base account found",
      status: "warning",
    });
    log.w("No base account found", __dirname);
  }

  return {
    idl,
    programId,
    getProvider,
    getProgram,
    createGiphyAccount,
    getGiphyList,
    sendGiphy,
  };
};

export default useGiphyPortalIdl;
