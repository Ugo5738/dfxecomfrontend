/* eslint-disable @typescript-eslint/no-floating-promises */
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
import { clearAuthRefreshToken, clearAuthToken, getAuthToken } from "../utils/auth";
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
  const [dropdown, setDropdown] = useState(false);
  const { data: orderSummaryData, isSuccess } = useGetOrderSummary({
    enabled: !!isLoggedIn,
  });
  const optionRef = useRef<HTMLDivElement | null>(null);
  const handleOutsideClick = (e: MouseEvent) => {
    if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
      setOpenSearch(false);
      setOpen(false);
      setDrop(false);
      setDropdown(false);
    }
  };
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
            <nav className="ms-3">
              <ul className="nav">
                <li className="nav-item profile-image">
                  <div className="pro-holder">{"DFX"}</div>
                  <div className="dropdown" ref={optionRef}>
                    <button
                      type="button"
                      className="d-flex align-items-center"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      {"DFX"} <i className="fas fa-chevron-down"></i>
                    </button>
                    {dropdown && (
                      <ul className="dropdown-menus">
                        <li>
                          <button className="dropdown-item" onClick={logout}>
                            Logout
                          </button>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            profile
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
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
                <ul className="nav">
                  <li className="nav-item profile-image">
                    <div className="pro-holder">{"DFX"}</div>
                  </li>
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
          .pro-holder {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            width: 4rem;
            height: 4rem;
            padding: 1rem;
            border-radius: 50%;
            background-color: #ccc;
            border: 1px solid #848383;
          }
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
            .pro-holder {
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 600;

              width: 4rem;
              height: 4rem;
              padding: 0.5rem;
              border-radius: 50%;
              background-color: #ccc;
              border: 1px solid #848383;
            }
            button {
              background-color: transparent;
              border: 0;
            }
          }
          @media screen and (max-width: 900px) {
            .dropdown {
              display: none;
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
        border-bottom: 1px solid #161616;
        transition: 1s ease-in-out;
        transition: 0.5s;

        .btn {
          h3 {
            font-weight: 700;
            font-size: 18px;
          }
        }
        .mobile-open {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1rem;
          // transition: all 1s ease-in-out;
          a {
            display: flex;
            padding: 5px 2px;
          }
        }
        .comp-open {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1rem;
          // transition: all 1s ease-in-out;
          a {
            display: flex;
            padding: 5px 2px;
          }
        }
        .assec-open {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1rem;
          // transition: all 1s ease-in-out;
          a {
            display: flex;
            padding: 5px 2px;
          }
        }
        .game-open {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1rem;
          // transition: all 1s ease-in-out;
          a {
            display: flex;
            padding: 5px 2px;
          }
        }
        .wear-open {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1rem;
          // transition: all 1s ease-in-out;
          a {
            display: flex;
            padding: 5px 2px;
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
