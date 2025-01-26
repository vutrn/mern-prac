import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import useProductStore from "@/store/useProductStore";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Delete, Edit } from "lucide-react";
import { useState } from "react";
import { useColorModeValue } from "./ui/color-mode";
import { toaster } from "./ui/toaster";

const ProductCard = ({ value }) => {
  const [product, setProduct] = useState(value);
  const { deleteProduct, updateProduct } = useProductStore();

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.700");

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toaster.create({ title: "Success", description: message, type: "success", duration: 2000 });
    } else {
      toaster.create({ title: "Error", description: message, type: "error", duration: 2000 });
    }
  };

  const handleUpdateProduct = async (id, product) => {
    console.log("ID", id, "PRODUCT", product);
    const { success, message } = await updateProduct(id, product);
    if (success) {
      toaster.create({ title: "Success", description: message, type: "success", duration: 2000 });
      //! CLOSE THE DIALOG
    } else {
      
      toaster.create({ title: "Error", description: message, type: "error", duration: 2000 });
    }
    
  };

  // const ref = useRef<HTMLInputElement>(null)

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image src={value.image} alt={value.name} objectFit="fit" w="600px" />
      <Box p={4}>
        <Heading as="h4" size="md" my={2}>
          {value.name}
        </Heading>
        <Text fontSize="sm" color={textColor}>
          ${value.price}
        </Text>
        <HStack justify="flex-end" mt={4}>
          <DialogRoot >
            <DialogTrigger asChild>
              <IconButton color="blue" variant={"surface"}>
                <Edit />
              </IconButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product</DialogTitle>
              </DialogHeader>
              <DialogBody pb="4">
                <Stack gap="4">
                  <Field label="Product name">
                    <Input
                      type="text"
                      placeholder="Product Name"
                      value={product.name}
                      onChange={(event) => setProduct({ ...product, name: event.target.value })}
                    />
                  </Field>
                  <Field label="Price">
                    <Input
                      type="number"
                      placeholder="Price"
                      value={product.price}
                      onChange={(event) => {
                        setProduct({ ...product, price: event.target.value });
                      }}
                    />
                  </Field>
                  <Field label="Image URL">
                    <Input
                      placeholder="Image URL"
                      value={product.image}
                      onChange={(event) => {
                        setProduct({ ...product, image: event.target.value });
                      }}
                    />
                  </Field>
                </Stack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button onClick={() => handleUpdateProduct(product._id, product)}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
          <IconButton
            color="red"
            variant={"surface"}
            onClick={() => handleDeleteProduct(value._id)}
          >
            <Delete />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
