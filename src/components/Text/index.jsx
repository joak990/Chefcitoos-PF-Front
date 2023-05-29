import React from "react";

const variantClasses = {
  h1: "font-bold sm:text-5xl md:text-5xl text-[80px]",
  h2: "font-bold sm:text-5xl md:text-5xl text-[70px]",
  h3: "font-bold sm:text-[38px] md:text-[44px] text-[52px]",
  h4: "sm:text-4xl md:text-[38px] text-[40px]",
  h5: "font-bold text-4xl sm:text-[32px] md:text-[34px]",
  h6: "text-3xl sm:text-[26px] md:text-[28px]",
  body1: "sm:text-[21px] md:text-[23px] text-[25px]",
  body2: "text-xl",
  body3: "text-lg",
  body4: "font-normal text-[16.62px]",
  body5: "font-semibold text-[16.23px]",
  body6: "font-normal text-base",
  body7: "font-normal text-sm",
  body8: "font-normal text-[12.99px]",
  body9: "font-normal text-xs",
};

const Text = ({ children, className = "", variant, as, ...restProps }) => {
  const Component = as || "span";
  return (
    <Component
      className={`${className} ${variant && variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
