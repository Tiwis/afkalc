import React from "react";
import styles from "./Chip.module.css";

interface IProps {
  children: React.ReactNode;
}

const Chip: React.FC<IProps> = ({ children }) => <div className={styles.Chip}>{children}</div>;

export default Chip;
