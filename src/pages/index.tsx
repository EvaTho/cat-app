import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import CatCard from '@/components/CatCard/CatCard'
import Header from '@/components/Header/Header'
import Search from '@/components/Search/Search'
import CatForm from '@/components/CatForm/CatForm'
import Modal from '@/components/Modal/Modal'
import AddCatButton from '@/components/Buttons/AddCatButton/AddCatButton'
import { useState } from 'react'
import { Cat } from '@/types/Cat'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addToCatsList,
    removeFromCatsList,
    updateCatInList,
    selectCatsList,
    searchCatList,
    selectSearchResults,
    setListFromLocalStorage,
} from '@/store/catSlice'

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
    const dispatch = useDispatch()
    const catsList = useSelector(selectCatsList)
    const searchResults = useSelector(selectSearchResults)

    const [editingEntry, setEditingEntry] = useState<Cat>()
    const [searchInput, setSearchInput] = useState('')

    const [localList, setLocalList] = useState<Array<Cat>>()

    useEffect(() => {
        const list = localStorage.getItem('cats')
        const parsedList = list ? JSON.parse(list) : []
        if (parsedList) dispatch(setListFromLocalStorage(parsedList))
    }, [])

    const createNewCatEntry = (catForm: HTMLFormElement): Cat => {
        // Not very robust, could use uuid instead for example
        const newCatId = Math.floor(Math.random() * 10000)
        const image = URL.createObjectURL(catForm.image.files[0])

        const cat: Cat = {
            dob: catForm.dob.value,
            name: catForm.catName.value,
            gender: catForm.gender.value,
            bio: catForm.bio.value,
            imagePath: image,
            id: editingEntry ? editingEntry.id : newCatId,
        }

        return cat
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const newCat = createNewCatEntry(form)

        if (editingEntry) {
            dispatch(updateCatInList(newCat))
            setEditingEntry(undefined)
        } else {
            dispatch(addToCatsList(newCat))
        }

        closeForm()
    }

    const findCatById = (id: number) => {
        return catsList.find((cat) => cat.id === id)
    }

    const onEdit = function (id: number) {
        const cat = findCatById(id)

        if (cat) {
            setEditingEntry(cat)
            openForm()
        } else {
            alert('Could not find entry')
        }
    }

    const onRemove = (id: number) => {
        dispatch(removeFromCatsList(id))
    }

    // Form methods and state
    const [showForm, setShowForm] = useState(false)

    const openForm = () => {
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        setSearchInput(e.target.value)
        dispatch(searchCatList(e.target.value))
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
                <section className={styles.header}>
                    <Header copy="Furry Friends" />
                    <Search
                        placeholder="Search"
                        onSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onSearch(e)
                        }
                    />
                </section>
                <section className={styles.catList}>
                    {searchInput
                        ? searchResults.map((cat: Cat) => (
                              <CatCard
                                  name={cat.name}
                                  dob={cat.dob}
                                  gender={cat.gender}
                                  imagePath={cat.imagePath}
                                  bio={cat.bio}
                                  key={cat.id}
                                  id={cat.id}
                                  onEdit={onEdit}
                                  onRemove={onRemove}
                              />
                          ))
                        : catsList.map((cat: Cat) => (
                              <CatCard
                                  name={cat.name}
                                  dob={cat.dob}
                                  gender={cat.gender}
                                  imagePath={cat.imagePath}
                                  bio={cat.bio}
                                  key={cat.id}
                                  id={cat.id}
                                  onEdit={onEdit}
                                  onRemove={onRemove}
                              />
                          ))}

                    <AddCatButton callback={openForm} />
                </section>

                {showForm && (
                    <Modal
                        onClickClose={closeForm}
                        content={
                            editingEntry ? (
                                <CatForm
                                    name={editingEntry.name}
                                    bio={editingEntry.bio}
                                    dob={editingEntry.dob}
                                    gender={editingEntry.gender}
                                    imagePath={editingEntry.imagePath}
                                    id={editingEntry.id}
                                    onSubmit={submit}
                                />
                            ) : (
                                <CatForm onSubmit={submit} />
                            )
                        }
                    />
                )}
            </main>
        </>
    )
}
