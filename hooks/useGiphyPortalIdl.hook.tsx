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
import { useSolana } from "./useSolana.hook";

const useGiphyPortalIdl = () => {
  const solana = useSolana();
  const baseAccount = Keypair.generate();
  const programId = new PublicKey(idl.metadata.address);
  const network = clusterApiUrl("devnet");
  const opts = {
    preflightCommitment: "processed" as ConnectionConfig,
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(connection, solana, opts.preflightCommitment);
    return provider;
  };

  const getGifList = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl as Idl, programId, provider);
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      console.log("[useGiphyPortalIdl] Got the account", account);
      return account.gifList;
    } catch (error) {
      console.log("[useGiphyPortalIdl] Error in getGifs: ", error);
      return null;
    }
  };

  const createGifAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl as Idl, programId, provider);
      console.log("ping");
      await program.rpc.initialize({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        "[useGiphyPortalIdl] Created a new BaseAccount w/ address:",
        baseAccount.publicKey.toString()
      );
    } catch (error) {
      console.log(
        "[useGiphyPortalIdl] Error creating BaseAccount account:",
        error
      );
    }
  };

  return {
    idl,
    programId,
    createGifAccount,
    getProvider,
    getGifList,
  };
};

export default useGiphyPortalIdl;
