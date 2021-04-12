import Main from "../utils/main-content";
import RecentlyPlayed from "./sections/recently-played";
import PopularPlaylists from "./sections/popular-playlists";
import galleryStyles from "../../styles/layout/gallery.module.scss";
import SectionBar from "../utils/section-bar";

const Home = () => {
	return (
		<Main>
			<SectionBar />
			<div className={galleryStyles.galleriesContainer}>
				<RecentlyPlayed />
				<PopularPlaylists />
			</div>
		</Main>
	);
};

export default Home;
