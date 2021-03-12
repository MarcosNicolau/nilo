import controllerStyles from "../styles/layout/controller.module.scss";
import album from "../assets/album.jpg";
import nextBackBtn from "../assets/controls/next-back.svg";
import playBtn from "../assets/controls/play.svg";

const Controller = () => {
	return (
		<div className={controllerStyles.controllerContainer}>
			<div className={controllerStyles.songInfoContainer}>
				<img src={album} alt="song cover" className={controllerStyles.songCover} />
				<div>
					<h4>Love Yourself</h4>
					<p>Justin Bieber</p>
				</div>
			</div>

			<div className={`column`}>
				<div className={`row`}>
					<p>1:20</p>
					<div className={controllerStyles.songLength}></div>
					<p>3:27</p>
				</div>
				<div className={`row ${controllerStyles.controls}`}>
					<img src={nextBackBtn} alt="previous" className={controllerStyles.backBtn} />
					<img src={playBtn} alt="play pause" className={controllerStyles.playBtn} />
					<img src={nextBackBtn} alt="next" />
				</div>
			</div>
		</div>
	);
};

export default Controller;
