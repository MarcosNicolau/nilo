const Song = ({ songName, songId, artist }) => {
	return (
		<div className="song-container">
			<h1>{songName}</h1>
			<h1>{artist}</h1>
		</div>
	);
};

export default Song;
