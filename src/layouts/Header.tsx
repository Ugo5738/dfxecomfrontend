/* eslint-disable prettier/prettier */
import { CiSearch } from "react-icons/ci";
import {
  Flex,
  Text,
  Image,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGetOrderSummary } from "../services/order";
import { getAuthToken } from "../utils/auth";
import { PiSignInLight } from "react-icons/pi";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import AppButton from "../components/button";
import DropdownNav from "../components/dropdownNav";
import { SearchProps } from "../utils/types";
import styled from "styled-components";
import {
  mobileDropdownMenu,
  computingDropdownMenu,
  accessoriesDropdownMenu,
  gamingDropdownMenu,
  wearablesDropdownMenu,
} from "../utils/dummyData";
import { useEffect, useState, useRef } from "react";
import URLS from "../services/urls";
import axios from "../services/axios";

interface IProduct {
  product_name: string;
  sku: string;
}

const Header = ({ searchTerm, setSearchTerm }: SearchProps) => {
  const isLoggedIn = getAuthToken();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compOpen, setCompOpen] = useState(false);
  const [assesOpen, setAssesOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [wearOpen, setWearOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [drop, setDrop] = useState(false);
  const { data: orderSummaryData, isSuccess } = useGetOrderSummary({
    enabled: !!isLoggedIn,
  });
  const optionRef = useRef<HTMLDivElement | null>(null);
  const handleOutsideClick = (e: MouseEvent) => {
    if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
      setOpenSearch(false);
      setOpen(false);
    }
  };
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDrop(Boolean(e.target.value));
    if (e.target.value.length > 1) {
      const eParam = e.target.value;
      try {
        const response = await axios.get(URLS.SUGGESTION(eParam));
        const data = response?.data?.results as [];
        setSuggestions(data);
        // const nextPage = response?.data?.next as string;
        // Fetch next page, if available
        // if (nextPage) {
        //   const nextPageResponse = await axios.get(nextPage);

        //   setSuggestions((prev) => [...prev, ...(nextPageResponse?.data?.results as [])]);
        //   const prev = nextPageResponse?.data?.previous as string;
        //   if (prev) {
        //     const prevPage = await axios.get(prev);
        //     setSuggestions((prev) => [...prev, ...(prevPage?.data?.results as [])]);
        //   }
        // }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const { products } = orderSummaryData?.order_summary || {};
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  });

  return (
    <Wrapper>
      <header className="">
        <div className="top-header container">
          <h1 className="logo m-0">
            <Link to="/">DFX LOGO</Link>
          </h1>
          <div className="search-item">
            <div className="form-group">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search..."
              />
              <CiSearch className="text-[#171923] h-8 w-8 hover:cursor-pointer" />
            </div>
            {drop && (
              <div className="sugg">
                <div className="sugest">
                  <ul>
                    {suggestions?.map((sug, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          setSearchTerm(sug?.product_name);
                          setDrop(false);
                        }}
                      >
                        {sug?.product_name}{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="left">
            <div className="d-flex">
              {!isLoggedIn ? (
                <Popover placement="bottom">
                  {/* <PopoverTrigger>
                <Image
                  alt="Profile"
                  src="/profile-icon.png"
                  boxSize="2rem"
                  cursor="pointer"
                />
              </PopoverTrigger> */}
                  <PopoverContent>
                    <PopoverArrow bg="brand.nav" />
                    <PopoverCloseButton color="red" fontSize="1rem" />
                    <PopoverBody pt="3rem" px=".5rem">
                      {/* Sign-in option */}
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        gap="2rem"
                        as={Link}
                        to="/login"
                      >
                        <Text color="brand.dark" fontWeight="500" fontSize="1.25rem">
                          Sign In
                        </Text>
                        <PiSignInLight className="text-[#171923] h-12 w-12" />
                      </Flex>
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        gap="2rem"
                        as={Link}
                        to="/register"
                      >
                        <Text
                          color="brand.dark"
                          fontWeight="600"
                          fontSize="20px"
                          fontFamily="Roboto Flex"
                        >
                          Register
                        </Text>
                        <PiSignInLight className="text-[#171923] h-12 w-12" />
                      </Flex>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              ) : null}

              {!isLoggedIn ? (
                <Flex
                  display={{ base: "none", md: "flex" }}
                  justifyContent="space-between"
                  alignItems="center"
                  gap="3rem"
                >
                  <AppButton
                    variant="primary"
                    borderRadius="5px"
                    fontWeight="600"
                    fontSize="20px"
                    fontFamily="Roboto Flex"
                    paddingRight="2rem"
                    paddingLeft="2rem"
                    to="/register"
                  >
                    Register
                  </AppButton>
                  <AppButton
                    variant="outline"
                    borderRadius="5px"
                    fontWeight="400"
                    fontSize="20px"
                    fontFamily="Roboto Flex"
                    paddingRight="2rem"
                    paddingLeft="2rem"
                    to="/login"
                  >
                    Sign In
                  </AppButton>
                </Flex>
              ) : null}
            </div>
            <Flex as={Link} ml={{ xs: "-1rem", md: "0" }} to="/cart">
              <BsCart3 className="text-[#171923] h-12 w-12" />
              <Text
                rounded="full"
                bg="typography.red"
                color="white"
                h="2rem"
                w="2rem"
                ml="-3"
                mt="-2"
                textAlign="center"
                fontWeight="600"
              >
                {isSuccess ? products?.length : "0"}
              </Text>
            </Flex>
          </div>
        </div>
        <div className="text d-flex align-items-center justify-content-center w-100 text-light ">
          Fast and free delivery
        </div>
        <div className="dropdown-nav">
          <DropdownNav />
        </div>
      </header>
      <div className="mobile " ref={optionRef}>
        <div className="top container">
          <div className="top-nav">
            <button className="hamburger  border-0 bg-transparent " onClick={() => setOpen(true)}>
              <FaBars />
            </button>
            <h1 className="logo">
              <Link to="/">DFX LOGO</Link>
            </h1>
            <div className="open-search" ref={optionRef}>
              <CiSearch
                onClick={() => setOpenSearch(true)}
                className="text-[#171923] h-8 w-8 hover:cursor-pointer"
              />
              {openSearch && (
                <div className="search">
                  <div className="form-group">
                    <div className="fs-1 me-2">
                      <CiSearch />
                    </div>

                    <input
                      type="text"
                      value={searchTerm}
                      placeholder="search..."
                      onChange={handleInputChange}
                      // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div
                      className="fx fs-3 p-2 me-2"
                      onClick={() => {
                        setOpenSearch(false);
                        setSearchTerm("");
                      }}
                    >
                      <FaX />
                    </div>
                  </div>
                  {searchTerm && (
                    <div className="sugest">
                      <ul>
                        {suggestions?.map((sug, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              setSearchTerm(sug?.product_name);
                              setDrop(false);
                            }}
                          >
                            {sug?.product_name}{" "}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* <CiSearch className="text-[#171923] h-8 w-8 hover:cursor-pointer" /> */}
                </div>
              )}
            </div>
            <Flex as={Link} ml={{ xs: "-1rem", md: "0" }} to="/cart">
              <BsCart3 className="text-[#171923] h-12 w-12" />
              <Text
                rounded="full"
                bg="typography.red"
                color="white"
                h="2rem"
                w="2rem"
                ml="-3"
                mt="-2"
                textAlign="center"
                fontWeight="600"
              >
                {isSuccess ? products?.length : "0"}
              </Text>
            </Flex>
          </div>
        </div>
        <div className="text d-flex align-items-center justify-content-center w-100 text-light ">
          Fast and free delivery
        </div>
        <div className={`dropdowns ${open ? "open" : "close"}`}>
          <div className="text-end " onClick={() => setOpen(false)}>
            <h1 className="logo">DFX LOGO</h1>
            <FaX />
          </div>
          <div className="dropdowns-item">
            <div className="dropdown-items">
              <button className="btn" onClick={() => setMobileOpen(!mobileOpen)}>
                <h3 className="m-0">Mobile</h3>
              </button>
              {mobileOpen && (
                <div className="mobile-open">
                  {mobileDropdownMenu.map((item) => (
                    <div key={item.id}>
                      <h5 title={item.category}>
                        {item.items.map((item) => (
                          <Link key={item.id} to={`/shop/${item.title}`}>
                            <Image
                              boxSize="2rem"
                              borderRadius="full"
                              src={item.image}
                              alt={item.title}
                              mr="12px"
                            />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="dropdown-items">
              <button className="btn" onClick={() => setCompOpen(!compOpen)}>
                <h3 className="m-0"> Computing</h3>
              </button>

              {compOpen && (
                <div className="comp-open">
                  {computingDropdownMenu.map((item) => (
                    <div key={item.id}>
                      <h5 title={item.category} className="m-0">
                        {item.items.map((item) => (
                          <Link key={item.id} to={`/shop/${item.title}`}>
                            <Image
                              boxSize="2rem"
                              borderRadius="full"
                              src={item.image}
                              alt={item.title}
                              mr="12px"
                            />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="dropdown-items">
              <button className="btn" onClick={() => setAssesOpen(!assesOpen)}>
                <h3 className="m-0"> Accessories</h3>
              </button>
              {assesOpen && (
                <div className="assec-open">
                  {accessoriesDropdownMenu.map((item) => (
                    <div key={item.id}>
                      <h5 title={item.category} className="m-0">
                        {item.items.map((item) => (
                          <Link key={item.id} to={`/shop/${item.title}`}>
                            <Image
                              boxSize="2rem"
                              borderRadius="full"
                              src={item.image}
                              alt={item.title}
                              mr="12px"
                            />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="dropdown-items">
              <button className="btn" onClick={() => setGameOpen(!gameOpen)}>
                <h3 className="m-0">Gaming</h3>
              </button>
              {gameOpen && (
                <div className="game-open">
                  {gamingDropdownMenu.map((item) => (
                    <div key={item.id}>
                      <h5 className="m-0" title={item.category}>
                        {item.items.map((item) => (
                          <Link key={item.id} to={`/shop/${item.title}`}>
                            <Image
                              boxSize="2rem"
                              borderRadius="full"
                              src={item.image}
                              alt={item.title}
                              mr="12px"
                            />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="dropdown-items">
              <button className="btn" onClick={() => setWearOpen(!wearOpen)}>
                <h3 className="m-0">Wearables</h3>
              </button>
              {wearOpen && (
                <div className="wear-open">
                  {wearablesDropdownMenu.map((item) => (
                    <div key={item.id}>
                      <h5 title={item.category} className="m-0">
                        {item.items.map((item) => (
                          <Link key={item.id} to={`/shop/${item.title}`}>
                            <Image
                              boxSize="2rem"
                              borderRadius="full"
                              src={item.image}
                              alt={item.title}
                              mr="12px"
                            />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="d-fle mt-5 p-3">
            {!isLoggedIn ? (
              <Popover placement="bottom">
                {/* <PopoverTrigger>
                <Image
                  alt="Profile"
                  src="/profile-icon.png"
                  boxSize="2rem"
                  cursor="pointer"
                />
              </PopoverTrigger> */}
                <PopoverContent>
                  <PopoverArrow bg="brand.nav" />
                  <PopoverCloseButton color="red" fontSize="1rem" />
                  <PopoverBody pt="3rem" px=".5rem">
                    {/* Sign-in option */}
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      gap="2rem"
                      as={Link}
                      to="/login"
                      onClick={() => setOpen(false)}
                    >
                      <Text color="brand.dark" fontWeight="500" fontSize="1.25rem">
                        Sign In
                      </Text>
                      <PiSignInLight className="text-[#171923] h-12 w-12" />
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      gap="2rem"
                      as={Link}
                      to="/register"
                    >
                      <Text
                        color="brand.dark"
                        fontWeight="600"
                        fontSize="20px"
                        fontFamily="Roboto Flex"
                        onClick={() => setOpen(false)}
                      >
                        Register
                      </Text>
                      <PiSignInLight className="text-[#171923] h-12 w-12" />
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : null}

            {!isLoggedIn ? (
              <Flex justifyContent="space-between" alignItems="center" gap="3rem">
                <AppButton
                  variant="primary"
                  borderRadius="5px"
                  fontWeight="600"
                  fontSize="20px"
                  fontFamily="Roboto Flex"
                  paddingRight="2rem"
                  paddingLeft="2rem"
                  to="/register"
                  onClick={() => setOpen(false)}
                >
                  Register
                </AppButton>
                <AppButton
                  variant="outline"
                  borderRadius="5px"
                  fontWeight="400"
                  fontSize="20px"
                  fontFamily="Roboto Flex"
                  paddingRight="2rem"
                  paddingLeft="2rem"
                  to="/login"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </AppButton>
              </Flex>
            ) : null}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
const Wrapper = styled.div``;
