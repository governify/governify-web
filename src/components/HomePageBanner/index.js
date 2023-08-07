import styles from './index.module.scss';
import { VscGithubInverted } from 'react-icons/vsc';

export default function HomepageHeader() {
    return (
      <div className={styles.mainBackground}>
        <div>
          <h1>Governify</h1>
          <h5>Open Source Governance over SLAs</h5>
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn}>General Docs</button>
          <button className={styles.btn}>
            <VscGithubInverted size={'1.2em'} style={{alignSelf: 'center'}}/>
            GitHub
          </button>
        </div>
      </div>
    );
  }