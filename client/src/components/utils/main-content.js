import { useEffect, useState } from "react";

const Main = ({ children, classes }) => {
	const [width, setWidth] = useState(undefined);
	const [height, setheight] = useState(undefined);

	const setMainBounds = () => {
		const windowBoundaries = {
			height: window.innerHeight,
			width: window.innerWidth,
		};
		setWidth(windowBoundaries.width - document.querySelector("nav").offsetWidth);
		setheight(windowBoundaries.height - document.querySelector("#controller").offsetHeight);
	};
	useEffect(() => {
		setMainBounds();
		window.addEventListener("resize", setMainBounds);
		return () => window.removeEventListener("resize", setMainBounds);
	}, []);

	return (
		<div
			style={{
				overflowX: "hidden",
				overflowY: "auto",
				position: "absolute",
				top: "0",
				right: "0",
				width: `${width}px `,
				height: `${height}px`,
			}}
			className={classes}
		>
			{children}
		</div>
	);
};

export default Main;
