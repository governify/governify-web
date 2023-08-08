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
          <a className={styles.btn} href="https://docs.governify.io" target='_blank'>General Docs</a>
          <a className={styles.btn} href="https://github.com/governify" target='_blank'>
            <VscGithubInverted size={'1.2em'} style={{alignSelf: 'center'}}/>
            GitHub
          </a>
        </div>
      </div>
    );
  }