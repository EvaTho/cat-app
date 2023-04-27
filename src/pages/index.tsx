import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import CatCard from '@/components/CatCard/CatCard'
import Header from '@/components/Header/Header'
import CatForm from '@/components/CatForm/CatForm'
import Modal from '@/components/Modal/Modal'
import AddCatButton from '@/components/Buttons/AddCatButton/AddCatButton'
import { useState } from 'react'
import { Cat } from '@/types/Cat'

import { useDispatch, useSelector } from 'react-redux'
import { addToCatsList, selectCatsList } from '@/store/catSlice'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const dispatch = useDispatch()
    const catsList = useSelector(selectCatsList)

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        // Not very robust, would use uuid instead for example
        const newCatId = Math.floor(Math.random() * 10000)
        const image = URL.createObjectURL(form.image.files[0])

        const newCat: Cat = {
            dob: form.dob.value,
            name: form.catName.value,
            gender: form.gender.value,
            bio: form.bio.value,
            imagePath: image,
            id: newCatId,
        }
        dispatch(addToCatsList(newCat))
    }

    const [showForm, setShowForm] = useState(false)

    const openForm = () => {
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
    }
    return (
        <>
            <Head>
                <title>Cat app</title>
                <meta
                    name="description"
                    content="Let's add some cats to a list :)"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                {showForm && (
                    <Modal
                        onClickClose={closeForm}
                        content={<CatForm onSubmit={submit} />}
                    />
                )}

                <section className={styles.header}>
                    <Header copy="Furry Friends" />
                </section>

                <section className={styles.catList}>
                    {catsList.map((cat) => (
                        <CatCard
                            name={cat.name}
                            dob={cat.dob}
                            gender={cat.gender}
                            imagePath={cat.imagePath}
                            bio={cat.bio}
                            key={cat.id}
                        />
                    ))}

                    <AddCatButton callback={openForm} />
                </section>
            </main>
        </>
    )
}
