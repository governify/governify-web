"use client";

import { VscGithubInverted } from 'react-icons/vsc';
import styles from './index.module.scss';
import Image from 'next/image';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <a className={styles.a} style={{display: 'flex', alignItems: 'center', padding: '0.5em 1em', gap: '1em', fontSize: '1.2em'}} href="/">
                        <Image src="/governify.svg" alt="Logo" width={50} height={50}/><b className={styles.responsiveTitle}>Governify</b>
                    </a>
                </li>
                <div className={styles.hr}/>
                <li className={`${styles.li} ${styles.responsiveLi}`}>
                    <a className={styles.a} href="https://docs.governify.io">General Docs</a>
                </li>
                <li className={`${styles.li} ${styles.responsiveLi}`}>
                    <a className={styles.a} href="#infrastructure">Infrastructure</a>
                </li>
                
                <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
                    <li className={styles.li} style={{marginLeft: 'auto'}}>
                        <a className={styles.a} style={{display: 'flex', gap: '1em'}} href='https://github.com/governify' target='_blank'>
                            <VscGithubInverted size={'1.2em'} style={{alignSelf: 'center'}}/>
                            <span className={styles.responsiveTitle}>GitHub</span>
                        </a>
                    </li>
                    <div className={styles.hr}/>
                    <li className={styles.li} >
                        <a className={styles.a} href='https://dev.governify.io' style={{cursor: 'pointer'}}>Developers Area</a>
                    </li>
                </div>
            </ul>
        </nav>
    )
}