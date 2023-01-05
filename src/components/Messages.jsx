import React from 'react';

import styles from '../styles/Messages.module.css';

export const Messages = ({messages, name}) => {
    console.log('*** messages', messages);
    return (
        <div className={styles.messages}>
            {messages.map(({ user }, index) => {
                const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
                const className = itsMe ? styles.me : styles.user;

                return (
                    <div key={index} className={`${styles.message} ${className}`}>
                        <span className={styles.user}>{user.name}</span>
                        <div className={styles.text}>
                            {user.message}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
