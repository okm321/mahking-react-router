import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.header__title}>
        <h1>Mahking</h1>
      </a>
    </header>
  )
}
