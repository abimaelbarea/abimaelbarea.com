import {
  faDev,
  faGithub,
  faLinkedin,
  faMedium,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./appFooter.module.css";

const AppFooter = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.navigation}>
        <a href="https://twitter.com/abimaelbarea" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.linkedin.com/in/abimaelbarea" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://github.com/abimaelbarea" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://abimaelbarea.medium.com/" target="_blank">
          <FontAwesomeIcon icon={faMedium} />
        </a>
        <a href="https://dev.to/abimaelbarea" target="_blank">
          <FontAwesomeIcon icon={faDev} />
        </a>
      </nav>
    </footer>
  );
};

export default AppFooter;
