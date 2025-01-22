import { Box, Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { Delete, Edit } from "lucide-react";
import { useColorModeValue } from "./ui/color-mode";
import useProductStore from "@/store/product";
import { toaster } from "./ui/toaster";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.700");

  const { deleteProduct } = useProductStore();
  
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toaster.create({ title: "Error", description: message, type: "error", duration: 2000 });
    } else {
      toaster.create({ title: "Success", description: message, type: "success", duration: 2000 });
    }
  }
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image src={product.image} alt={product.name} />
      <Box p={4}>
        <Heading as="h4" size="md" my={2}>
          {product.name}
        </Heading>
        <Text fontSize="sm" color={textColor}>
          ${product.price}
        </Text>
        <HStack justify="flex-end" mt={4}>
          <IconButton color="blue" variant={"surface"}>
            <Edit />
          </IconButton>
          <IconButton
            color="red"
            variant={"surface"}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <Delete />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
