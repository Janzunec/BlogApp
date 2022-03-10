import React, { useContext, useState } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	useWindowDimensions,
	View,
	KeyboardAvoidingView,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import AuthContext from '../Context/auth-context';
import HomeBtn from '../Posts/Buttons/HomeBtn';

export default function Login() {
	const dimensions = useWindowDimensions();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [areCorrectCredentials, setAreCorrectCredentials] = useState(true);

	const authCtx = useContext(AuthContext);

	const navigate = useNavigate();

	const usernameInputHandler = (input) => {
		setUsername(input);
		setAreCorrectCredentials(true);
	};

	const passwordInputHandler = (input) => {
		setPassword(input);
		setAreCorrectCredentials(true);
	};

	const loginHandler = () => {
		if (username === 'admin' && password === '1234') {
			setAreCorrectCredentials(true);
			authCtx.onLogin(username);
			navigate('/');
			return;
		}
		setAreCorrectCredentials(false);
	};

	const logoutHandler = () => {
		authCtx.onLogout();
	};

	return (
		<KeyboardAvoidingView
			style={[
				styles.login,
				{
					minHeight: dimensions.height - 40,
				},
			]}
			behavior='height'
		>
			<View style={{ height: 20, marginVertical: 10 }}>
				{!areCorrectCredentials && (
					<Text style={styles.error}>
						Username and password are incorrect!
					</Text>
				)}
			</View>
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
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	login: {
		width: '100%',
		paddingTop: 40,
		position: 'relative',
	},
	error: {
		width: '100%',
		textAlign: 'center',
		fontSize: 20,
		color: '#f00',
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
