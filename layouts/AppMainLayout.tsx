import { Box, Text } from "@chakra-ui/layout";
import AppFooter from "../components/AppFooter";
import AppNavbar from "../components/AppNavbar";

export type AppMainLayoutProps = {
  children?: React.ReactNode;
};

const AppMainLayout = ({ children }: AppMainLayoutProps) => {
  return (
    <>
      <AppNavbar onClickConnectWallet={() => console.log("Hello World")} />

      {<Box minHeight="100vh">{children}</Box>}

      <AppFooter />
    </>
  );
};

export default AppMainLayout;
