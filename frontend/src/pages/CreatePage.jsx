import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import useProductStore from "@/store/product";
import { Box, Button, Container, Heading, Input, useToastStyles, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { create } from "zustand";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({ title: "Error", description: message, type: "error", duration: 2000 });
    }
    console.log("success", success, "message", message);
  };
  return (
    <Container maxW="container.sm" py="8">
      <VStack>
        <Heading size="2xl" textAlign="center">
          Create a new product
        </Heading>

        <Box w="xl" bg={useColorModeValue("white", "gray.800")} p="6" rounded="lg" shadow="md">
          <VStack spacing={4}>
            <Input
              placeholder="product name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button colorScheme={"blue"} onClick={handleAddProduct}>
              Add product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
