import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useLocation } from 'react-router-native';
import HomeBtn from '../Buttons/HomeBtn';

export default function Form() {
	const location = useLocation();
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
	};

	return (
		<View>
			{!isEditing && <Text>ADD POST</Text>}
			{isEditing && <Text>EDIT POST</Text>}
			<View>
				<TextInput
					placeholder='title'
					onChangeText={titleInputHandler}
					defaultValue={title}
					style={styles.loginInput}
				/>
				<TextInput
					placeholder='body'
					onChangeText={bodyInputHandler}
					defaultValue={body}
					style={styles.loginInput}
				/>
				{isEditing && (
					<Text>
						{`User: ${user.username} - ${user.name} | ${user.email}`}
					</Text>
				)}
				{!isEditing && (
					<View>
						<TextInput
							placeholder='name'
							onChangeText={nameInputHandler}
							defaultValue=''
						/>
						<TextInput
							placeholder='username'
							onChangeText={usernameInputHandler}
							defaultValue=''
						/>
						<TextInput
							placeholder='email'
							onChangeText={emailInputHandler}
							defaultValue=''
						/>
					</View>
				)}
				<View style={styles.formButton}>
					<Button
						title='submitPostForm'
						onPress={submitPostFormHandler}
					/>
				</View>
			</View>
			<View>
				<HomeBtn />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
