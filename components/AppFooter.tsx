import { Box, Link } from "@chakra-ui/layout";

const AppFooter = () => {
  return (
    <Box
      p={5}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      Built with 💖 by{" "}
      <Link href="https://twitter.com/CarloMiguelDy">carlomigueldy.eth</Link>
    </Box>
  );
};

export default AppFooter;
