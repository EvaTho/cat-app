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
                        alt={`A picture of a cat named ${name}`}
                    />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.name}>{name}</h3>
                    <div className={styles.dobAndGender}>
                        <p>{dob}</p>
                        <p>{gender}</p>
                    </div>
                    <p className={styles.bio}>{bio}</p>
                </div>
            </div>
        </>
    )
}

export default CatCard
