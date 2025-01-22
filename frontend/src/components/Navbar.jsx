import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Moon, Plus, Sun } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from "./ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  

  return (
    <Container px="4" fluid borderRadius={10} borderColor="black.500" borderWidth={2}>
      <Flex
        justifyContent="space-between"
        h="16"
        alignItems="center"
        flexDir={{ base: "column", md: "row" }}
      >
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color="black"
          textAlign={{ base: "center", md: "left" }}
        >
          <Link to="/">MERN-practice</Link>
        </Text>

        <HStack spacing="4">
          <Link to="/create">
            <Button colorScheme="blue">
              <Plus />
            </Button>
          </Link>
          <Link>
            <Button onClick={toggleColorMode}>{colorMode === "dark" ? <Sun /> : <Moon />}</Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
