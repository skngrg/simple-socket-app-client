import React from 'react'

import styles from  '../styles/Main.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FIELDS = {
    USERNAME: 'username',
    ROOM: 'room',
};

export const Main = () => {
    const { USERNAME, ROOM } = FIELDS;
    const [values, setValues] = useState({[USERNAME]: '', [ROOM]: ''});

    const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const onCLickHandler = (e) => {
        const isDisabled = Object.values(values).some(value => !value);

        if (isDisabled) {
            e.preventDefault();
        }
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Join</h1>

                <form className={styles.form}>
                    <div className={styles.group}>
                        <input
                            className={styles.input}
                            type="text"
                            name="username"
                            autoComplete="off"
                            placeholder="Username"
                            value={values[USERNAME]}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className={styles.group}>
                        <input
                            className={styles.input}
                            type="text"
                            name="room"
                            placeholder="Room"
                            value={values[ROOM]}
                            onChange={onChangeHandler}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <Link
                        className={styles.group}
                        onClick={onCLickHandler}
                        to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}
                    >
                        <button
                            className={styles.button}
                        >
                            Sign in
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    )
}
