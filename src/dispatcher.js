const AWSXRay = require('aws-xray-sdk');
// X-Rayでラップしておくことで、X-Rayで追跡可能になる
// aws-sdkはLambdaのランタイムにのっているので、devDependenciesでOK
const AWS = AWSXRay.captureAWS(require('aws-sdk')); // eslint-disable-line

const sqs = new AWS.SQS({ region: 'ap-northeast-1' });

// 関数のサンプル非同期処理
exports.handler = async (event, context) => {
  const {key1}  = event;
  const {body}  =  event;
  const string = JSON.stringify(event);
  console.log(event);
  // 環境変数を使用するサンプル
  const sample = process.env.ENV_SAMPLE;//resoleならlistを取得する,err
  const queues = new Promise((resolve, reject) => sqs.listQueues({}, (err, data) => {
    if (err) reject(err);
    console.log(error);
    resolve(data);
  })).catch((reason) => context.fail(reason));
  const result = `key1 = ${key1}, 環境変数 = ${sample} ,json = ${string}, body = ${body}`;
  //key1 = 'event , 環境変数 = dev';
  context.succeed({
    result,
    queues,
  });
};
