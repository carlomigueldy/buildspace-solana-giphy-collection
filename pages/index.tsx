import { Box } from "@chakra-ui/layout";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AppNavbar from "../components/AppNavbar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <AppNavbar onClickConnectWallet={() => console.log("Hello World")} />

      <Box minHeight="100vh"></Box>
      <Box minHeight="100vh"></Box>
      <Box minHeight="100vh"></Box>
    </>
  );
};

export default Home;
