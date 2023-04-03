provider "aws" {
  region = "us-east-1"
  access_key = ""
}

resource "aws_lambda_function" "mongoconnection" {
  function_name = "mongoconnection"
  handler = "index.handler"
  runtime = "nodejs18.x"
  role = aws_iam_role.databaseConnection-role-96img5my.arn
  filename = "dist/lambda.zip"
}

resource "aws_iam_role" "databaseConnection-role-96img5my" {
  name = "databaseConnection-role-96img5my"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "logs:CreateLogGroup"
        Effect = "Allow"
        Resource = "arn:aws:logs:us-east-1:670506064351:*"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
      {
        Action = [ 
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect = "Allow"
        Resource =  "arn:aws:logs:us-east-1:670506064351:log-group:/aws/lambda/databaseConnection:*"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

data "archive_file" "example_lambda_zip" {
  type = "zip"
  source_file = "./dist/lambda.js"
  output_path = "./dist/lambda.zip"
}
