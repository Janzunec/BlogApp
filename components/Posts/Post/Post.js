import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Post(props) {
	return (
		<View style={styles.post}>
			<Text style={styles.postTitle}>{props.title}</Text>
			<Text style={styles.postBody}>{props.body}</Text>
			<View>
				<Text>{props.user.username}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	post: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	postTitle: {
		height: 'auto',
		color: 'whitesmoke',
	},
	postBody: {
		color: '#000',
	},
});
