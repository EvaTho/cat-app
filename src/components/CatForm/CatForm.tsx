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

                <select name="gender" id="gender" required>
                    <option value="SelectGender" selected disabled hidden>
                        Select Gender
                    </option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="NonBinary">Non-binary</option>
                </select>
                {/*NOTE:  Max length to keep with designs, but could be handled differently? */}
                <textarea
                    id="bio"
                    name="bio"
                    required
                    defaultValue="Bio"
                    maxLength={75}
                ></textarea>

                <div className={styles.imageSelect}>
                    <input
                        id="fileSelect"
                        name="image"
                        type="file"
                        required
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
                    {/* NOTE: Added image preview for nicer UX :)  */}
                    {selectedImage && (
                        <div className={styles.imagePreviewWrapper}>
                            <img
                                className={styles.imagePreview}
                                src={selectedImage}
                            />
                        </div>
                    )}
                </div>

                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default CatForm
