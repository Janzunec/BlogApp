import { StyleSheet, Text, View, Linking, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Post from './Post/Post';

export default function Blog() {
	const [data, setData] = useState([]);

	useEffect(async () => {
		const resp = await fetch('https://graphqlzero.almansi.me/api', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				query: `{posts {data {id, title, body, user{id ,name, username}}}}`,
			}),
		});
		const fetchedData = await resp.json().then((res) => res);

		const sortedData = fetchedData.data.posts.data.map((post) => {
			return post;
		});
		setData(sortedData);
	}, []);

	const editHandler = () => {
		setData([
			{
				title: 'man',
				body: 'idemoo',
				id: 0,
				user: {
					username: 'JanZunec',
				},
			},
			...data,
		]);
	};

	return (
		<View>
			<Text onPress={editHandler}>POSTS</Text>
			<ScrollView style={styles.postsContainer}>
				{data.map((post) => (
					<Post
						key={post.id}
						id={post.id}
						title={post.title}
						body={post.body}
						user={post.user}
					/>
				))}
			</ScrollView>
			<View>
				<NavBar />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	postsContainer: {
		// flex: 1,
		// flexDirection: 'column',
		// alignItems: 'center',
		// flexWrap: 'wrap',
	},
});
