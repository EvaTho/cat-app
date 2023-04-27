import styles from './CatForm.module.scss'
import { useState } from 'react'

interface CatFormProps {
    onSubmit: (e: React.FormEvent) => void
}

const CatForm: React.FC<CatFormProps> = ({ onSubmit }) => {
    const [selectedImage, setSelectedImage] = useState('')
    return (
        <>
            {/* Sanitize all user input! */}
            <h2 className={styles.title}>Add new kitty</h2>
            <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
                <input
                    type="text"
                    id="catName"
                    name="catName"
                    defaultValue="Name"
                    required
                    minLength={2}
                    maxLength={20}
                />

                <input
                    type="date"
                    id="dob"
                    name="dob"
                    defaultValue="2022-01-01"
                />

                <select
                    name="gender"
                    id="gender"
                    required
                    defaultValue="SelectGender"
                >
                    <option value="SelectGender" disabled hidden>
                        Select Gender
                    </option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="NonBinary">Non-binary</option>
                </select>

                <textarea
                    id="bio"
                    name="bio"
                    required
                    defaultValue="Bio"
                ></textarea>
                <label htmlFor="fileSelect">Image</label>

                <input
                    id="fileSelect"
                    name="image"
                    type="file"
                    className={styles.files}
                    onChange={(event) => {
                        if (event.target.files) {
                            const image = URL.createObjectURL(
                                event.target.files[0]
                            )
                            setSelectedImage(image)
                        }
                    }}
                />
                {selectedImage && (
                    <div>
                        <img width={'250px'} src={selectedImage} />
                    </div>
                )}

                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default CatForm
