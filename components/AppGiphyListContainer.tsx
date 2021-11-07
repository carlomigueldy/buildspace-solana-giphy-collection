import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Wrap, WrapItem } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { useForm } from "react-hook-form";
import { GIFS } from "../constants/giphy";

const AppGiphyListContainer = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box display="flex" justifyContent="center" alignItems="start">
          <Box width="300px">
            <Input
              placeholder="Enter a GIPHY URL"
              {...register("giphyUrl", { required: true })}
              errorBorderColor="crimson"
              isInvalid={errors.giphyUrl}
            />
            {errors.giphyUrl ? (
              <chakra.p pt={2}>⚠️ This field is required</chakra.p>
            ) : null}
          </Box>
          <Button ml={2} type="submit">
            Add GIPHY
          </Button>
        </Box>
      </form>

      <Wrap spacing="30px" my={10} mx={5}>
        {GIFS.map((gif, index) => {
          return (
            <WrapItem key={index}>
              <Image
                src={gif}
                borderRadius="sm"
                alt={gif}
                height="200"
                width="200"
                transition="all .2s ease-in-out"
                cursor="pointer"
                onClick={() => window.open(gif, "_blank")}
                _hover={{
                  transform: "scale(1.25)",
                }}
              />
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};

export default AppGiphyListContainer;
