import styles from './AddCatButton.module.scss'

interface ButtonProps {
    callback: () => void
}

const AddCatButton: React.FC<ButtonProps> = ({ callback }) => {
    return (
        <button className={styles.addCatButton} onClick={callback}>
            <span className={styles.plusIcon}>+</span>
            Add
        </button>
    )
}

export default AddCatButton
