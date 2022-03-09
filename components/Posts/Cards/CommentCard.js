import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

export default function CommentCard(props) {
	const { id, email, name, body, post } = props.data;
	console.log(id);

	return (
		<View style={styles.comment}>
			<View style={styles.commentUser}>
				<Icon
					// raised
					name='user'
					type='font-awesome-5'
					color='#111'
					style={styles.commentUserIcon}
				/>
				<Text style={styles.commentUserEmail}>{email}</Text>
			</View>

			<Text style={styles.commentUserName}>{name}</Text>
			<Text style={styles.commentUserBody}>{body}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	comment: {
		height: 'auto',
		width: 'auto',
		backgroundColor: '#fffc',
		borderRadius: 10,
		padding: 10,
		marginVertical: 5,
	},
	commentUser: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	commentUserIcon: {
		height: 21,
		width: 21,
	},
	commentUserEmail: {
		fontSize: 15,
		fontWeight: '700',
		marginLeft: 5,
	},
	commentUserName: {
		marginVertical: 5,
		fontSize: 17,
		fontWeight: '700',
	},
	commentUserBody: {
		fontSize: 15,
	},
});
