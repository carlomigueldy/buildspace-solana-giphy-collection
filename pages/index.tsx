import { Box, Link, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import AppMainLayout from "../layouts/AppMainLayout";

declare let window: any;

const Home: NextPage = () => {
  const toast = useToast();

  useEffect(() => {
    initWallet();
  }, []);

  async function initWallet() {
    try {
      let solana;
      if (typeof window !== "undefined") {
        solana = window.solana;
      }

      if (!solana) {
        return toast({
          title: "Solana Wallet not found",
          description: "Download and install a Phantom Wallet to continue",
          status: "warning",
        });
      }

      if (solana.isPhantom) {
        console.log("solana.isPhantom", solana.isPhantom);
      }
    } catch (error) {
      console.error(error);
      return toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred",
        status: "error",
      });
    }
  }

  return (
    <AppMainLayout>
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
