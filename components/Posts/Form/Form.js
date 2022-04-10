import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	useWindowDimensions,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Linking,
} from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
import HomeBtn from '../Buttons/HomeBtn';

export default function Form() {
	const location = useLocation();
	const navigate = useNavigate();
	const dimensions = useWindowDimensions();

	const [titleInput, setTitleInput] = useState('');
	const [bodyInput, setBodyInput] = useState('');
	const [imageInput, setImageInput] = useState('');

	const { formType, post_ID, title, body, image } = location.state;
	useEffect(() => {
		setTitleInput(title);
		setBodyInput(body);
		setImageInput(image);
	}, []);
	const isEditing = formType === 'edit' ? true : false;

	if (formType === 'add') {
		title = body = image = '';
	}

	const [titleIsEmpty, setTitleIsEmpty] = useState(false);
	const [bodyIsEmpty, setBodyIsEmpty] = useState(false);

	const titleInputHandler = (input) => {
		console.log(input);
		setTitleInput(input);
		if (input === '') {
			setTitleIsEmpty(true);
			return;
		}
		setTitleIsEmpty(false);
	};

	const bodyInputHandler = (input) => {
		setBodyInput(input);
		if (input === '') {
			setBodyIsEmpty(true);

			return;
		}
		setBodyIsEmpty(false);
	};

	const imageInputHandler = (input) => {
		setImageInput(input);
	};

	const updatePostFormHandler = async () => {
		if (titleInput === '' || bodyInput === '') {
			return;
		}

		let updatedImage = '';
		if (imageInput === '') {
			updatedImage = image;
		} else {
			updatedImage = '';
			updatedImage = 'data:image/jpeg;base64,' + imageInput;
		}

		const body = {
			title: titleInput,
			body: bodyInput,
			image: updatedImage,
		};

		const req = await fetch(
			`http://192.168.1.230:3000/post/update/${post_ID}`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}
		);

		navigate('/');
	};

	const addPostFormHandler = () => {
		if (bodyEl.current.value === '' || titleEl.current.value === '') {
			if (bodyEl === '') setBodyIsEmpty(true);
			if (titleEl === '') setTitleIsEmpty(true);
			return;
		}

		let updatedImage = imageEl.current;
		if (imageEl.current === '') updatedImage = image;

		const updatedTitle = titleEl.current.value;
		const updatedBody = bodyEl.current.value;
	};

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

	const openConverterLink = () => {
		Linking.openURL('https://elmah.io/tools/base64-image-encoder/');
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
					defaultValue={title}
					style={[
						styles.formInput,
						titleIsEmpty
							? {
									borderWidth: 2,
									borderColor: 'red',
									backgroundColor: '#f99',
							  }
							: '',
					]}
					multiline={true}
					onChangeText={titleInputHandler}
				/>
				<TextInput
					placeholder='Body'
					defaultValue={body}
					style={[
						styles.formInput,
						bodyIsEmpty
							? {
									borderWidth: 2,
									borderColor: 'red',
									backgroundColor: '#f99',
							  }
							: '',
					]}
					multiline={true}
					onChangeText={bodyInputHandler}
				/>
				<Text
					style={{ textAlign: 'center', color: '#fff', fontSize: 15 }}
				>
					To insert a picture please convert your image to Base 64.{' '}
					<Text
						style={{ color: '#0ff', fontSize: 20 }}
						onPress={openConverterLink}
					>
						Image to Base64 converter
					</Text>
				</Text>

				<TextInput
					placeholder='Base64 code of your image'
					defaultValue={''}
					style={styles.formInput}
					multiline={true}
					onChangeText={imageInputHandler}
				/>
				{isEditing && (
					<Text
						style={{
							textAlign: 'center',
							color: '#aaa',
							fontSize: 15,
						}}
					>
						If you don't insert a new image the current one will
						stay applied.
					</Text>
				)}

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
				<View style={styles.formBtn}>
					<Button
						title='submit post'
						onPress={
							isEditing ? updatePostFormHandler : addPostHandler
						}
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
		bottom: 30,
		left: 0,
	},
});
