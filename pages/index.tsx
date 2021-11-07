import type { NextPage } from "next";
import { Box, Text } from "@chakra-ui/layout";
import { useWallet } from "../hooks/useWallet.hook";
import { useEffect } from "react";
import AppMainLayout from "../layouts/AppMainLayout";
import AppGiphyListContainer from "../components/AppGiphyListContainer";

const Home: NextPage = () => {
  const wallet = useWallet();

  useEffect(() => {
    wallet.initialize();
  }, []);

  return (
    <AppMainLayout
      onClickConnectWallet={wallet.connect}
      showConnectWallet={!wallet.connected}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box>
          <Text fontSize="5xl" fontWeight="bold">
            🖼 GIPHY Portal
          </Text>
          <Text fontSize="2xl">
            View your GIF collection in the metaverse ✨
          </Text>
          {/* <Button mt={2}>Get Started</Button> */}
        </Box>
      </Box>
      <Box my={32}>
        <AppGiphyListContainer />
      </Box>
    </AppMainLayout>
  );
};

export default Home;
