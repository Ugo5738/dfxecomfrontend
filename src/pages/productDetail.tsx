import {
  Flex,
  Box,
  useDisclosure,
  Button,
  Collapse,
  Text,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import Seamless from "../components/seamless";
import AppButton from "../components/button";
import { useGetSingleProduct } from "../services/products";
import LoadingSpinner from "../components/loading";
import { UseAddToCartMutation } from "../services/mutation";
import { ErrorToast, SuccessToast } from "../utils/toast";
import Header from "../layouts/Header";

const ProductDetail = () => {
  const { sku } = useParams<{ sku: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const [productId, setProductId] = useState<string | undefined>(sku);
  const { mutateAsync: isAddingToCart } = UseAddToCartMutation();
  const { data: productDetail, error, isLoading, isSuccess } = useGetSingleProduct(productId!);
  const {
    images,
    product_details,
    variants,
    store_price,
    condition,
    shipping,
    onsite_pickup,
    banner_image,
    color_name,
    storage_size,
    attribute_values,
    seo_feature,
  } = productDetail || {};
  const [selectedImage, setSelectedImage] = useState<string | undefined>(images?.[0].image);
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(storage_size);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(color_name);

  useEffect(() => {
    setSelectedStorage(storage_size);
    setSelectedColor(color_name);
  }, [color_name, storage_size]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleStorageFilter = (storageName: string, storageData: string) => {
    setSelectedStorage(storageName);
    if (!storageData) return;
    setProductId(storageData);
    window.location.reload();
  };

  const handleColorFilter = (color: string) => {
    setSelectedColor(color);
    const newSKu = variants?.[color]?.available_storage?.[storage_size!];
    if (!newSKu) return;
    setProductId(sku);
    window.location.href = `/product/${newSKu}/`;
  };

  const handleAddToCart = async () => {
    const result = await isAddingToCart({ sku: sku!, quantity: 1 });
    try {
      if (!result) return;

      if (result.status === 200 || result.status === 201) {
        SuccessToast(result.data?.message as string);
      }
      navigate("/cart");
    } catch (error) {
      ErrorToast("An error occurred");
      throw new Error(error as string);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    console.log(error, "error");
  }

  return (
    <Box>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isSuccess && (
        <Box>
          <Box mx="auto" w="98%" mb="5rem" my={{ base: "2rem", md: "5rem" }}>
            <Flex flexDir="column" display={{ base: "flex", md: "none" }} mb="2rem" pl="1rem">
              <Text
                fontSize="1.5rem"
                fontWeight="600"
                color="brand.orange"
                textTransform="uppercase"
                mb=".8rem"
              >
                {condition}
              </Text>
              <Text fontSize="2rem" fontWeight="700">
                {product_details?.name}
              </Text>
              {seo_feature && (
                <Text fontSize="1.5rem" fontWeight="600">
                  {seo_feature}
                </Text>
              )}
            </Flex>
            <Flex flexDir={{ base: "column", md: "row" }}>
              <Flex flexGrow="1" flexDir={{ base: "column", md: "row" }} w="full">
                <Flex
                  flexDir={{ base: "row", md: "column" }}
                  gap={{ base: "1rem", sm: "2rem", md: "3rem" }}
                  px={{ base: "1rem", md: "2rem" }}
                  pb={{ md: "3rem" }}
                  my={{ base: "2rem", md: "0" }}
                  order={{ base: 1, md: 0 }}
                >
                  {images?.map((item, index) => (
                    <div
                      key={`${index}-${item.alt_text}`}
                      className={`hover:scale-105 transition-all duration-300 w-full min-h-[6rem] min-w-[6rem] bg-white xs:p-6 rounded-xl shadow-lg cursor-pointer ${
                        selectedImage === item.image ? "border-2 border-[#DF6A12]" : ""
                      }`}
                      onClick={() => handleImageClick(item.image)}
                    >
                      <img
                        src={item.image}
                        alt={item.alt_text || `${index}-image`}
                        className="max-h-[10rem] max-w-[10rem] min-w-20 min-h-20 w-full h-full object-cover xs:object-contain mix-blend-darken"
                      />
                    </div>
                  ))}
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  bg="bg.light"
                  p="2rem"
                  flexGrow="1"
                  order={{ base: 0, md: 1 }}
                >
                  <img
                    src={selectedImage || images?.[0].image}
                    alt="main product image"
                    className="max-h-[40rem] h-full w-full object-contain mix-blend-darken"
                  />
                </Flex>
              </Flex>
              <Flex
                flexDir="column"
                gap="3rem"
                px={{ base: "1rem", sm: "2rem" }}
                pb="3rem"
                justifyContent="space-between"
                maxW={{ md: "30rem" }}
              >
                <Flex flexDir="column" display={{ base: "none", md: "flex" }} w="full">
                  <Text
                    fontSize="1.5rem"
                    fontWeight="600"
                    color="brand.orange"
                    textTransform="uppercase"
                    mb="1rem"
                  >
                    {condition}
                  </Text>
                  <Text fontSize="2rem" fontWeight="700">
                    {product_details?.name}
                  </Text>
                  {seo_feature && (
                    <Text fontSize="1.5rem" fontWeight="600">
                      {seo_feature}
                    </Text>
                  )}
                </Flex>
                <Flex flexDir="column" gap="2rem">
                  <Text fontSize="2rem" fontWeight="600">
                    {`$${store_price}`}
                  </Text>
                  {storage_size && (
                    <Flex alignItems="center" gap="1rem" flexWrap="wrap">
                      {variants &&
                        Object.entries(variants).map(([variantName, variantData]) => {
                          const { available_storage } = variantData;
                          const isLinkedToSelectedColor = variantName === selectedColor;
                          return Object.entries(available_storage).map(
                            ([storageName, storageData], index) => {
                              return (
                                isLinkedToSelectedColor && (
                                  <Box
                                    key={`${index}-${storageName}`}
                                    px="1rem"
                                    py=".5rem"
                                    borderRadius=".6rem"
                                    border={
                                      selectedStorage === storageName
                                        ? "2px solid #DF6A12"
                                        : "1px solid #161616"
                                    }
                                    cursor="pointer"
                                    onClick={() => handleStorageFilter(storageName, storageData)}
                                  >
                                    <Text>{storageName}</Text>
                                  </Box>
                                )
                              );
                            },
                          );
                        })}
                    </Flex>
                  )}
                </Flex>
                {color_name && (
                  <Flex flexDir="column">
                    <Text fontSize="1.75rem">
                      Color: <span className="font-medium">{selectedColor || color_name}</span>
                    </Text>
                    <Flex
                      alignItems="center"
                      justifySelf="flex-start"
                      gap="1rem"
                      my="1rem"
                      flexWrap="wrap"
                    >
                      {variants &&
                        Object.entries(variants).map(([variantName, variantData]) => (
                          <Box
                            key={variantName}
                            bg={variantData.hex_code}
                            p="1rem"
                            w="3rem"
                            h="3rem"
                            rounded="full"
                            cursor="pointer"
                            border={
                              variantName === "White" && selectedColor !== variantName
                                ? "1px solid #000"
                                : "none"
                            }
                            outlineOffset="2px"
                            outline={selectedColor === variantName ? "2px solid #0086D1" : ""}
                            title={variantName}
                            onClick={() => handleColorFilter(variantName)}
                          />
                        ))}
                    </Flex>
                  </Flex>
                )}
                <AppButton
                  variant="primary"
                  height="3rem"
                  loadingText="Adding to cart"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </AppButton>
                <Flex flexDir="column" gap="2rem" borderBlock="2px solid #88888880" py="2rem">
                  {shipping && (
                    <Flex alignItems="center" gap="1rem">
                      <img
                        src="/delivery-icon.png"
                        alt="free shipping"
                        className="w-16 h-16 mix-blend-darken"
                      />
                      <Flex flexDir="column">
                        <Text fontSize="1.5rem" fontWeight="600">
                          Free Shipping and Returns
                        </Text>
                        <Text fontSize="1.25rem" color="bg.opaque">
                          Pick up your order at any DFX store close to you
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                  {onsite_pickup && (
                    <Flex alignItems="center" gap="1rem">
                      <img
                        src="/pickup-icon.png"
                        alt="pickup"
                        className="w-16 h-16 mix-blend-darken"
                      />
                      <Flex flexDir="column">
                        <Text fontSize="1.5rem" fontWeight="600">
                          On-site Pickup
                        </Text>
                        <Text fontSize="1.25rem" color="bg.opaque">
                          Pick up your order at any DFX store close to you
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Box mx="auto" w="96%" my="5rem">
            <Text fontSize="2rem" color="typography.dark" fontWeight="600">
              Product Description
            </Text>
            <Flex flexDir="column" gap="1.5rem" mt="1rem">
              {product_details?.formatted_description &&
              product_details?.formatted_description.length > 0 ? (
                product_details?.formatted_description?.map((text, index) => (
                  <UnorderedList key={index} ml="2rem">
                    <ListItem>
                      <Text fontSize="1.5rem">{text}</Text>
                    </ListItem>
                  </UnorderedList>
                ))
              ) : (
                <Text fontSize="1.5rem">{product_details?.description}</Text>
              )}
            </Flex>
          </Box>
          {attribute_values && Object.keys(attribute_values).length > 0 && (
            <Box mx="auto" w="96%" my="5rem">
              <Button onClick={onToggle} variant="link" fontSize="2rem" color="typography.dark">
                See all details
              </Button>
              <Collapse in={isOpen} animateOpacity>
                <Box mt="2rem" mx="auto" w="98%">
                  {Object.entries(attribute_values).map(([attributeName, attributeData]) => (
                    <Flex
                      key={attributeName}
                      justifyContent="space-between"
                      alignItems="center"
                      gap={{ base: "3rem", sm: "10%", md: "15%" }}
                      pr=".5rem"
                      w="full"
                    >
                      <Text fontSize="1.5rem" fontWeight="bold" mb="1rem" w="100%">
                        {attributeName}
                      </Text>
                      <UnorderedList flexGrow="1" w="50%">
                        <ListItem>{attributeData}</ListItem>
                      </UnorderedList>
                    </Flex>
                  ))}
                </Box>
              </Collapse>
            </Box>
          )}
          {banner_image && (
            <img
              src={banner_image}
              alt="main product image"
              className="max-h-[40rem] w-full mb-8 object-cover mix-blend-darken"
            />
          )}
        </Box>
      )}
      <Seamless />
      <Footer />
    </Box>
  );
};

export default ProductDetail;
