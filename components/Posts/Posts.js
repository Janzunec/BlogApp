import React, { useEffect, useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import NavBar from '../NavBar/NavBar';
import Post from './Cards/PostCard';

export default function Blog(props) {
	const dimensions = useWindowDimensions();

	const [postsData, setPostsData] = useState([...props.posts]);

	useEffect(() => {
		setPostsData(props.posts);
		console.log('Reloaded');
	}, [props.posts]);

	const editPostHandler = () => {
		const newPostsData = postsData;
		newPostsData.push({
			id: 123,
			title: 'New Post',
			body: 'Breaking news, Russia attacks Ukraine',
			user: {
				username: 'Janzunec',
			},
		});

		setPostsData([...newPostsData]);
	};

	const deletePostHandler = (e) => {
		console.log(e.target.value);
	};

	return (
		<View>
			<Text onPress={editPostHandler}>POSTS</Text>
			<ScrollView
				style={[
					styles.postsContainer,
					dimensions.width > 1100 && styles.computerPostContainer,
				]}
			>
				{postsData.map((post) => (
					<Post
						key={post.id}
						id={post.id}
						title={post.title}
						body={post.body}
						user={post.user}
						dimensions={dimensions}
					/>
				))}
			</ScrollView>
			{/*
			{dimensions.width > 1100 && (
				<View
					style={[
						styles.postsContainer,
						dimensions.width > 1100 && styles.computerPostContainer,
					]}
				>
					{postsData.map((post) => (
						<Post
							key={post.id}
							id={post.id}
							title={post.title}
							body={post.body}
							user={post.user}
							dimensions={dimensions}
						/>
					))}
				</View>
			)} */}
			<View style={styles.navBar}>
				<NavBar />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	postsContainer: {
		paddingHorizontal: 10,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		borderRadius: 5,
		height: 700,
	},
	computerPostContainer: {
		flex: 1,
		flexWrap: 'wrap',
		width: '100%',
		// alignItems: 'center',
		alignContent: 'center',
		borderRadius: 5,
		marginHorizontal: 'auto',
	},
	navBar: {
		width: '100%',
		height: 'auto',
	},
});
