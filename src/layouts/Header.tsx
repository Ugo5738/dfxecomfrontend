/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
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
import { clearAuthRefreshToken, clearAuthToken, getAuthToken } from "../utils/auth";
import { PiSignInLight } from "react-icons/pi";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import AppButton from "../components/button";
import DropdownNav from "../components/dropdownNav";
import { SearchProps } from "../utils/types";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import URLS from "../services/urls";
import axios from "../services/axios";
import { getShopURLWithCategory } from "../utils/urlUtils";
import { useLocation } from "react-router-dom";

interface IProduct {
  product_name: string;
  sku: string;
}

interface CategoryChild {
  id: number;
  name: string;
  is_active: boolean;
  is_trending: boolean;
  image?: string; // Assuming image can be optional
  children: CategoryChild[]; // Assuming children is an array of CategoryChild
}

interface Category {
  id: number;
  name: string;
  children: CategoryChild[];
}

interface User {
  id: number;
  first_name: string;
}

const maxDepth = 1;

const Header = ({ searchTerm, setSearchTerm }: SearchProps) => {
  const isLoggedIn = getAuthToken();
  const [categories, setCategories] = useState<Category[]>([]);
  const [openCategories, setOpenCategories] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [drop, setDrop] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dropdown, setDropdown] = useState(false);
  const optionRef = useRef(null);
  // const optionRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { data: orderSummaryData, isSuccess } = useGetOrderSummary({
    enabled: !!isLoggedIn,
  });
  const userIsAdmin = () => {
    return currentUser && currentUser.first_name === "admin";
  };
  // const handleOutsideClick = (e: MouseEvent) => {
  //   if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
  //     setOpenSearch(false);
  //     setOpen(false);
  //     setDrop(false);
  //     setDropdown(false);
  //   }
  // };
  const logout = () => {
    clearAuthRefreshToken();
    clearAuthToken();
    setDropdown(false);
    window.location.href = "/login";
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
        const nextPage = response?.data?.next as string;
        // Fetch next page, if available
        if (nextPage) {
          const nextPageResponse = await axios.get(nextPage);

          setSuggestions((prev) => [...prev, ...(nextPageResponse?.data?.results as [])]);
          const prev = nextPageResponse?.data?.previous as string;
          if (prev) {
            const prevPage = await axios.get(prev);
            setSuggestions((prev) => [...prev, ...(prevPage?.data?.results as [])]);
          }
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const { products } = orderSummaryData?.order_summary || {};
  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideClick);

  //   return () => document.removeEventListener("click", handleOutsideClick);
  // });

  const toggleCategoryOpen = (categoryId: number) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter((id) => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };

  const isCategoryOpen = (categoryId: number) => {
    return openCategories.includes(categoryId);
  };

  const fetchUserDetails = async () => {
    const token = getAuthToken(); // This should retrieve the token from sessionStorage
    if (!token) {
      console.error("No auth token available");
      // Handle the case where there is no token—maybe redirect to login page
      return;
    }

    try {
      const response = await fetch(`${URLS.API_URL}${URLS.CURRENT_USER}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // If the token is expired or invalid, handle the logic to refresh it or re-authenticate
          // You might want to call `clearAuthToken()` here and redirect to the login
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Additional logic to handle the error
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    console.log("Current user state:", currentUser);
  }, [currentUser]);

  // This function handles the recursion for categories and their children
  const renderCategories = (categories, depth = 0) => {
    if (depth > maxDepth) return null; // Stop rendering if max depth is exceeded

    return categories.map((category) => (
      <div className={`dropdown-items depth-${depth}`} key={category.id}>
        {depth === 0 ? (
          // For top-level categories, use a button to toggle the open state
          <button className="btn" onClick={() => toggleCategoryOpen(category.id)}>
            <h3 className="m-0">{category.name}</h3>
          </button>
        ) : (
          // For sub-categories, use a link instead of a button
          <Link to={getShopURLWithCategory(category.name)}>
            <h5 className="m-0">{category.name}</h5>
          </Link>
        )}

        {isCategoryOpen(category.id) && (
          <div className={`category-open depth-${depth}`}>
            {category.children.map((item) => (
              <div key={item.id}>
                <Link to={getShopURLWithCategory(item.name)} title={item.name}>
                  <h5 className="m-0">
                    {item.image && (
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={item.image}
                        alt={item.name}
                        mr="12px"
                      />
                    )}
                    <span>{item.name}</span>
                  </h5>
                </Link>
                {renderCategories(item.children, depth + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URLS.API_URL}${URLS.CATEGORY_INVENTORY}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unexpected error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    // Parse the URL query parameters
    // const query = new URLSearchParams(location.search);
    // const categoryParam = query.get('category');

    fetchCategories();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

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
              <div className="sugg" ref={optionRef}>
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
          <div className="left flex items-center">
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
            <nav className="ms-3">
              <ul className="relative">
                {currentUser && (
                  <li>
                    <div className="" ref={optionRef}>
                      <button
                        type="button"
                        className="d-flex align-items-center btn-user-name"
                        style={{ fontSize: "1.6rem" }}
                        onClick={() => setDropdown(!dropdown)}
                      >
                        {currentUser.first_name} <i className="fas fa-chevron-down ml-2"></i>
                      </button>
                      {dropdown && (
                        <ul className="absolute bg-white top-8 shadow rounded py-4 -left-20 w-[10rem] text-2xl">
                          <li className="pb-2 cursor-pointer">
                            <button onClick={logout}>Logout</button>
                          </li>
                          <li className="pb-2 cursor-pointer">
                            <Link className="dropdown-item" to="/profile">
                              Profile
                            </Link>
                          </li>
                            {userIsAdmin() && (                              
                              <li>
                                 <a className="dropdown-item" href="https://dfx-new-ef6dfb73e89a.herokuapp.com/api/order-management/inventory-order-list/" target="_blank" rel="noopener noreferrer">
                                  Order
                                </a>
                                <a className="dropdown-item" href="https://dfx-new-ef6dfb73e89a.herokuapp.com/api/inventory/update-done/" target="_blank" rel="noopener noreferrer">
                                  Products
                                </a>
                              </li>
                            )}
                        </ul>
                      )}
                    </div>
                  </li>
                )}
              </ul>
            </nav>
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
            <div className="open-search ms-5" ref={optionRef}>
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
                  {drop && (
                    <div className="sugest" ref={optionRef}>
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
            <div className="d-flex align-items-center">
              <Flex as={Link} ml={{ xs: "-1rem", md: "0" }} to="/cart">
                <BsCart3 className="text-[#171923] h-10 w-10" />
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
              <nav className="ms-2">
                <ul className="nav relative">
                  {currentUser && (
                    <li className="nav-item profile-image">
                      <div className="relative" ref={optionRef}>
                        <button
                          title="dropdownButton"
                          type="button"
                          className="d-flex align-items-center btn-user-name"
                          style={{ fontSize: "1.6rem" }}
                          onClick={() => setDropdown(!dropdown)}
                        >
                          <FaUserCircle size={24} />
                        </button>
                        {dropdown && (
                          <ul className="absolute -left-24 shadow text-2xl top-10 bg-white rounded py-4 px-8">
                            <li className="pb-2">
                              <button onClick={logout} className="cursor-pointer">
                                Logout
                              </button>
                            </li>
                            <li className="pb-2">
                              <Link className="dropdown-item" to="/profile">
                                Profile
                              </Link>
                            </li>
                            {userIsAdmin() && (
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="https://dfx-new-ef6dfb73e89a.herokuapp.com/api/order-management/inventory-order-list/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Order
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="https://dfx-new-ef6dfb73e89a.herokuapp.com/api/inventory/update-done/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Products
                                </a>
                              </li>
                            )}
                          </ul>
                        )}
                      </div>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
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
            {/* Invoke the recursive function to render categories up to the max depth */}
            {renderCategories(categories)}
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
            ) : (
              <div>
                <button
                  onClick={logout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#df6a12",
                    fontWeight: "600",
                    color: "#fff",
                    width: "100%",
                    borderRadius: "10px",
                    padding: "9px 1rem",
                  }}
                >
                  Log Out
                </button>
              </div>
            )}

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
const Wrapper = styled.div`
  header {
    width: 100%;
    .top-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      height: 80px;
      width: 100%;
      background-color: rgba(255, 255, 255, 1);
      .search-item {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 50%;
        z-index: 7;

        .form-group {
          display: flex;
          align-items: center;
          border-radius: 100px;
          border: 1px solid #161616;
          opacity: 0.75;
          width: 100%;
          padding: 10px;
          input {
            width: 100%;
            font-size: 18px;
            &:focus,
            &:active {
              outline: none;
              border: none;
            }
          }
        }
        .sugg {
          position: absolute;
          top: 5rem;
          width: 100%;
          height: 32vh;
          border: 1px solid #ccc;
          overflow-y: scroll;
          background-color: #fff;
          border-radius: 10px;
          &::-webkit-scrollbar {
            overflow: hidden;
          }

          padding: 1rem;
          z-index: 7;
          ul {
            z-index: 7;
            padding: 0;

            li {
              z-index: 7;
              font-size: 18px;
              font-weight: 600;
              padding: 3px 5px;
              cursor: pointer;
            }
          }
        }
      }
      .logo {
        font-family: Lato;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
      .left {
        display: flex;
        gap: 2rem;
      }
      nav {
        width: auto;
        .profile-image {
          display: flex;
          align-items: center;
          gap: 1rem;
          button {
            background-color: transparent;
            border: 0;
          }
        }
        .dropdown {
          position: relative;
          .dropdown-menus {
            position: absolute;
            top: 3rem;
            left: -2rem;
            border: 1px solid #e3e2e2;
            padding: 10px;
            border-radius: 5px;
            background-color: #fff;
            font-size: 16px;
            li {
              padding: 0 2.5rem;
              margin-bottom: 1rem;
            }
          }
        }
        @media screen and (max-width: 760px) {
          .dropdown {
            display: none;
          }
          /* .avatar {
              margin-right: 1rem;
            } */
        }
      }
    }
    .text {
      font-size: 18px;
      font-weight: 700;
      font-family: Lato;
      height: 40px;
      background-color: rgba(62, 63, 205, 1);
    }

    @media screen and (max-width: 760px) {
      display: none;
      .top-header {
        // height: 5vh;
        .logo {
          font-size: 20px;
        }
        .form-group {
          display: none;
        }
      }
      .left {
        .d-flex {
          display: none;
        }
      }
      .text {
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
  .mobile {
    display: none;
    position: relative;
    .top {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-direction: column;
      width: 100%;
      background-color: rgba(255, 255, 255, 1);
      &-nav {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 8.5vh;
        width: 100%;
        .logo {
          font-family: Lato;
          font-size: 20px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        .open-search {
          .search {
            display: flex;
            flex-direction: column;
            gap: 10px;
            position: absolute;
            padding: 1rem 5px 5px 5px;
            top: 0;
            left: 0;
            width: 100%;
            border-radius: 0 0 10px 10px;
            background-color: white;
            z-index: 7;

            .form-group {
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgb(255, 255, 255);
              margin: 0;
              border-radius: 100px;

              input {
                width: 100%;
                background: transparent;
                font-size: 18px;
              }
            }
            .sugest {
              width: 100%;
              border-radius: 10px;
              height: 100vh;
              border: 1px solid #ccc;
              overflow-y: scroll;
              &::-webkit-scrollbar {
                overflow: hidden;
              }
              z-index: 7;

              ul {
                padding: 0;

                li {
                  padding: 1rem 1.5rem;
                  font-size: 18px;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .hamburger {
          font-size: 20px;
        }
        nav {
          width: auto;
          .profile-image {
            display: flex;
            align-items: center;
            gap: 1rem;
            button {
              background-color: transparent;
              border: 0;
            }
          }
          .dropdown {
            position: relative;
            .dropdown-menus {
              position: absolute;
              top: 3rem;
              left: -2rem;
              border: 1px solid #e3e2e2;
              padding: 10px;
              border-radius: 5px;
              background-color: #fff;
              font-size: 16px;
              li {
                padding: 0 2.5rem;
                margin-bottom: 1rem;
              }
            }
          }
          @media screen and (max-width: 900px) {
            .dropdown {
              display: block;
            }
            /* .avatar {
              margin-right: 1rem;
            } */
          }
        }
      }
      .form-group {
        display: flex;
        align-items: center;
        border-radius: 100px;
        border: 1px solid #161616;
        width: 100%;
        padding: 3px;
        opacity: 0.75;
        margin-bottom: 1rem;
        input {
          &:focus,
          &:active {
            outline: 0;
            border: none;
          }
        }
      }
    }
    .text {
      font-size: 18px;
      font-weight: 600;
      font-family: Lato;
      height: 50px;
      background-color: rgba(62, 63, 205, 1);
    }
    .dropdowns {
      min-height: 100vh;
      min-width: 80vw;
      display: flex;
      transition: 1s ease-in-out;
      transition: 0.5s;
      flex-direction: column;
      justify-content: space-between;
      display: none;
      &-item {
        margin-top: 4rem;
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        justify-content: space-between;
        // background-color: rgb(224, 224, 237);
      }
      .text-end {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-size: 20px;
        padding: 1rem;
        z-index: 5;
        .logo {
          font-family: Lato;
          font-size: 30px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
      }
      .dropdown-items {
        transition: 0.5s;

        &.depth-0 {
          border-bottom: 1px solid #161616; // Border for top-level categories only
          padding-left: 5px; // Increase left padding for top-level categories to push them further to the right

          .btn {
            h3 {
              font-weight: 700;
              font-size: 18px; // Style for top-level category names
            }
          }
        }

        &.depth-1 {
          padding-left: 40px; // Left padding for sub-categories

          .btn {
            h5 {
              font-size: 1em;
              font-weight: normal; // Style for sub-level category names
            }
          }
        }

        .category-open {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1rem;

          a {
            display: flex;
            padding: 5px 2px;

            span {
              margin-left: 20px;
              font-weight: bold;
            }
          }

          .depth-0 {
            .btn h3 {
              font-size: 1.2em;
              font-weight: bold; // Reinforce style for top-level category names if needed
            }
          }

          .depth-1 {
            .btn h5 {
              font-size: 1em;
              font-weight: normal; // Reinforce style for sub-level category names if needed
            }
          }
        }
      }

      @media screen and (max-width: 760px) {
        justify-content: space-between;
        position: absolute;
        display: block;
        background-color: white;
        top: 0;
        z-index: 3;

        &.close {
          left: -1000px;
        }

        &.open {
          left: 0;
        }
      }
    }
    @media screen and (max-width: 760px) {
      display: block;
    }
  }
`;
