import styles from './DefaultButton.module.scss'

interface ButtonProps {
    onClick: () => 
}

const DefaultButton: React.FC<ButtonProps> = ({onClick}) => {
    return (<button onClick={() => onClick}></button>)
}

export default DefaultButton
