import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Wrap, WrapItem } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { PublicKey } from "@solana/web3.js";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GIFS } from "../constants/giphy";
import GlobalContext from "../context/global";
import useGiphyPortalIdl from "../hooks/useGiphyPortalIdl.hook";
import useLogger from "../hooks/useLogger.hook";
import { useWallet } from "../hooks/useWallet.hook";

export type Giphy = {
  gifLink: string;
  userAddress: PublicKey;
};

const AppGiphyListContainer = () => {
  const log = useLogger("AppGiphyListContainer");
  const wallet = useWallet();
  const globalContext = useContext(GlobalContext);
  const idl = useGiphyPortalIdl();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [giphyList, setGiphyList] = useState<Giphy[] | null | undefined>(null);

  useEffect(() => {
    getGiphyList();
  }, []);

  useEffect(() => {
    log.i(
      "[AppGiphyListContainer] wallet.walletAddress",
      globalContext.walletAddress
    );
  }, [globalContext.walletAddress]);

  const sendGiphy = handleSubmit(async (data) => {
    log.i(data);

    await idl.sendGiphy(data.giphyUrl);
    await getGiphyList();
  });

  const getGiphyList = async () => {
    const result = await idl.getGiphyList();
    log.i("[getGiphyList] result", result);
    setGiphyList(result);
  };

  const createGifAccount = async () => {
    await idl.createGiphyAccount();
    await getGiphyList();
  };

  return (
    <>
      <form onSubmit={sendGiphy}>
        <Box display="flex" justifyContent="center" alignItems="start">
          <Box width="300px">
            <Input
              placeholder="Enter a GIPHY URL"
              {...register("giphyUrl", { required: true })}
              errorBorderColor="crimson"
              isInvalid={errors.giphyUrl}
            />
            {errors.giphyUrl ? (
              <chakra.p pt={2}>⚠️ This field is required</chakra.p>
            ) : null}
          </Box>
          <Button ml={2} type="submit">
            Add GIPHY
          </Button>
        </Box>
      </form>

      {!giphyList ? (
        <Box mt={32} display="flex" justifyContent="center" alignItems="center">
          <Button onClick={createGifAccount}>
            Do One-Time Initialization For GIPHY Program Account
          </Button>
        </Box>
      ) : (
        <>
          <Wrap spacing="30px" my={10} mx={5}>
            {giphyList?.map((gif, index) => {
              return (
                <WrapItem key={index}>
                  <Image
                    src={gif.gifLink}
                    borderRadius="sm"
                    alt={gif.gifLink}
                    height="200"
                    width="200"
                    transition="all .2s ease-in-out"
                    cursor="pointer"
                    onClick={() => window.open(gif.gifLink, "_blank")}
                    _hover={{
                      transform: "scale(1.25)",
                    }}
                  />
                </WrapItem>
              );
            })}
          </Wrap>
        </>
      )}
    </>
  );
};

export default AppGiphyListContainer;
