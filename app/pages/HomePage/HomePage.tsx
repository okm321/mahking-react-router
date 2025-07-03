import styles from './HomePage.module.scss'

export function HomePage() {
  return (
    <>
      <h2 className={styles.home_title}>麻雀の記録を<br />手軽にシンプルに</h2>
      <p className={styles.home_description}>ログイン不要。URLを共有するだけで、<br />みんなの成績を記録できます。<br />さまざまなルールにも柔軟に対応しています。</p>
    </>
  )
}
