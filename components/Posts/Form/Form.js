import React, { useState } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	useWindowDimensions,
	View,
	ScrollView,
	KeyboardAvoidingView,
} from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
import HomeBtn from '../Buttons/HomeBtn';

export default function Form() {
	const location = useLocation();
	const navigate = useNavigate();
	const dimensions = useWindowDimensions();

	const { data, type, addPost } = location.state;
	const isEditing = type === 'edit';

	const [title, setTitle] = useState(isEditing ? data.title : '');
	const [body, setBody] = useState(isEditing ? data.body : '');
	const [user, setUser] = useState(
		isEditing ? data.user : { id: Math.ceil(Math.random() * 100 + 8) }
	);

	const titleInputHandler = (input) => {
		setTitle(input);
	};

	const bodyInputHandler = (input) => {
		setBody(input);
	};

	const nameInputHandler = (input) => {
		setUser((prevState) => ({
			...prevState,
			name: input,
		}));
	};

	const usernameInputHandler = (input) => {
		setUser((prevState) => ({
			...prevState,
			username: input,
		}));
	};

	const emailInputHandler = (input) => {
		setUser((prevState) => ({
			...prevState,
			email: input,
		}));
	};

	const submitPostFormHandler = () => {
		if (title === '' || body === '' || user === {}) return;
		const dataToPost = {
			id: isEditing ? data.id : Math.ceil(Math.random() * 1000 + 100),
			title: title,
			body: body,
			user: user,
		};
		addPost(dataToPost);
		navigate('/');
	};

	return (
		<KeyboardAvoidingView
			style={{
				height: dimensions.height,
				paddingTop: 40,
				position: 'relative',
			}}
			behavior='height'
		>
			{!isEditing && <Text style={styles.title}>ADD POST</Text>}
			{isEditing && <Text style={styles.title}>EDIT POST</Text>}
			<ScrollView
				style={[styles.form, { height: dimensions.height - 40 }]}
			>
				<TextInput
					placeholder='Title'
					onChangeText={titleInputHandler}
					defaultValue={title}
					style={styles.formInput}
					multiline={true}
				/>
				<TextInput
					placeholder='Body'
					onChangeText={bodyInputHandler}
					defaultValue={body}
					style={styles.formInput}
					multiline={true}
				/>
				{isEditing && (
					<Text style={styles.user}>
						{`User: ${user.username} - ${user.name} | ${user.email}`}
					</Text>
				)}
				{!isEditing && (
					<View>
						<TextInput
							placeholder='Name'
							onChangeText={nameInputHandler}
							defaultValue=''
							style={styles.formInput}
						/>
						<TextInput
							placeholder='Username'
							onChangeText={usernameInputHandler}
							defaultValue=''
							style={styles.formInput}
						/>
						<TextInput
							placeholder='Email'
							onChangeText={emailInputHandler}
							defaultValue=''
							style={styles.formInput}
						/>
					</View>
				)}
				<View style={styles.formBtn}>
					<Button
						title='submit post'
						onPress={submitPostFormHandler}
					/>
				</View>
			</ScrollView>
			<View style={styles.homeBtn}>
				<HomeBtn />
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	title: {
		width: '100%',
		textAlign: 'center',
		fontSize: 25,
		fontWeight: '700',
		color: '#fff',
	},
	form: {
		minHeight: 'auto',
		width: '100%',
		paddingHorizontal: 20,
		marginTop: 20,
		marginBottom: 60,
	},
	formInput: {
		width: '100%',
		height: 'auto',
		backgroundColor: '#fffc',
		borderRadius: 5,
		marginVertical: 10,
		fontSize: 15,
		padding: 5,
	},
	user: {
		fontSize: 17,
		color: '#fff',
		marginVertical: 10,
	},
	formBtn: {
		width: '100%',
		marginTop: 10,
	},
	homeBtn: {
		position: 'absolute',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 0,
		left: 0,
	},
});
