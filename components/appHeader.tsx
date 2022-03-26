import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./appHeader.module.css";

const AppHeader = () => {
  return (
    <header className={styles.content}>
      <Link href="/">Abimael Barea</Link>
      <div className={styles.actions}>
        <a
          href="https://github.com/abimaelbarea/abimaelbarea.com"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithubSquare} />
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
