import plusIcon from "../../../assets/dark/plus.svg";
import songStyles from "../../../styles/layout/song.module.scss";

const AddToPlayList = () => {
	return <img src={plusIcon} alt="add-to-playlist" className={songStyles.actionBtns} />;
};

export default AddToPlayList;
