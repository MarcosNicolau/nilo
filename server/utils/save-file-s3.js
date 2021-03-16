const AWS = require("../config/aws");

// Read in the file, convert it to base64, store to S3
const saveFileInS3 = async (file, folder, fileName, id, contentType) => {
	const key = `songs/${folder}-${id}/${fileName}`;
	const s3 = new AWS.S3();
	const object = await s3
		.upload({
			Bucket: "niloapp",
			Key: key,
			Body: file,
			ACL: "public-read",
			ContentType: contentType,
		})
		.promise();
	return object.Location;
};

module.exports = saveFileInS3;
module.exports.AWS = AWS;
