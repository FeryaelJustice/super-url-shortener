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
    fetch('/api/shortenURL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    }).then(res => res.json())
      .then((data) => {
        if (data && data.shortUrl) {
          setShortURL('URL code: ' + data.shortUrl)
        } else {
          setShortURL('Error in URL code response')
        }
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

        <section className={styles.title}>
          <h1>SUPER URL shortener tool by <a target="_blank" href="https://github.com/FeryaelJustice" className={styles.link}>Feryael Justice</a></h1>
        </section>

        <section className={styles.description}>
          <h2>Your favourite and amazing url shortener</h2>
          <span>Put the return code after clicking the button form in our website on our URL (example https://superurlshortener/(code))</span>
        </section>

        <section className={styles.app}>
          <div className={styles.grid}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <legend><strong>SHORTEN URL FORM</strong></legend>
              <input ref={inputRef} type='text' className={styles.input} placeholder='URL (starting with: https://)' />
              <button className={styles.button}>Shorten</button>
              <span className={styles.input}>
                {shortURL}
              </span>
            </form>
          </div>
        </section>
      </main>x
    </>
  )
}
