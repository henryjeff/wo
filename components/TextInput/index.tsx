import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { HTMLInputTypeAttribute, useCallback, useState } from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
  onChange: (value: string) => void;
  name: string;
  icon?: FontAwesomeIconProps["icon"];
  placeholder?: string;
  onEnter?: () => void;
  onEscape?: () => void;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: HTMLInputTypeAttribute;
};

// create a search input based off of search input props
const TextInput: React.FC<TextInputProps> = ({
  onChange,
  icon,
  name,
  placeholder,
  onEnter,
  onEscape,
  onFocus,
  onBlur,
  type,
}) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
    onFocus && onFocus();
  }, [onFocus]);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
    onBlur && onBlur();
  }, [onBlur]);

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onEnter && onEnter();
      }
      if (e.key === "Escape") {
        onEscape && onEscape();
      }
    },
    [onEnter, onEscape]
  );

  return (
    <div className={`${styles.container}`}>
      {icon && (
        <FontAwesomeIcon icon={icon} width={"0.8em"} className={styles.icon} />
      )}
      <input
        className={styles.input}
        value={value}
        name={name}
        placeholder={placeholder || ""}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
        type={type || "text"}
      />
    </div>
  );
};

export default TextInput;
