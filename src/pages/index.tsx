import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import CatCard from '@/components/CatCard/CatCard'
import Header from '@/components/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
                </section>
                <section className={styles.catList}>
                    <CatCard
                        gender="female"
                        name="Dummy Cat Card"
                        bio="lorem ipsum dolor sit amet, something something cute cat description"
                        imagePath="/assets/images/.....png"
                        dob="1997/02/18"
                    />
                </section>
            </main>
        </>
    )
}
