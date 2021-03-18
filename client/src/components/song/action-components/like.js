import { useSongContext } from "../index";
import likeIcon from "../../../assets/dark/like.svg";
import likeFillIcon from "../../../assets/dark/like-fill.svg";
import songStyles from "../../../styles/layout/song.module.scss";
import axios from "axios";
import { useState } from "react";

const Like = () => {
	const { songInfo } = useSongContext();
	const [isLiked, setIsLiked] = useState(songInfo.isLiked);
	const setLike = async () => {
		if (isLiked === "loading") return;
		try {
			setIsLiked("loading");
			const res = await axios.post(`/like`, { songId: songInfo.id, isLiked: songInfo.isLiked });
			songInfo.isLiked = res.data;
			setIsLiked(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<img
			src={isLiked ? likeFillIcon : likeIcon}
			alt="like"
			className={songStyles.actionBtns}
			onClick={setLike}
		/>
	);
};

export default Like;
