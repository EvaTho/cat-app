import styles from './CatCard.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectCatById } from '@/store/catSlice'

interface CatProps {
    name: string
    imagePath: string
    bio: string
    dob: string
    gender: string
    id: number
    onEdit: (id: number) => void
    onRemove: (id: number) => void
}

const CatCard: React.FC<CatProps> = ({
    name,
    imagePath,
    bio,
    dob,
    gender,
    id,
    onEdit,
    onRemove,
}) => {
    return (
        <>
            <div className={styles.catCardWrapper}>
                <div className={styles.catCardButtons}>
                    <button onClick={() => onEdit(id)}>Edit</button>
                    <button onClick={() => onRemove(id)}>Remove</button>
                </div>
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
