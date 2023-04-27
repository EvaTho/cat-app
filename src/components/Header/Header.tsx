import styles from './Header.module.scss'

interface HeaderProps {
    copy: string
}

const Header: React.FC<HeaderProps> = ({ copy }) => {
    return <h1 className={styles.header}>{copy}</h1>
}

export default Header
