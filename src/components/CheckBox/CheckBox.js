import styles from "./CheckBox.module.scss"

export const CheckBox = (props) => {
  const { changed, id, isSelected, label, value } = props;
  return (
    <div className={styles.checkBox}>
      <input
        id={id}
        onChange={changed}
        value={value}
        type="checkbox"
        checked={isSelected}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
