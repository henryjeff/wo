import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  StartItem?: React.ClassicElement<any>;
  EndItem?: React.ClassicElement<any>;
  icon?: FontAwesomeIconProps["icon"];
  filled?: boolean;
  flex?: boolean;
  onClick?: () => void;
  href?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  StartItem,
  EndItem,
  icon,
  filled,
  flex,
  onClick,
  href,
}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    href ? (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    ) : (
      <>{children}</>
    );

  return (
    <Wrapper>
      <button
        onClick={onClick}
        className={`${styles.button} ${filled || styles.outlined} ${
          flex && styles.flex
        }`}
      >
        {icon && <FontAwesomeIcon icon={icon} width={"1em"} height={"1em"} />}
        {<>{StartItem}</>}
        <p>{text}</p>
        {<>{EndItem}</>}
      </button>
    </Wrapper>
  );
};

export default Button;
