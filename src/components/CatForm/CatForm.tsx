import styles from './CatForm.module.scss'

interface CatFormProps {
    onSubmit: (e: React.FormEvent) => void
}

const CatForm: React.FC<CatFormProps> = ({ onSubmit }) => {
    return (
        <>
            {/* Sanitize all user input! */}
            <h2 className={styles.title}>Add new kitty</h2>
            <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
                <label htmlFor="catName">Name</label>
                <input
                    type="text"
                    id="catName"
                    name="catName"
                    defaultValue="Sir Cattington"
                    required
                    minLength={2}
                    maxLength={20}
                />

                <label htmlFor="dob">Date of Birth </label>
                <input type="date" id="dob" name="dob" />
                <label htmlFor="gender">Gender </label>
                <select name="gender" id="gender" required>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="NonBinary">Non-binary</option>
                </select>

                <label htmlFor="bio">Bio</label>
                <textarea id="bio" name="bio" required></textarea>
                <label htmlFor="fileSelect">Image</label>

                <input
                    id="fileSelect"
                    name="image"
                    type="file"
                    multiple
                    className={styles.files}
                />

                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default CatForm
