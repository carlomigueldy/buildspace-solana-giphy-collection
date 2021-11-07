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

const useGiphyPortalIdl = () => {
  const log = useLogger("useGiphyPortalIdl");
  const solana = useSolana();
  const baseAccount = Keypair.generate();
  const programId = new PublicKey(idl.metadata.address);

  function getProgram() {
    const provider = getProvider();
    const program = new Program(idl as Idl, programId, provider);
    return program;
  }

  function getProvider() {
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

  const getGiphyList = async () => {
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
