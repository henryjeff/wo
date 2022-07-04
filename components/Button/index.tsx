import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  StartItem?: React.ClassicElement<any>;
  EndItem?: React.ClassicElement<any>;
  icon?: FontAwesomeIconProps["icon"];
  filled?: boolean;
  flex?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  StartItem,
  EndItem,
  icon,
  filled,
  flex,
  onClick,
}) => {
  return (
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
  );
};

export default Button;
