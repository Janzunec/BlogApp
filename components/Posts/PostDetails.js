import React, { useEffect, useState } from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import { useLocation } from 'react-router-native';
import HomeBtn from './Buttons/HomeBtn';
import CommentCard from './Cards/CommentCard';

export default function PostDetails() {
	const [postComments, setPostComments] = useState([]);
	const dimensions = useWindowDimensions();

	let imageHeight = dimensions.height / 4;
	let detailsHeight = dimensions.height - imageHeight;

	const location = useLocation();
	let { id, image, title, body, user } = location.state;

	title = title[0].toUpperCase() + title.substring(1);
	body = body[0].toUpperCase() + body.substring(1);

	useEffect(async () => {
		const resp = await fetch('https://graphqlzero.almansi.me/api', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				query: `{comments{
					data{
					  id
					  name
					  body
					  email
					  post{
						id
					  }
					}
				  }
				}`,
			}),
		});

		const fetchedData = await resp
			.json()
			.then((res) => res.data.comments.data);

		const filteredData = fetchedData.filter(
			(comment) => comment.post.id === id
		);

		setPostComments([...filteredData]);
	}, []);

	return (
		<View
			style={[
				dimensions.width > 1100
					? styles.postDeatailsComputer
					: styles.postDeatails,
				{
					height: dimensions.height,
				},
			]}
		>
			<Image
				source={image}
				style={{
					height: imageHeight,
					width: 'auto',
				}}
			/>
			<ScrollView
				style={[
					styles.postDeatailsText,
					{
						minHeight: detailsHeight,
					},
				]}
				showsVerticalScrollIndicator={false}
			>
				<Text style={styles.postDetailsTitle}>{title}</Text>

				<Text style={styles.postDeatailsBody}>{`${body}

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.

Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.
				
Ta tekst je tukaj z namenom, da se vidi funkcionalnost premikanja teksta posamezne objave, ko ta preseže velikost elementa.`}</Text>
				<Text
					style={styles.postDeatailsUser}
				>{`${user.username} - ${user.name} | ${user.email}`}</Text>
				<View style={styles.commentSection}>
					<Text style={styles.commentSectionTitile}>COMMENTS:</Text>
					{postComments.map((comment) => (
						<CommentCard key={comment.id} data={comment} />
					))}
				</View>
			</ScrollView>
			<View style={styles.homeBtn}>
				<HomeBtn />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	postDeatails: {
		// height: '100%',
		width: 'auto',
		overflow: 'hidden',
		position: 'relative',
	},
	postDeatailsComputer: {
		width: '50%',
		marginHorizontal: 'auto',
	},
	postDeatailsText: {
		width: '100%',
		minHeight: 'auto',
		padding: 10,
	},
	postDetailsTitle: {
		color: '#0ff',
		fontSize: 25,
		fontWeight: '700',
	},
	postDeatailsBody: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '400',
		marginTop: 10,
		minHeight: 'auto',
	},
	postDeatailsUser: {
		color: '#0ffd',
		fontSize: 18,
		marginVertical: 10,
	},
	commentSection: {
		minHeight: 'auto',
		width: '100%',
		marginBottom: 65,
	},
	commentSectionTitile: {
		fontSize: 25,
		color: '#fff',
	},
	homeBtn: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
		marginBottom: 10,
	},
});
