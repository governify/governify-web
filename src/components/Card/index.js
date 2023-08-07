import styles from './index.module.scss';
import Image from 'next/image';
import Link from 'next/link'

export default function Card({title, description, icon, btnLink, btnText, hide}) {
    return !hide && (
        <div className={styles.card}>
            <h1 className={styles.title}>{title}</h1>
            {icon}
            <p className={styles.description}>{description}</p>
            <Link href={btnLink ?? '/'} className={styles.button}>{btnText}</Link>
        </div>
    );
}