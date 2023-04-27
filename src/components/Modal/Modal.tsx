import { ReactElement } from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
    content: ReactElement
    onClickClose: () => void
}
// Bonus functionality: Click outside to close
const Modal: React.FC<ModalProps> = ({ content, onClickClose }) => {
    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modal}>
                <button
                    className={styles.closeButton}
                    onClick={(e) => onClickClose()}
                />
                <div className={styles.content}>{content}</div>
            </div>
        </div>
    )
}

export default Modal
