import AWS from 'aws-sdk';

export async function uploadToS3(file:File){
    try{
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
        const s3 = new AWS.S3(
            {
            params:{
                Bucket : process.env.AWS_BUCKET_NAME,
            },
            region: 'ap-south-1'
        });

        const file_key = 'uploads/'+ Date.now().toString() + file.name.replace(' ','_');
         const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: file_key,
            Body: file,
        };

        const upload =  s3.putObject(params);

    } catch (e) {
        console.log(e);
    }
}