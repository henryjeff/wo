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
  outlined?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  StartItem,
  EndItem,
  icon,
  outlined,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${outlined && styles.outlined}`}
    >
      {icon && <FontAwesomeIcon icon={icon} width={12} />}
      {<>{StartItem}</>}
      <p>{text}</p>
      {<>{EndItem}</>}
    </button>
  );
};

export default Button;
