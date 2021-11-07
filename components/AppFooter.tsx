import { Box, Link } from "@chakra-ui/layout";

const AppFooter = () => {
  return (
    <Box p={5} display="flex" justifyContent="center" alignItems="center">
      Built with 💖 by{" "}
      <Link ml={2} href="https://twitter.com/CarloMiguelDy">
        carlomigueldy.eth
      </Link>
    </Box>
  );
};

export default AppFooter;
