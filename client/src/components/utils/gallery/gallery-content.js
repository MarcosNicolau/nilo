import galleryStyles from "../../../styles/layout/gallery.module.scss";
const GalleryContent = ({ action, img, imgStyle, name, children }) => {
	return (
		<div className={galleryStyles.content} onClick={action}>
			<div className={galleryStyles.contentImgContainer}>
				<img src={img} alt="playlist cover" style={imgStyle} />
				{children}
			</div>
			<h4 className={galleryStyles.name}>{name}</h4>
		</div>
	);
};

export default GalleryContent;
