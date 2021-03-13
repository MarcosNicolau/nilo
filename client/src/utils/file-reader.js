const fileReader = async (file, setter) => {
	if (!file) return;
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = () => setter(reader.result);
};

export default fileReader;
