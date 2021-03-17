import sectionBarStyles from "../../styles/layout/section-bar.module.scss";

const SectionBar = ({ children }) => {
	return <div className={sectionBarStyles.sectionBar}>{children}</div>;
};

export default SectionBar;
