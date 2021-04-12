import { useRef } from "react";
import leftArrow from "../../../assets/gallery/left-arrow.svg";
import rightArrow from "../../../assets/gallery/right-arrow.svg";
import galleryStyles from "../../../styles/layout/gallery.module.scss";

const Gallery = ({ name, children, isDark }) => {
	const gallery = useRef();
	return (
		<div className={`${galleryStyles.galleryContainer} ${isDark && galleryStyles.dark}`}>
			<div className={`${galleryStyles.infoContainer}`}>
				<h1>{name}</h1>
				<div className={galleryStyles.arrows}>
					<img
						src={leftArrow}
						alt="left"
						className="img-hover"
						onClick={() => (gallery.current.scrollLeft -= 200)}
					/>
					<img
						src={rightArrow}
						alt="right"
						className="img-hover"
						onClick={() => (gallery.current.scrollLeft += 200)}
					/>
				</div>
			</div>
			<div className={galleryStyles.contentContainer} ref={gallery}>
				{children}
			</div>
		</div>
	);
};

export default Gallery;
