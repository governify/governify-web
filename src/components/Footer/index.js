import styles from './index.module.scss';
import Image from 'next/image';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div>
                <h3 className={styles.h3}>Infrastructure</h3>
                <ul className={styles.ul}>
                    <li className={styles.li}><a href="https://docs.governify.io" className={styles.a}>General Documentation</a></li>
                    <li className={styles.li}><a href="https://docs.bluejay.governify.io" className={styles.a}>Bluejay Documentation</a></li>
                    <li className={styles.li}><a href="https://docs.falcon.governify.io" className={styles.a}>Falcon Documentation</a></li>
                </ul>
            </div>

            <div>
                <h3 className={styles.h3}>About</h3>
                <ul className={styles.ul}>
                    <li className={styles.li}><a href="https://docs.governify.io/about/license" className={styles.a}>License</a></li>
                    <li className={styles.li}><a href="https://github.com/orgs/governify/people" className={styles.a}>Contact</a></li>
                    <li className={styles.li}><a href="https://github.com/orgs/governify/people" className={styles.a}>Team</a></li>
                </ul>
            </div>

            <div>
                <div>
                    <h3 className={styles.h3}>Links</h3>
                    <ul className={styles.ul}>
                        <li className={styles.li}><a href="" className={styles.a}>GitHub Organization</a></li>
                    </ul>
                </div>
            </div>
            <a href="https://isa.us.es" style={{position:"absolute", bottom: "1rem", right:0}}>
                <Image src="/isa.svg" width={200} height={50} />
            </a>
        </div>
    );
}