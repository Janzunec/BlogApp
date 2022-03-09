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
import { color } from 'react-native-elements/dist/helpers';

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
	};

	const logoutHandler = () => {
		authCtx.onLogout();
	};

	return (
		<View
			style={[
				styles.login,
				{
					minHeight: dimensions.height - 40,
				},
			]}
		>
			{!authCtx.isLoggedIn && (
				<View style={styles.loginForm}>
					<TextInput
						placeholder='username'
						onChangeText={usernameInputHandler}
						defaultValue={username}
						style={styles.loginInput}
					/>
					<TextInput
						placeholder='password'
						onChangeText={passwordInputHandler}
						defaultValue={password}
						style={styles.loginInput}
					/>
					<View style={styles.formButton}>
						<Button title='Login' onPress={loginHandler} />
					</View>
				</View>
			)}
			{authCtx.isLoggedIn && (
				<View style={styles.loginForm}>
					<Text
						style={styles.loggedinText}
					>{`You are logged in as ${authCtx.user}`}</Text>
					<View style={styles.formButton}>
						<Button title='Logout' onPress={logoutHandler} />
					</View>
				</View>
			)}
			<View style={styles.homeBtn}>
				<HomeBtn />
			</View>
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
	loginForm: {
		width: '100%',
		height: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	loginInput: {
		width: '80%',
		fontSize: 17,
		backgroundColor: '#ddd',
		color: '#000',
		marginVertical: 10,
		borderRadius: 5,
		padding: 5,
		marginHorizontal: 'auto',
	},
	formButton: {
		width: '20%',
		borderRadius: 5,
		marginHorizontal: 'auto',
		marginTop: 15,
	},
	loggedinText: {
		fontSize: 25,
		color: '#fff',
	},
});
