const COS = require('cos-js-sdk-v5');

const cos = new COS({
  SecretId: '<需要替换>',
  SecretKey: '<需要替换>',
});

module.exports = (file) => {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: 'irqa-demo-1258530187',
      Region: 'ap-beijing',
      Key: `audios/${file.name}`,
      Body: file,
      ContentType: file.type,
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
