import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';

import icon from '../images/emoji.svg';
import io from 'socket.io-client';
import styles from '../styles/Chat.module.css';
import { Messages } from './Messages';

const socket = io.connect('https://simple-socket-app-server.onrender.com');

export const Chat = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({room: '', name: ''});
	const [state, setState] = useState([]);
	const [message, setMessage] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [users, setUsers] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));

		setParams(searchParams);

		socket.emit('join', searchParams);

		return () => {
			socket.off();
		};
	}, [search]);

	useEffect(() => {
		socket.on('message', ({data}) => {
			setState((_state) => ([..._state, data]));
		});
	}, []);

	useEffect(() => {
		socket.on('room', ({data}) => {
			setUsers(data.users.length);
		});
	}, []);

	const leftRoom = () => {
		socket.emit('leftRoom', { params });

		navigate('/');
	};

	const onChangeHandler = (e) => setMessage(e.target.value);

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (message === '') {
			return;
		}

		socket.emit('sendMessage', { message, params });

		setMessage('');
	};

	const onEmojiClick = ({emoji}) => setMessage(`${message}${emoji}`);

	console.log('*** state', state);

	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<div className={styles.title}>{params.room}</div>
				<div className={styles.users}>
					{`${users} users in this room`}
				</div>
				<button className={styles.left} onClick={() => leftRoom()}>
					Left the room
				</button>
			</div>

			<div className={styles.messages}>
				<Messages messages={state} name={params.name} />
			</div>

			<form className={styles.form} onSubmit={onSubmitHandler}>
				<div className={styles.input}>
					<input
						type="text"
						name="room"
						placeholder="What do you wanna say?"
						value={message}
						onChange={onChangeHandler}
						autoComplete="off"
						required
					/>
				</div>

				<div className={styles.emoji}>
					<img src={icon} alt="emoji picker" onClick={() => setIsOpen(!isOpen)} />

					{isOpen && (
						<div className={styles.emojies}>
							<EmojiPicker onEmojiClick={onEmojiClick} />
						</div>
					)}
				</div>

				<div className={styles.button}>
					<input type="submit" value="Send a message" />
				</div>
			</form>
		</div>
	);
};
