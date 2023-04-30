import styles from './CatForm.module.scss'
import { useState, useEffect } from 'react'

interface CatFormProps {
    onSubmit: (e: React.FormEvent) => void
    name?: string
    dob?: string
    gender?: string
    bio?: string
    imagePath?: string
    id?: number
}

const CatForm: React.FC<CatFormProps> = ({
    onSubmit,
    name,
    dob,
    gender,
    bio,
    imagePath,
}) => {
    const [selectedImage, setSelectedImage] = useState('')

    useEffect(() => {
        if (imagePath) {
            setSelectedImage(imagePath)
        }
    }, [])
    return (
        <>
            {/* NOTE: Sanitize all user input */}
            {/*NOTE: Could be abstracted, different input fields made into smaller components with props*/}
            <h2 className={styles.title}>Add new kitty</h2>
            <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
                <input
                    type="text"
                    id="catName"
                    name="catName"
                    defaultValue={name ?? ''}
                    placeholder="Name"
                    required
                    minLength={2}
                    maxLength={20}
                />

                <input
                    type="date"
                    id="dob"
                    name="dob"
                    defaultValue={dob ?? ''}
                />

                <select
                    name="gender"
                    id="gender"
                    required
                    defaultValue={gender ?? ''}
                >
                    <option value="SelectGender" disabled hidden>
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
                    defaultValue={bio ?? ''}
                    placeholder="Bio"
                    maxLength={75}
                ></textarea>

                <div className={styles.imageSelect}>
                    <input
                        id="fileSelect"
                        name="image"
                        type="file"
                        accept="image/*"
                        required
                        className={styles.files}
                        onChange={(event) => {
                            if (event.target.files) {
                                const filenameMatches = event.target.files[0]
                                    .name
                                    ? event.target.files[0].name.match(
                                          /\.([^\.]+)$/
                                      )
                                    : ''

                                const filename = filenameMatches
                                    ? filenameMatches[1]
                                    : ''

                                switch (filename) {
                                    case 'jpg':
                                    case 'jpeg':
                                    case 'bmp':
                                    case 'png':
                                    case 'tif':
                                    case 'webp':
                                    case 'avif':
                                        break
                                    default:
                                        alert('Not allowed')
                                        event.target.value = ''
                                        return
                                }

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
