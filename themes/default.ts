import { extendTheme } from "@chakra-ui/react";
import "@fontsource/sora";

const theme = extendTheme({
  fonts: {
    heading: "Sora",
    body: "Sora",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
});

export default theme;
