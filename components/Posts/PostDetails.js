import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useLocation } from 'react-router-native';
import HomeBtn from './Buttons/HomeBtn';

export default function PostDetails() {
	const location = useLocation();
	const { image, title, body, user } = location.state;

	return (
		<View style={styles}>
			<Image source={image} />
			<Text>{title}</Text>
			<Text>{body}</Text>
			<View style={styles.homeBtn}>
				<HomeBtn />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	postDeatails: {
		minHeight: '100%',
		width: '100%',
	},
	homeBtn: {
		position: 'absolute',
		bottom: 10,
		left: '45%',
	},
});
