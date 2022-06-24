import { faSearch, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import styles from "./SearchInput.module.css";

type SearchInputProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  onEnter?: () => void;
  onEscape?: () => void;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

// create a search input based off of search input props
const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  placeholder,
  onEnter,
  onEscape,
  onClear,
  onFocus,
  onBlur,
}) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isClear, setIsClear] = useState(false);

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
      <FontAwesomeIcon icon={faSearch} width={16} />
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder={placeholder || "Search..."}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
      />
      {/* {isFocused && (
        <div className={styles.clear}>
          <div
            className={styles.clearIcon}
            onClick={() => {
              onClear && onClear();
              setIsClear(true);
            }}
          >
            <FontAwesomeIcon icon={faXmarkCircle} />
          </div>
        </div>
      )}
      {isClear && (
        <div className={styles.clear}>
          <div
            className={styles.clearIcon}
            onClick={() => {
              onClear && onClear();
              setIsClear(false);
            }}
          >
            <FontAwesomeIcon icon={faXmarkCircle} cl />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SearchInput;
