import { Box, Link, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import AppMainLayout from "../layouts/AppMainLayout";
import * as web3 from "@solana/web3.js";
import { useWallet } from "../hooks/useWallet.hook";

const Home: NextPage = () => {
  const wallet = useWallet();

  useEffect(() => {
    wallet.initialize();
  }, []);

  return (
    <AppMainLayout onClickConnectWallet={wallet.connect}>
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
        </Box>
      </Box>
    </AppMainLayout>
  );
};

export default Home;
