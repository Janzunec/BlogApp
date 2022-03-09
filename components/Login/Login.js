import React, { useContext, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	useWindowDimensions,
} from 'react-native';
import AuthContext from '../Context/auth-context';
import HomeBtn from '../Posts/Buttons/HomeBtn';
import { useNavigate } from 'react-router-native';

export default function Login() {
	const dimensions = useWindowDimensions();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const authCtx = useContext(AuthContext);

	const navigate = useNavigate();

	const usernameInputHandler = (input) => {
		console.log(input);
		setUsername(input);
	};

	const passwordInputHandler = (input) => {
		setPassword(input);
	};

	const loginHandler = () => {
		if (username === 'admin' && password === '1234') {
			authCtx.onLogin(username);
			navigate('/');
			return;
		}
		console.log('Incorrect login info!');
	};

	return (
		<View
			style={[
				styles.login,
				{
					height: dimensions.height - 40,
				},
			]}
		>
			{!authCtx.isLoggedIn && (
				<View>
					<TextInput
						placeholder='username'
						onChangeText={usernameInputHandler}
						defaultValue={username}
					/>
					<TextInput
						placeholder='password'
						onChangeText={passwordInputHandler}
						defaultValue={password}
					/>
					<Button title='Login' onPress={loginHandler} />
				</View>
			)}
			{authCtx.isLoggedIn && (
				<View style={styles.homeBtn}>
					<Text>{`You are logged in as ${authCtx.user}`}</Text>
				</View>
			)}
			<HomeBtn />
		</View>
	);
}

const styles = StyleSheet.create({
	login: {
		width: '100%',
		paddingTop: 40,
		position: 'relative',
	},
	homeBtn: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
