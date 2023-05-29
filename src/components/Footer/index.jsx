import React from "react";

import { Button, Img, Text } from "components";

const Footer = (props) => {
  return (
    <>
      <footer className={props.className}>
        <div className="flex flex-col md:gap-10 gap-[67px] items-center justify-center mb-[76px] mt-[70px] mx-auto w-[78%]">
          <div className="flex md:flex-col flex-row md:gap-5 items-start justify-evenly w-full">
            <div className="flex md:flex-1 flex-col items-start justify-start mb-2 w-[38%] md:w-full">
              <div className="flex flex-row gap-2 items-center justify-start w-[30%] md:w-full">
                <Text
                  className="bg-red_400 flex font-poppins font-semibold h-[51px] items-center justify-center rounded-[50%] text-center text-white_A700 w-[51px]"
                  variant="body1"
                >
                  F
                </Text>
                <Text
                  className="font-poppins font-semibold text-white_A700"
                  variant="body3"
                >
                  <span className="text-white_A700 text-lg text-left">
                    Foodio
                  </span>
                  <span className="text-red_400 text-lg text-left">.</span>
                </Text>
              </div>
              <Text
                className="font-normal font-poppins leading-[200.00%] mt-14 text-gray_300 w-[72%] sm:w-full"
                variant="body2"
              >
                Viverra gravida morbi egestas facilisis tortor netus non duis
                tempor.{" "}
              </Text>
              <div className="flex flex-row gap-[30px] items-center justify-start md:ml-[0] ml-[3px] mt-[47px] w-[58%] md:w-full">
                <Button
                  className="flex h-[60px] items-center justify-center rounded-[50%] w-[60px]"
                  size="mdIcn"
                  variant="icbFillGray301"
                >
                  <Img
                    src="images/img_twitter.png"
                    className="h-[30px]"
                    alt="twitter"
                  />
                </Button>
                <Button
                  className="flex h-[60px] items-center justify-center rounded-[50%] w-[60px]"
                  size="mdIcn"
                  variant="icbFillBluegray100"
                >
                  <Img
                    src="images/img_instagram.png"
                    className="h-[30px]"
                    alt="Instagram"
                  />
                </Button>
                <Button
                  className="flex h-[60px] items-center justify-center rounded-[50%] w-[60px]"
                  size="mdIcn"
                  variant="icbFillBluegray100"
                >
                  <Img
                    src="images/img_facebook.png"
                    className="h-[30px]"
                    alt="Facebook"
                  />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start md:mt-0 mt-4">
              <Text
                className="font-poppins font-semibold text-red_400"
                variant="body1"
              >
                Page
              </Text>
              <Text
                className="font-normal font-poppins mt-[43px] text-gray_300"
                variant="body2"
              >
                Home
              </Text>
              <Text
                className="font-normal font-poppins mt-[35px] text-gray_300"
                variant="body2"
              >
                Menu
              </Text>
              <Text
                className="font-normal font-poppins mt-[34px] text-gray_300"
                variant="body2"
              >
                Order online
              </Text>
              <Text
                className="font-normal font-poppins mt-[37px] text-gray_300"
                variant="body2"
              >
                Catering
              </Text>
              <Text
                className="font-normal font-poppins mt-8 text-gray_300"
                variant="body2"
              >
                Reservation
              </Text>
            </div>
            <div className="flex flex-col items-start justify-start md:mt-0 mt-[11px]">
              <Text
                className="font-poppins font-semibold text-red_400"
                variant="body1"
              >
                Information
              </Text>
              <Text
                className="font-normal font-poppins mt-[47px] text-gray_300"
                variant="body2"
              >
                About us
              </Text>
              <Text
                className="font-normal font-poppins mt-[34px] text-gray_300"
                variant="body2"
              >
                Testimonial
              </Text>
              <Text
                className="font-normal font-poppins mt-[35px] text-gray_300"
                variant="body2"
              >
                Event
              </Text>
            </div>
            <div className="flex flex-col items-start justify-start md:mt-0 mt-[11px]">
              <Text
                className="font-poppins font-semibold text-red_400"
                variant="body1"
              >
                Get in touch
              </Text>
              <Text
                className="font-normal font-poppins leading-[153.00%] mt-[46px] text-gray_300 w-full"
                variant="body2"
              >
                3247 Johnson Ave, Bronx, NY 10463, Amerika Serikat
              </Text>
              <Text
                className="font-normal font-poppins mt-[31px] text-gray_300"
                variant="body2"
              >
                delizioso@gmail.com
              </Text>
              <Text
                className="font-normal font-poppins mt-8 text-gray_300"
                variant="body2"
              >
                +123 4567 8901
              </Text>
            </div>
          </div>
          <div className="flex flex-row items-start justify-center w-[23%] md:w-full">
            <Text
              className="font-normal font-poppins mt-1 text-gray_301"
              variant="body2"
            >
              Copyright
            </Text>
            <Text
              className="border-[1.5px] border-gray_301 border-solid flex font-poppins h-[19px] items-center justify-center ml-[5px] mt-1 rounded-[50%] text-center text-gray_301 w-[19px]"
              variant="body7"
            >
              c
            </Text>
            <Text
              className="font-normal font-poppins ml-[5px] text-gray_301"
              variant="body2"
            >
              2022 Foodio
            </Text>
          </div>
        </div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
