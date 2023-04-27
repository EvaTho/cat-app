import styles from './CatForm.module.scss'

interface CatFormProps {}

const CatForm: React.FC<CatFormProps> = ({}) => {
    const submit = () => {
        console.log('submit')
    }
    return (
        <>
            {/* Sanitize all user input! */}
            <h2 className={styles.title}>Add new kitty</h2>
            <form className={styles.form}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value="Sir Cattington"
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

                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default CatForm
