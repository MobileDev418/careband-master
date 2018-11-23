import {
  AWS_REGION,
  AWS_POOL_ID,
  AWS_POOL_CLIENT_ID,
  AWS_IDENTIFY_POOL_ID
} from "react-native-dotenv";
import {
  Config,
  CognitoIdentityCredentials
} from "aws-sdk/dist/aws-sdk-react-native";
import {
  CognitoUserPool
} from "./lib/aws-cognito-identity";

const appConfig = {
  region: AWS_REGION,
  IdentityPoolId: AWS_IDENTIFY_POOL_ID,
  UserPoolId: AWS_POOL_ID,
  ClientId: AWS_POOL_CLIENT_ID
};

Config.region = appConfig.region;

const poolData = {
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId
};
export const userPool = new CognitoUserPool(poolData)