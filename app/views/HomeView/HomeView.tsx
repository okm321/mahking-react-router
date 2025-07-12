import { Stack } from '~/components/shared/Stack'
import styles from './HomeView.module.scss'
import { Button } from '~/components/shared/Button'
import { SquarePlus } from 'lucide-react'
import { Link } from 'react-router'

export function HomeView() {
  return (
    <Stack spacing={4}>
      <h2 className={styles.home_title}>麻雀の記録を<br />手軽にシンプルに</h2>
      <p className={styles.home_description}>ログイン不要。URLを共有するだけで、<br />みんなの成績を記録できます。<br />さまざまなルールにも柔軟に対応しています。</p>
      <Button size="l" bold startIcon={<SquarePlus />} as={Link} to="/new" className={styles['start-button']}>今すぐ始める</Button>
    </Stack>
  )
}
