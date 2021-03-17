import likeIcon from "../../../assets/dark/like.svg";
import songStyles from "../../../styles/layout/song.module.scss";

const Like = () => {
	return <img src={likeIcon} alt="like" className={songStyles.actionBtns} />;
};

export default Like;
