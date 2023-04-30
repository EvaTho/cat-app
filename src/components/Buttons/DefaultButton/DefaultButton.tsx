import styles from './DefaultButton.module.scss'

interface ButtonProps {
    onClick: () => void
}

const DefaultButton: React.FC<ButtonProps> = ({ onClick }) => {
    return <button onClick={() => onClick}></button>
}

export default DefaultButton
