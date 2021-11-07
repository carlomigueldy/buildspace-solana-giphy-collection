import { Box, Text } from "@chakra-ui/layout";
import AppFooter from "../components/AppFooter";
import AppNavbar from "../components/AppNavbar";

export type AppMainLayoutProps = {
  children?: React.ReactNode;
  onClickConnectWallet?: () => void;
  showConnectWallet?: boolean;
};

const AppMainLayout = ({
  children,
  onClickConnectWallet,
  showConnectWallet,
}: AppMainLayoutProps) => {
  return (
    <>
      <AppNavbar
        onClickConnectWallet={onClickConnectWallet}
        showConnectWallet={showConnectWallet}
      />

      {<Box minHeight="100vh">{children}</Box>}

      <AppFooter />
    </>
  );
};

export default AppMainLayout;
