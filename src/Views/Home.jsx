import React from 'react'
import { useNavigate } from "react-router-dom";

import {
  Button,
  Img,
  Line,
  List,
  PagerIndicator,
  RatingBar,
  Slider,
  Text,
} from "../components";
import Footer from "../components/Footer"
function Home() {

  const navigate = useNavigate();

  const sliderRef = React.useRef(null);
  const [sliderState, setsliderState] = React.useState(0);
  return (
    <>
    <div className="bg-gray_50 flex flex-col font-poppins items-center justify-start mx-auto w-full">
      <div className="bg-gradient  flex flex-col items-center justify-start p-[50px] md:px-10 sm:px-5 w-full">
        <div className="flex flex-col md:gap-10 gap-[70px] items-center justify-start max-w-[1240px] mb-5 mx-auto w-full">
          <header className="flex items-center justify-center w-full">
            <div className="flex md:flex-col flex-row md:gap-5 items-center justify-center w-full">
              <div className="header-row ">
                <Img
                  src="images/img_logo.svg"
                  className="h-[51px]"
                  alt="Logo"
                />
                <div className="mobile-menu">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="flex md:flex-1 sm:flex-col flex-row font-opensans sm:hidden items-start justify-center md:ml-[0] ml-[107px] pt-0.5 w-[52%] md:w-full">
                <div className="flex flex-col gap-1.5 items-center justify-start w-[9%] sm:w-full">
                  <Text className="text-red_400" variant="body6">
                    Home
                  </Text>
                  <Line className="bg-red_400 h-px w-full" />
                </div>
                <div className="flex flex-col items-center justify-start ml-8">
                  <Text
                    className="common-pointer text-gray_900_cc"
                    variant="body6"
                    onClick={() => navigate("/menu")}
                  >
                    Menú
                  </Text>
                </div>
                <div className="flex flex-col items-center justify-start ml-8">
                  <Text
                    className="common-pointer text-gray_900_cc"
                    variant="body6"
                    onClick={() => navigate("/aboutus")}
                  >
                    About us
                  </Text>
                </div>
                <div className="flex flex-col items-center justify-start ml-[31px]">
                  <Text
                    className="common-pointer text-gray_900_cc"
                    variant="body6"
                    onClick={() => navigate("/orderonline")}
                  >
                    Order online
                  </Text>
                </div>
                <div className="flex flex-col items-center justify-start ml-[27px]">
                  <Text
                    className="common-pointer text-gray_900_cc"
                    variant="body6"
                    onClick={() => navigate("/reservation")}
                  >
                    Reservation
                  </Text>
                </div>
                <div className="flex flex-col items-center justify-start ml-[31px]">
                  <Text
                    className="common-pointer text-gray_900_cc"
                    variant="body6"
                    onClick={() => navigate("/contact")}
                  >
                    Contact us
                  </Text>
                </div>
              </div>
              <Button
                className="cursor-pointer flex h-[50px] sm:hidden items-center justify-center md:ml-[0] ml-[122px] rounded-[50%] w-[50px]"
                leftIcon={
                  <Img
                    src="images/img_cart.svg"
                    className="sm:hidden m-[13px]"
                    alt="cart"
                  />
                }
                variant="FillWhiteA700"
              >
                <div className="sm:hidden"></div>
              </Button>
              <Button
                className="cursor-pointer font-semibold sm:hidden leading-[normal] min-w-[112px] md:ml-[0] ml-[25px] text-center text-sm text-white_A700"
                shape="RoundedBorder16"
                size="md"
                variant="FillRed400"
              >
                Log in
              </Button>
            </div>
          </header>
          <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
            <div className="flex flex-col items-center justify-start rounded-[16px]">
              <div className="flex flex-col gap-9 items-start justify-start w-full">
                <div className="flex flex-col gap-4 items-start justify-start w-full">
                  <Text
                    className="font-opensans text-gray_902"
                    as="h2"
                    variant="h2"
                  >
                    <span className="md:text-5xl text-gray_902 text-[70px] text-left font-bold">
                      <>
                        Best Restaurant
                        <br />
                        In{" "}
                      </>
                    </span>
                    <span className="md:text-5xl text-orange-500 text-[70px] text-left font-bold">
                      Town.
                    </span>
                  </Text>
                  <Text
                    className="font-normal font-poppins leading-[200.00%] text-gray_802 w-[91%] sm:w-full"
                    variant="body2"
                  >
                    We provide best food in town, we provide home delivery and
                    dine in services.
                  </Text>
                </div>
                <div className="flex sm:flex-col flex-row gap-6 items-center justify-start w-[85%] md:w-full">
                  <Button
                    className="common-pointer cursor-pointer font-semibold min-w-[232px] text-center text-white_A700 text-xl"
                    onClick={() => navigate("/menu")}
                    shape="RoundedBorder16"
                    size="xl"
                    variant="FillRed400"
                  >
                    Order now
                  </Button>
                  <Button
                    className="common-pointer cursor-pointer font-semibold min-w-[232px] text-center text-red_400 text-xl"
                    onClick={() => navigate("/reservation")}
                    shape="RoundedBorder16"
                    size="xl"
                    variant="FillRed40019"
                  >
                    Reservation
                  </Button>
                </div>
              </div>
            </div>
            <Img
              src="images/img_illustration.png"
              className="h-[502px] md:h-auto object-cover"
              alt="illustration"
            />
          </div>
        </div>
      </div>
      <div className="bg-green_50 flex flex-row items-center justify-start mt-[139px] p-3.5 w-full">
        <div className="flex md:flex-col flex-row gap-[13px] items-start justify-start ml-[149px] md:px-5 w-[79%]">
          <div className="md:h-[558px] h-[646px] relative w-3/5 md:w-full">
            <Img
              src="images/img_kindpng3443995.png"
              className="absolute h-[558px] inset-y-[0] left-[4%] my-auto object-cover w-[85%]"
              alt="kindpng3443995"
            />
            <Img
              src="images/img_kisspngleafpe.png"
              className="absolute bottom-[7%] h-[175px] left-[0] object-cover w-[28%]"
              alt="kisspngleafpe"
            />
            <Img
              src="images/img_kisspngleafpe_117X110.png"
              className="absolute bottom-[0] h-[117px] left-[39%] object-cover w-[17%]"
              alt="kisspngleafpe One"
            />
            <Img
              src="images/img_kisspngleafpe_158X154.png"
              className="absolute h-[158px] object-cover right-[0] top-[0] w-[24%]"
              alt="kisspngleafpe Two"
            />
          </div>
          <div className="flex flex-col gap-9 items-start justify-start md:mt-0 mt-[91px] rounded-[16px] w-[39%] md:w-full">
            <div className="flex flex-col gap-4 items-start justify-start w-full">
              <Text
                className="font-tinos leading-[110.00%] text-red_400"
                as="h3"
                variant="h3"
              >
                <span className="md:text-[44px] sm:text-[38px] text-gray_902 text-[52px] font-opensans text-left font-bold leading-[normal]">
                  <>
                    Our Most <br />
                    Popular{" "}
                  </>
                </span>
                <span className="md:text-[44px] sm:text-[38px] text-red_400 text-[52px] font-opensans text-left font-bold leading-[normal]">
                  Dish.
                </span>
              </Text>
              <Text
                className="font-normal font-poppins leading-[200.00%] text-gray_801 w-full"
                variant="body2"
              >
                This dish is full of flavor and nutrition! Quinoa is a
                complete protein, providing all the essential amino acids your
                body needs, and is also a good source of fiber.
              </Text>
            </div>
            <Button
              className="common-pointer cursor-pointer font-semibold min-w-[232px] text-center text-white_A700 text-xl"
              onClick={() => navigate("/menu")}
              shape="RoundedBorder16"
              size="xl"
              variant="FillRed400"
            >
              Order now
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-opensans md:gap-10 gap-[79px] items-center justify-start max-w-[1112px] mt-[133px] mx-auto md:px-5 w-full">
        <Text className="text-gray_900" as="h3" variant="h3">
          Our Popular Menu
        </Text>
        <div className="flex flex-col font-poppins gap-[50px] items-center justify-start w-full">
          <div className="flex sm:flex-col flex-row gap-7 items-center justify-between rounded-[16px] w-full">
            <Button
              className="cursor-pointer font-semibold min-w-[232px] text-center text-white_A700 text-xl"
              shape="RoundedBorder16"
              size="xl"
              variant="FillRed400"
            >
              All catagory
            </Button>
            <Button
              className="cursor-pointer font-normal min-w-[192px] text-center text-gray_900 text-xl"
              shape="RoundedBorder16"
              size="xl"
              variant="FillGray40063"
            >
              Dinner
            </Button>
            <Button
              className="cursor-pointer font-normal min-w-[192px] text-center text-gray_900 text-xl"
              shape="RoundedBorder16"
              size="xl"
              variant="FillGray40063"
            >
              Lunch
            </Button>
            <Button
              className="cursor-pointer font-normal min-w-[192px] text-center text-gray_900 text-xl"
              shape="RoundedBorder16"
              size="xl"
              variant="FillGray40063"
            >
              Dessert
            </Button>
            <Button
              className="cursor-pointer font-normal min-w-[192px] text-center text-gray_900 text-xl"
              shape="RoundedBorder16"
              size="xl"
              variant="FillGray40063"
            >
              Drink
            </Button>
          </div>
          <div className="flex flex-col gap-12 items-center justify-start w-full">
            <div className="flex flex-col items-center justify-start rounded-[40px] w-full">
              <div className="md:gap-5 gap-[35px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full">
                <div className="bg-white_A700 flex flex-1 flex-col gap-6 items-center justify-center p-[30px] sm:px-5 rounded-[40px] w-full">
                  <Img
                    src="images/img_pngitem41084.png"
                    className="h-[270px] md:h-auto mt-1.5 object-cover w-[270px]"
                    alt="PngItem41084"
                  />
                  <div className="flex flex-col items-center justify-end mb-1.5 pt-[17px] w-full">
                    <div className="flex flex-col gap-[18px] items-center justify-start w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        as="h6"
                        variant="h6"
                      >
                        Spaghetti
                      </Text>
                      <Text
                        className="leading-[200.00%] text-center text-gray_800 w-full"
                        variant="body7"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Egestas consequat mi eget auctor aliquam, diam.{" "}
                      </Text>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-3.5 rounded-[1.76px] w-[49%] md:w-full">
                      <RatingBar
                        className="flex justify-between w-[140px]"
                        value={5}
                        starCount={5}
                        activeColor="#f54748"
                        size={24}
                      ></RatingBar>
                    </div>
                    <div className="flex flex-row gap-[34px] items-center justify-between mt-[30px] rounded-lg w-[95%] md:w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        variant="body1"
                      >
                        $12.05
                      </Text>
                      <Button
                        className="common-pointer cursor-pointer font-semibold min-w-[158px] text-base text-center text-white_A700"
                        onClick={() => navigate("/checkout")}
                        shape="RoundedBorder8"
                        size="lg"
                        variant="FillRed400"
                      >
                        Order now
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-white_A700 flex flex-1 flex-col gap-6 items-center justify-center p-[30px] sm:px-5 rounded-[40px] w-full">
                  <Img
                    src="images/img_pngitem1447549.png"
                    className="h-[270px] md:h-auto mt-1.5 object-cover w-[270px]"
                    alt="PngItem1447549"
                  />
                  <div className="flex flex-col items-center justify-end mb-1.5 pt-3.5 w-full">
                    <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        as="h6"
                        variant="h6"
                      >
                        Gnocchi
                      </Text>
                      <Text
                        className="leading-[200.00%] text-center text-gray_800 w-full"
                        variant="body7"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Egestas consequat mi eget auctor aliquam, diam.{" "}
                      </Text>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-3.5 rounded-[1.76px] w-[49%] md:w-full">
                      <RatingBar
                        className="flex justify-between w-[140px]"
                        value={5}
                        starCount={5}
                        activeColor="#f54748"
                        size={24}
                      ></RatingBar>
                    </div>
                    <div className="flex flex-row gap-[34px] items-center justify-between mt-[30px] rounded-lg w-[95%] md:w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        variant="body1"
                      >
                        $12.05
                      </Text>
                      <Button
                        className="common-pointer cursor-pointer font-semibold min-w-[158px] text-base text-center text-white_A700"
                        onClick={() => navigate("/checkout")}
                        shape="RoundedBorder8"
                        size="lg"
                        variant="FillRed400"
                      >
                        Order now
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-white_A700 flex flex-1 flex-col gap-6 items-center justify-center p-[30px] sm:px-5 rounded-[40px] w-full">
                  <Img
                    src="images/img_pngegg.png"
                    className="h-[270px] md:h-auto mt-1.5 object-cover w-[270px]"
                    alt="pngegg"
                  />
                  <div className="flex flex-col items-center justify-end mb-1.5 pt-3.5 w-full">
                    <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        as="h6"
                        variant="h6"
                      >
                        Rovioli
                      </Text>
                      <Text
                        className="leading-[200.00%] text-center text-gray_800 w-full"
                        variant="body7"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Egestas consequat mi eget auctor aliquam, diam.{" "}
                      </Text>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-3.5 rounded-[1.76px] w-[49%] md:w-full">
                      <RatingBar
                        className="flex justify-between w-[140px]"
                        value={5}
                        starCount={5}
                        activeColor="#f54748"
                        size={24}
                      ></RatingBar>
                    </div>
                    <div className="flex flex-row gap-[34px] items-center justify-between mt-[30px] rounded-lg w-[95%] md:w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        variant="body1"
                      >
                        $12.05
                      </Text>
                      <Button
                        className="common-pointer cursor-pointer font-semibold min-w-[158px] text-base text-center text-white_A700"
                        onClick={() => navigate("/checkout")}
                        shape="RoundedBorder8"
                        size="lg"
                        variant="FillRed400"
                      >
                        Order now
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-white_A700 flex flex-1 flex-col gap-6 items-center justify-center p-[30px] sm:px-5 rounded-[40px] w-full">
                  <Img
                    src="images/img_pngwing.png"
                    className="h-[270px] md:h-auto mt-1.5 object-cover w-[95%]"
                    alt="pngwing"
                  />
                  <div className="flex flex-col items-center justify-end mb-1.5 pt-[15px] w-full">
                    <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        as="h6"
                        variant="h6"
                      >
                        Penne Alla Vodak
                      </Text>
                      <Text
                        className="leading-[200.00%] text-center text-gray_800 w-full"
                        variant="body7"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Egestas consequat mi eget auctor aliquam, diam.{" "}
                      </Text>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-3.5 rounded-[1.76px] w-[49%] md:w-full">
                      <RatingBar
                        className="flex justify-between w-[140px]"
                        value={5}
                        starCount={5}
                        activeColor="#f54748"
                        size={24}
                      ></RatingBar>
                    </div>
                    <div className="flex flex-row gap-[34px] items-center justify-between mt-[30px] rounded-lg w-[95%] md:w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        variant="body1"
                      >
                        $12.05
                      </Text>
                      <Button
                        className="common-pointer cursor-pointer font-semibold min-w-[158px] text-base text-center text-white_A700"
                        onClick={() => navigate("/checkout")}
                        shape="RoundedBorder8"
                        size="lg"
                        variant="FillRed400"
                      >
                        Order now
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-white_A700 flex flex-1 flex-col gap-6 items-center justify-center p-[30px] sm:px-5 rounded-[40px] w-full">
                  <Img
                    src="images/img_pngitem5290903.png"
                    className="h-[270px] md:h-auto mt-1.5 object-cover w-[270px]"
                    alt="PngItem5290903"
                  />
                  <div className="flex flex-col items-center justify-end mb-1.5 pt-3.5 w-full">
                    <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        as="h6"
                        variant="h6"
                      >
                        Risoto
                      </Text>
                      <Text
                        className="leading-[200.00%] text-center text-gray_800 w-full"
                        variant="body7"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Egestas consequat mi eget auctor aliquam, diam.{" "}
                      </Text>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-3.5 rounded-[1.76px] w-[49%] md:w-full">
                      <RatingBar
                        className="flex justify-between w-[140px]"
                        value={5}
                        starCount={5}
                        activeColor="#f54748"
                        size={24}
                      ></RatingBar>
                    </div>
                    <div className="flex flex-row gap-[34px] items-center justify-between mt-[30px] rounded-lg w-[95%] md:w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        variant="body1"
                      >
                        $12.05
                      </Text>
                      <Button
                        className="common-pointer cursor-pointer font-semibold min-w-[158px] text-base text-center text-white_A700"
                        onClick={() => navigate("/checkout")}
                        shape="RoundedBorder8"
                        size="lg"
                        variant="FillRed400"
                      >
                        Order now
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-white_A700 flex flex-1 flex-col gap-6 items-center justify-center p-[30px] sm:px-5 rounded-[40px] w-full">
                  <Img
                    src="images/img_pngwing_270X270.png"
                    className="h-[270px] md:h-auto mt-1.5 object-cover w-[270px]"
                    alt="pngwing One"
                  />
                  <div className="flex flex-col items-center justify-end mb-1.5 w-full">
                    <div className="flex flex-col gap-[18px] items-center justify-start mt-4 w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        as="h6"
                        variant="h6"
                      >
                        Splitza Signature
                      </Text>
                      <Text
                        className="leading-[200.00%] text-center text-gray_800 w-full"
                        variant="body7"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Egestas consequat mi eget auctor aliquam, diam.{" "}
                      </Text>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-3.5 rounded-[1.76px] w-[49%] md:w-full">
                      <RatingBar
                        className="flex justify-between w-[140px]"
                        value={5}
                        starCount={5}
                        activeColor="#f54748"
                        size={24}
                      ></RatingBar>
                    </div>
                    <div className="flex flex-row gap-[34px] items-center justify-between mt-[30px] rounded-lg w-[95%] md:w-full">
                      <Text
                        className="font-semibold text-gray_900"
                        variant="body1"
                      >
                        $12.05
                      </Text>
                      <Button
                        className="common-pointer cursor-pointer font-semibold min-w-[158px] text-base text-center text-white_A700"
                        onClick={() => navigate("/checkout")}
                        shape="RoundedBorder8"
                        size="lg"
                        variant="FillRed400"
                      >
                        Order now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row font-inter gap-2.5 items-center justify-center w-1/5 md:w-full">
              <Img
                src="images/img_arrowleft_black_900.svg"
                className="h-[15px] w-[15px]"
                alt="arrowleft"
              />
              <div className="flex flex-row gap-2.5 items-center justify-start w-[78%]">
                <Button
                  className="cursor-pointer font-semibold h-[35px] leading-[normal] text-center text-sm text-white_A700 tracking-[-0.50px] w-[35px]"
                  shape="RoundedBorder4"
                  size="sm"
                  variant="FillGray900"
                >
                  1
                </Button>
                <Button
                  className="cursor-pointer font-semibold h-[35px] leading-[normal] text-black_900 text-center text-sm tracking-[-0.50px] w-[35px]"
                  shape="RoundedBorder4"
                  size="sm"
                  variant="FillGray200"
                >
                  2
                </Button>
                <Button
                  className="cursor-pointer font-semibold h-[35px] leading-[normal] text-black_900 text-center text-sm tracking-[-0.50px] w-[35px]"
                  shape="RoundedBorder4"
                  size="sm"
                  variant="FillGray200"
                >
                  3
                </Button>
                <Button
                  className="flex h-[35px] items-center justify-center w-[35px]"
                  shape="icbRoundedBorder4"
                  size="smIcn"
                  variant="icbFillGray200"
                >
                  <Img src="images/img_user.svg" className="h-5" alt="user" />
                </Button>
              </div>
              <Img
                src="images/img_arrowright.svg"
                className="h-[15px] w-[15px]"
                alt="arrowright"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start max-w-[1112px] mt-[156px] mx-auto md:px-5 w-full">
        <Text className="font-opensans text-gray_900" as="h3" variant="h3">
          Our Popular Chef
        </Text>
        <List
          className="sm:flex-col flex-row font-poppins gap-10 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center mt-[60px] pb-3 w-full"
          orientation="horizontal"
        >
          <div className="flex flex-1 flex-col gap-[52px] items-center justify-start w-full">
            <div className="bg-gray_900_6c h-[549px] relative rounded-[50px] w-full">
              <Img
                src="images/img_image1.png"
                className="absolute h-[549px] inset-[0] justify-center m-auto object-cover rounded-[50px] w-full"
                alt="imageOne"
              />
            </div>
            <Text className="font-semibold text-gray_900" variant="body1">
              Betran Komar
            </Text>
            <Text className="font-normal text-gray_501" variant="body1">
              Head chef
            </Text>
          </div>
          <div className="flex flex-1 flex-col items-center justify-start w-full">
            <div className="bg-gradient1  md:h-[541px] h-[549px] pt-2 relative rounded-[50px] w-full">
              <Img
                src="images/img_image3.png"
                className="absolute h-[541px] inset-[0] justify-center m-auto object-cover rounded-[50px] w-full"
                alt="imageThree"
              />
            </div>
            <Text
              className="font-semibold mt-[54px] text-gray_900"
              variant="body1"
            >
              Ferry Sauwi
            </Text>
            <Text
              className="font-normal mt-[51px] text-gray_501"
              variant="body1"
            >
              Chef
            </Text>
          </div>
          <div className="flex flex-1 flex-col items-center justify-start w-full">
            <div className="bg-lime_900_6c h-[549px] relative rounded-[50px] w-full">
              <Img
                src="images/img_image2.png"
                className="absolute h-[549px] inset-[0] justify-center m-auto object-cover rounded-[50px] w-full"
                alt="imageTwo"
              />
            </div>
            <Text
              className="font-semibold mt-[52px] text-gray_900"
              variant="body1"
            >
              Iswan Dracho
            </Text>
            <Text
              className="font-normal mt-[54px] text-gray_501"
              variant="body1"
            >
              Chef
            </Text>
          </div>
        </List>
        <Button
          className="cursor-pointer font-poppins font-semibold min-w-[235px] mt-[83px] text-center text-white_A700 text-xl"
          shape="RoundedBorder16"
          size="xl"
          variant="FillRed400"
        >
          View all
        </Button>
      </div>
      <div className="flex flex-col font-opensans gap-[50px] items-center justify-start mt-[120px] pt-4 md:px-5 w-[55%] md:w-full">
        <div className="flex flex-col items-center justify-start">
          <Text className="text-gray_900" as="h3" variant="h3">
            What Our Customers Say
          </Text>
        </div>
        <div className="h-[394px] relative w-full">
          <PagerIndicator
            className="absolute flex h-[394px] inset-[0] justify-center m-auto max-w-[728px] w-full"
            count={3}
            activeCss="inline-block cursor-pointer rounded-[50%] h-2.5 bg-gray_51 w-2.5 relative mx-[5.00px]"
            activeIndex={sliderState}
            inactiveCss="inline-block cursor-pointer rounded-[50%] h-2.5 bg-gray_301 w-2.5 relative mx-[5.00px]"
            sliderRef={sliderRef}
            selectedWrapperCss="inline-block"
            unselectedWrapperCss="inline-block"
          />
          <Button
            className="absolute cursor-pointer flex h-[60px] inset-y-[0] items-center justify-center my-auto right-[0] rounded-[50%] w-[60px]"
            onClick={() => sliderRef.current?.slideNext?.()}
            size="lgIcn"
            variant="icbOutlineRed5000f"
          >
            <Img
              src="images/img_group81.svg"
              className="h-6"
              alt="groupEightyOne"
            />
          </Button>
          <Button
            className="absolute cursor-pointer flex h-[60px] inset-y-[0] items-center justify-center left-[0] my-auto rotate-[180deg] rounded-[50%] w-[60px]"
            onClick={() => sliderRef.current?.slidePrev?.()}
            size="lgIcn"
            variant="icbOutlineBlack9000f"
          >
            <Img
              src="images/img_group82.svg"
              className="h-6"
              alt="groupEightyTwo"
            />
          </Button>
          <div className="absolute inset-[0] justify-center m-auto w-full"></div>
        </div>
      </div>
      <div className="bg-red_100 flex flex-col font-opensans items-center justify-end max-w-[1112px] mt-[120px] mx-auto p-[93px] md:px-5 rounded-[24px] w-full">
        <div className="flex flex-col gap-12 items-center justify-start mt-[17px] w-[77%] md:w-full">
          <Text className="text-gray_900" as="h3" variant="h3">
            Hungry? We are open now..
          </Text>
          <div className="flex sm:flex-col flex-row font-poppins gap-6 items-center justify-center w-[70%] md:w-full">
            <Button
              className="common-pointer cursor-pointer font-semibold min-w-[232px] text-center text-white_A700 text-xl"
              onClick={() => navigate("/menu")}
              shape="RoundedBorder16"
              size="xl"
              variant="FillRed400"
            >
              Order now
            </Button>
            <Button
              className="common-pointer cursor-pointer font-semibold min-w-[232px] text-center text-red_400 text-xl"
              onClick={() => navigate("/reservation")}
              shape="RoundedBorder16"
              size="xl"
              variant="FillWhiteA7007f"
            >
              Reservation
            </Button>
          </div>
        </div>
      </div>
      <Footer className="bg-gray_901 flex font-poppins items-center justify-center mt-[120px] md:px-5 w-full" />
    </div>
  </>
);
};
 

export default Home
