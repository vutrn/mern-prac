import ProductCard from "@/components/ProductCard";
import useProductStore from "@/store/useProductStore";
import { Container, Grid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { products, fetchProduct } = useProductStore();
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  console.log("useeffect fetch products", products);

  return (
    <Container py="12" borderRadius="1px" borderColor="black.500" borderWidth={2}>
      <VStack>
        <Text fontSize="2xl" fontWeight="bold" color="black">
          My product
        </Text>

        <Grid columns={{ base: 1, md: 2, lg: 3 }} templateColumns="repeat(4, 1fr)" gap={4}>
          {products.map((value,index) => {
            // console.log(value)
            return <ProductCard key={index} value={value} />;
          })}
        </Grid>

        {products.length === 0 && (
          <Text fontSize="xl" color="black">
            No product found
            <Link to="/create">
              <Text as="span" color="blue.500" ml="2">
                Create one
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
