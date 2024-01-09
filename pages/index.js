import { useState, useRef } from "react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const inputRef = useRef();
  const [shortURL, setShortURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = inputRef.current.value;

    // API
    console.log(url)
    fetch('/api/shortenURL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    }).then(res => res.json())
    .then((data)=>{
      console.log(data)
      setShortURL(data.shortURL)
    })
  }

  return (
    <>
      <Head>
        <title>Super URL Shortener</title>
        <meta name="description" content="Your favourite and amazing url shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>

        <div className={styles.title}>
          <h1>SUPER URL shortener</h1>
        </div>

        <div className={styles.description}>
          Your favourite and amazing url shortener
        </div>

        <div className={styles.grid}>
          <form className={styles.card} onSubmit={handleSubmit}>
            <input ref={inputRef} type='text' className={styles.input} placeholder='URL' />
            <button className={styles.button}>Shorten</button>
            <span className={styles.input}>
              {shortURL}
            </span>
          </form>
        </div>
      </main>
    </>
  )
}
