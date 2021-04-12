import likeIcon from "../../../assets/dark/like.svg";
import likeFillIcon from "../../../assets/dark/like-fill.svg";
import likeIconLight from "../../../assets/light/like.svg";
import likeFillIconLight from "../../../assets/light/like-fill.svg";
import songStyles from "../../../styles/layout/song.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const Like = ({ songInfo, isLight }) => {
	const [isLiked, setIsLiked] = useState(songInfo.isLiked);
	const icons = {
		like: isLight ? likeIconLight : likeIcon,
		likeFill: isLight ? likeFillIconLight : likeFillIcon,
	};
	const setLike = async () => {
		if (isLiked === "loading") return;
		try {
			setIsLiked("loading");
			const res = await axios.post(`/like`, { songId: songInfo._id, isLiked: songInfo.isLiked });
			songInfo.isLiked = res.data;
			setIsLiked(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => setIsLiked(songInfo.isLiked), [songInfo.isLiked]);

	if (!songInfo.audio) return null;
	return (
		<img
			src={isLiked ? icons.likeFill : icons.like}
			alt="like"
			className={`${songStyles.actionBtns} img-hover`}
			onClick={setLike}
		/>
	);
};

export default Like;
