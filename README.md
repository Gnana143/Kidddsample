KIddo Project specifications 



1) User Authentication - Cognito user pool 
2) Front end - Javascript SDK and aws-amplify SDKs with few cognito SDKs for development.
2) Federated Identities - Facebook POC 
3) Lambda function 
4) API gateway
5)DynamoDB
6)IAM policies - Roles for users and AWS services  
7) VPC set up
8) S3 for logging and backup


Database design :

Kiddo Main table 
1) Leading Keys : cognito-identity-Id - partition key
2) Sort Key : Kidd0-watch-ID
3) Heart rate -  (Combination of number and time stamp).
4) Skin Temp - (Combination of number and time stamp)
5) steps - (Combination of number and time stamp).
6)Activity - (Combination of number and time stamp).
7) GST - Galvinic skin response (Combination of number and time stamp).


--> Scheduled tasks to trigger the batches from devices to update the data periodically 
--> Other Jobs to run Asynchronousouly to update health data derived from activity data. 


 Current Challenges in AWS services :  

--> Cannot implement row level DynamoDB access control through IAM policies when there is an API gatway and Lambda in middle of connection to DynamoDB.
--> facebook user cannot be synced with the cognito user automatically even if both are registered with same email ID 


Create VPC

--> Create a VPC with 10.0.0.0/26  IP address 
--> Edit DNS host names and Enable it. 
--> Create Subnets with Private and Public configurations. 
--> Create a route table for public and Private. 
--> If you want the internet access you will need Internet gateway and natGateway incase of private routes. 
--> Assign the Lambda function to VPC , Subnet ,Route table and security group 
-->  Create a VPC end point and assign that endpoint to the 
