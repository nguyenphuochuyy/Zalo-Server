const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

AWS.config.update({
    region: process.env.AWS_REGION // Đảm bảo region được cấu hình
});

const s3 = new AWS.S3();

const uploadToS3 = async (file) => {
    const fileExtension = path.extname(file.originalname);
    const key = `avatars/${uuidv4()}${fileExtension}`;

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };


    try {
        const data = await s3.upload(params).promise();
        console.log('Upload thành công:', data);
        return data.Location;
    } catch (error) {
        console.error('Lỗi upload S3:', error);
        console.error('Lỗi chi tiết:', JSON.stringify(error, null, 2)); // Log lỗi chi tiết
        throw error;
    }
};

module.exports = { uploadToS3 };