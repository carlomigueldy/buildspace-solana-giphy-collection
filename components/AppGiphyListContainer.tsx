import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Wrap, WrapItem } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { chakra } from "@chakra-ui/system";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGiphyPortalIdl, { Giphy } from "../hooks/useGiphyPortalIdl.hook";
import useLogger from "../hooks/useLogger.hook";

const AppGiphyListContainer = () => {
  const log = useLogger("AppGiphyListContainer");
  const idl = useGiphyPortalIdl();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [giphyList, setGiphyList] = useState<Giphy[] | null | undefined>(null);
  const [getGiphyListLoading, setGetGiphyListLoading] =
    useState<boolean>(false);
  const [sendGiphyLoading, setSendGiphyLoading] = useState<boolean>(false);
  const [createGiphyAccountLoading, setCreateGiphyAccountLoading] =
    useState<boolean>(false);

  useEffect(() => {
    getGiphyList();
  }, []);

  const sendGiphy = handleSubmit(async (data) => {
    setSendGiphyLoading(true);

    await idl.sendGiphy(data.giphyUrl);
    await getGiphyList();

    setSendGiphyLoading(false);
  });

  const getGiphyList = async () => {
    setGetGiphyListLoading(true);
    const result = await idl.getGiphyList();
    log.i("[getGiphyList] result", result);
    setGiphyList(result);
    setGetGiphyListLoading(false);
  };

  const createGiphyAccount = async () => {
    setCreateGiphyAccountLoading(true);
    await idl.createGiphyAccount();
    await getGiphyList();
    setCreateGiphyAccountLoading(false);
  };

  const LoadingSpinner = () => (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="sm"
    />
  );

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
            {sendGiphyLoading ? <LoadingSpinner /> : "Add GIPHY"}
          </Button>
        </Box>
      </form>

      {getGiphyListLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!giphyList ? (
            <Box
              mt={32}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button minWidth="125px" onClick={createGiphyAccount}>
                {createGiphyAccountLoading ? (
                  <LoadingSpinner />
                ) : (
                  "Do One-Time Initialization For GIPHY Program Account"
                )}
              </Button>
            </Box>
          ) : (
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
          )}
        </>
      )}
    </>
  );
};

export default AppGiphyListContainer;
