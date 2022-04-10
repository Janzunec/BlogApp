import React, { useState, useRef, useCallback } from 'react';
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

	const { formType, post_ID, title, body, image } = location.state;
	const isEditing = formType === 'edit' ? true : false;

	const titleInput = useRef(null);
	const bodyInput = useRef(null);
	const imageInput = useRef(null);

	// const titleInputHandler = (input) => {
	// 	setTitle(input);
	// };

	// const bodyInputHandler = (input) => {
	// 	setBody(input);
	// };

	// const nameInputHandler = (input) => {
	// 	setUser((prevState) => ({
	// 		...prevState,
	// 		name: input,
	// 	}));
	// };

	// const usernameInputHandler = (input) => {
	// 	setUser((prevState) => ({
	// 		...prevState,
	// 		username: input,
	// 	}));
	// };

	// const emailInputHandler = (input) => {
	// 	setUser((prevState) => ({
	// 		...prevState,
	// 		email: input,
	// 	}));
	// };

	// const submitPostFormHandler = () => {
	// 	if (title === '' || body === '') return;
	// 	const dataToPost = {
	// 		id: isEditing ? data.id : Math.ceil(Math.random() * 1000 + 100),
	// 		title: title,
	// 		body: body,
	// 		user: user,
	// 	};
	// 	addPost(dataToPost);
	// 	navigate('/');
	// };

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
					ref={titleInput}
					defaultValue={title}
					style={styles.formInput}
					multiline={true}
				/>
				<TextInput
					placeholder='Body'
					ref={bodyInput}
					defaultValue={body}
					style={styles.formInput}
					multiline={true}
				/>

				{/* {!isEditing && (
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
				)} */}
				{/* <View style={styles.formBtn}>
					<Button
						title='submit post'
						onPress={submitPostFormHandler}
					/>
				</View> */}
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
		bottom: 30,
		left: 0,
	},
});
