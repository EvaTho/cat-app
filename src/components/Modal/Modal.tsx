import { ReactElement } from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
    content: ReactElement
}

const Modal: React.FC<ModalProps> = ({ content }) => {
    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modal}>
                <button className={styles.closeButton}>X</button>
                <div className={styles.content}>{content}</div>
            </div>
        </div>
    )
}

export default Modal
