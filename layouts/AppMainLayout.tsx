import { Box, Text } from "@chakra-ui/layout";
import AppFooter from "../components/AppFooter";
import AppNavbar from "../components/AppNavbar";

export type AppMainLayoutProps = {
  children?: React.ReactNode;
  onClickConnectWallet?: () => void;
};

const AppMainLayout = ({
  children,
  onClickConnectWallet,
}: AppMainLayoutProps) => {
  return (
    <>
      <AppNavbar onClickConnectWallet={onClickConnectWallet} />

      {<Box minHeight="100vh">{children}</Box>}

      <AppFooter />
    </>
  );
};

export default AppMainLayout;
