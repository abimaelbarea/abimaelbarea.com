import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./appHeader.module.css";

type Theme = "light" | "dark";

type HeaderProps = {
  onThemeChange?: (newTheme: Theme) => void;
};

const AppHeader = ({ onThemeChange }: HeaderProps) => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (onThemeChange) {
      onThemeChange(theme ? "light" : "dark");
    }
  }, [theme]);

  return (
    <header className={styles.header}>
      <Link href="/">Abimael Barea</Link>
      <div className={styles.actions}>
        <a
          href="https://github.com/abimaelbarea/abimaelbarea.com"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithubSquare} />
        </a>
        <button onClick={() => setTheme(!theme)}>
          <FontAwesomeIcon icon={theme ? faSun : faMoon} />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
