const AWSXRay = require('aws-xray-sdk');
// X-Rayでラップしておくことで、X-Rayで追跡可能になる
// aws-sdkはLambdaのランタイムにのっているので、devDependenciesでOK
const AWS = AWSXRay.captureAWS(require('aws-sdk')); // eslint-disable-line

const sqs = new AWS.SQS({ region: 'us-west-2' });

// 関数のサンプル
exports.handler = async (event, context) => {
  const { key1 } = event;
  // 環境変数を使用するサンプル
  const sample = process.env.ENV_SAMPLE;
  const queues = new Promise((resolve, reject) => sqs.listQueues({}, (err, data) => {
    if (err) reject(err);
    resolve(data);
  })).catch((reason) => context.fail(reason));
  const result = `key1 = ${key1}, 環境変数 = ${sample}`;
  context.succeed({
    result,
    queues,
  });
};
