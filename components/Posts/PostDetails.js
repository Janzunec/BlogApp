import React, { useContext, useEffect, useState } from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Link, useLocation, useNavigate } from 'react-router-native';
import AuthContext from '../Context/auth-context';
import HomeBtn from './Buttons/HomeBtn';
import CommentCard from './Cards/CommentCard';

export default function PostDetails() {
	const [postComments, setPostComments] = useState([]);
	const dimensions = useWindowDimensions();
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	let imageHeight = dimensions.height / 4;
	let detailsHeight = dimensions.height - imageHeight;

	const location = useLocation();
	let { id, image, title, body, user, editPost, deletePost } = location.state;

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

	const editHandler = () => {
		editPost();
	};
	const deleteHandler = () => {
		deletePost();
		navigate('/');
	};

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

				<Text style={styles.postDeatailsUser}>
					{`${user.username} - ${user.name} | ${user.email}`}
				</Text>
				<View style={styles.actionBtns}>
					{authCtx.isLoggedIn && (
						<View style={styles.actionBtn}>
							<Icon
								// raised
								name='edit'
								type='font-awesome'
								color='#aaa'
								style={{
									height: 25,
									width: 25,
								}}
								onPress={editHandler}
							/>
							<Text
								style={{
									color: '#aaa',
									fontSize: 20,
									fontWeight: '700',
									marginLeft: 3,
								}}
								onPress={editHandler}
							>
								EDIT POST
							</Text>
						</View>
					)}
					{!authCtx.isLoggedIn && (
						<Link to='/login' style={styles.actionBtn}>
							<>
								<Icon
									// raised
									name='edit'
									type='font-awesome'
									color='#aaa'
									style={{
										height: 25,
										width: 25,
									}}
								/>
								<Text
									style={{
										color: '#aaa',
										fontSize: 20,
										fontWeight: '700',
										marginLeft: 3,
									}}
								>
									EDIT POST
								</Text>
							</>
						</Link>
					)}
					{authCtx.isLoggedIn && (
						<View style={[styles.actionBtn, { marginLeft: 15 }]}>
							<Icon
								// raised
								name='trash'
								type='font-awesome'
								color='#f00'
								style={{
									height: 25,
									width: 25,
								}}
								onPress={deleteHandler}
							/>
							<Text
								style={{
									color: 'red',
									fontSize: 20,
									fontWeight: '700',
									marginLeft: 3,
								}}
								onPress={deleteHandler}
							>
								DELETE POST
							</Text>
						</View>
					)}
					{!authCtx.isLoggedIn && (
						<Link
							to='/login'
							style={[styles.actionBtn, { marginLeft: 15 }]}
						>
							<>
								<Icon
									// raised
									name='trash'
									type='font-awesome'
									color='#f00'
									style={{
										height: 25,
										width: 25,
									}}
								/>
								<Text
									style={{
										color: 'red',
										fontSize: 20,
										fontWeight: '700',
										marginLeft: 3,
									}}
								>
									DELETE POST
								</Text>
							</>
						</Link>
					)}
				</View>
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
	actionBtns: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginVertical: 10,
	},
	actionBtn: {
		fontSize: 20,
		fontWeight: '700',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	commentSection: {
		minHeight: 'auto',
		width: '100%',
		marginTop: 10,
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
