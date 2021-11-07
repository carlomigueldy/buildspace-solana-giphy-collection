import { Box } from "@chakra-ui/layout";
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

      <Box mx="auto" maxW="1200px" minHeight="100vh">
        {children}
      </Box>

      <AppFooter />
    </>
  );
};

export default AppMainLayout;
