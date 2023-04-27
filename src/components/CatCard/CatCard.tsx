import styles from './CatCard.module.scss'

interface CatProps {
    name: string
    imagePath: string
    bio: string
    dob: string
    gender: string
}

const CatCard: React.FC<CatProps> = ({ name, imagePath, bio, dob, gender }) => {
    return (
        <>
            <div className={styles.catCardWrapper}>
                <div className={styles.imageWrapper}>
                    <img
                        className={styles.profilePic}
                        src={imagePath}
                        alt={`A picture of ${name}`}
                    />
                </div>
                <div className={styles.content}>
                    <h3>{name}</h3>
                    <p>{dob}</p>
                    <p>{gender}</p>
                    <p>{bio}</p>
                </div>
            </div>
        </>
    )
}

export default CatCard
