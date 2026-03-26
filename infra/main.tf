provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

# ─────────────────────────────────────────────
# DynamoDB
# ─────────────────────────────────────────────

resource "aws_dynamodb_table" "job_applications" {
  name         = "job-applications"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "applicationId"

  attribute {
    name = "applicationId"
    type = "S"
  }
}

# ─────────────────────────────────────────────
# API Gateway with Lambda integration
# ─────────────────────────────────────────────

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}
data "aws_partition" "current" {}

# API Gateway
resource "aws_api_gateway_rest_api" "job_applications_api" {
  name = "job-applications"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# /jobs 
resource "aws_api_gateway_resource" "jobs" {
  path_part   = "jobs"
  parent_id   = aws_api_gateway_rest_api.job_applications_api.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.job_applications_api.id
}

# /jobs/{id} 
resource "aws_api_gateway_resource" "jobs_id" {
  path_part   = "{id}"
  parent_id   = aws_api_gateway_resource.jobs.id
  rest_api_id = aws_api_gateway_rest_api.job_applications_api.id
}

# OPTIONS /jobs (CORS preflight)
resource "aws_api_gateway_method" "options_jobs" {
  authorization = "NONE"
  http_method   = "OPTIONS"
  resource_id   = aws_api_gateway_resource.jobs.id
  rest_api_id   = aws_api_gateway_rest_api.job_applications_api.id
}

resource "aws_api_gateway_integration" "options_jobs" {
  http_method = aws_api_gateway_method.options_jobs.http_method
  resource_id = aws_api_gateway_resource.jobs.id
  rest_api_id = aws_api_gateway_rest_api.job_applications_api.id
  type        = "MOCK"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "options_jobs" {
  http_method = aws_api_gateway_method.options_jobs.http_method
  resource_id = aws_api_gateway_resource.jobs.id
  rest_api_id = aws_api_gateway_rest_api.job_applications_api.id
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "options_jobs" {
  http_method = aws_api_gateway_method.options_jobs.http_method
  resource_id = aws_api_gateway_resource.jobs.id
  rest_api_id = aws_api_gateway_rest_api.job_applications_api.id
  status_code = aws_api_gateway_method_response.options_jobs.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,Authorization'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.options_jobs]
}

# OPTIONS /jobs/{id} (CORS preflight)
resource "aws_api_gateway_method" "options_jobs_id" {
  authorization = "NONE"
  http_method   = "OPTIONS"
  resource_id   = aws_api_gateway_resource.jobs_id.id
  rest_api_id   = aws_api_gateway_rest_api.job_applications_api.id
}

resource "aws_api_gateway_integration" "options_jobs_id" {
  http_method = aws_api_gateway_method.options_jobs_id.http_method
  resource_id = aws_api_gateway_resource.jobs_id.id
  rest_api_id = aws_api_gateway_rest_api.job_applications_api.id
  type        = "MOCK"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "options_jobs_id" {
  http_method = aws_api_gateway_method.options_jobs_id.http_method
  resource_id = aws_api_gateway_resource.jobs_id.id
  rest_api_id = aws_api_gateway_rest_api.job_applications_api.id
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "options_jobs_id" {
  http_method = aws_api_gateway_method.options_jobs_id.http_method
  resource_id = aws_api_gateway_resource.jobs_id.id
  rest_api_id = aws_api_gateway_rest_api.job_applications_api.id
  status_code = aws_api_gateway_method_response.options_jobs_id.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,Authorization'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,PUT,DELETE,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.options_jobs_id]
}

# GET /jobs
resource "aws_api_gateway_method" "get" {
  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.jobs.id
  rest_api_id   = aws_api_gateway_rest_api.job_applications_api.id
}

resource "aws_api_gateway_integration" "get_jobs" {
  http_method             = aws_api_gateway_method.get.http_method
  resource_id             = aws_api_gateway_resource.jobs.id
  rest_api_id             = aws_api_gateway_rest_api.job_applications_api.id
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

# POST /jobs
resource "aws_api_gateway_method" "post" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.jobs.id
  rest_api_id   = aws_api_gateway_rest_api.job_applications_api.id
}

resource "aws_api_gateway_integration" "post_jobs" {
  http_method             = aws_api_gateway_method.post.http_method
  resource_id             = aws_api_gateway_resource.jobs.id
  rest_api_id             = aws_api_gateway_rest_api.job_applications_api.id
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

# PUT /jobs/{id}
resource "aws_api_gateway_method" "put" {
  authorization = "NONE"
  http_method   = "PUT"
  resource_id   = aws_api_gateway_resource.jobs_id.id
  rest_api_id   = aws_api_gateway_rest_api.job_applications_api.id
}

resource "aws_api_gateway_integration" "put_job" {
  http_method             = aws_api_gateway_method.put.http_method
  resource_id             = aws_api_gateway_resource.jobs_id.id
  rest_api_id             = aws_api_gateway_rest_api.job_applications_api.id
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

# DELETE /jobs/{id}
resource "aws_api_gateway_method" "delete" {
  authorization = "NONE"
  http_method   = "DELETE"
  resource_id   = aws_api_gateway_resource.jobs_id.id
  rest_api_id   = aws_api_gateway_rest_api.job_applications_api.id
}

resource "aws_api_gateway_integration" "delete_job" {
  http_method             = aws_api_gateway_method.delete.http_method
  resource_id             = aws_api_gateway_resource.jobs_id.id
  rest_api_id             = aws_api_gateway_rest_api.job_applications_api.id
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

# API Gateway deployment
resource "aws_api_gateway_deployment" "default" {
  rest_api_id = aws_api_gateway_rest_api.job_applications_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.jobs,
      aws_api_gateway_resource.jobs_id,
      aws_api_gateway_method.get,
      aws_api_gateway_method.post,
      aws_api_gateway_method.put,
      aws_api_gateway_method.delete,
      aws_api_gateway_method.options_jobs,
      aws_api_gateway_method.options_jobs_id,
      aws_api_gateway_integration.get_jobs,
      aws_api_gateway_integration.post_jobs,
      aws_api_gateway_integration.put_job,
      aws_api_gateway_integration.delete_job,
      aws_api_gateway_integration.options_jobs,
      aws_api_gateway_integration.options_jobs_id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "default" {
  deployment_id = aws_api_gateway_deployment.default.id
  rest_api_id   = aws_api_gateway_rest_api.job_applications_api.id
  stage_name    = "prod"
}

# Lambda
data "archive_file" "lambda" {
  type        = "zip"
  source_file = "${path.module}/../lambda/handler.py"
  output_path = "${path.module}/../lambda/lambda.zip"
}

resource "aws_lambda_function" "lambda" {
  filename         = data.archive_file.lambda.output_path
  function_name    = "job-applications"
  role             = aws_iam_role.job_applications_role.arn
  handler          = "handler.handler"
  source_code_hash = data.archive_file.lambda.output_base64sha256
  runtime          = "python3.12"
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:${data.aws_partition.current.partition}:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.job_applications_api.id}/*/*"
}

# IAM
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "job_applications_role" {
  name               = "job-applications-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy_attachment" "basic_execution" {
  role       = aws_iam_role.job_applications_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "dynamodb_full_access" {
  role       = aws_iam_role.job_applications_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_role_policy_attachment" "cloudwatch_full_access" {
  role       = aws_iam_role.job_applications_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
}

# ─────────────────────────────────────────────
# S3 
# ─────────────────────────────────────────────

resource "aws_s3_bucket" "job_applications" {
  bucket        = "job-applications-${data.aws_caller_identity.current.account_id}"
  force_destroy = true
}

# Set bucket policy
resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
  bucket = aws_s3_bucket.job_applications.id
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront.json
}

data "aws_iam_policy_document" "allow_access_from_cloudfront" {
  statement {
    sid    = "AllowCloudFrontServicePrincipalRead"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.job_applications.arn}/*"
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

# ─────────────────────────────────────────────
# CloudFront 
# ─────────────────────────────────────────────

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "default-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.job_applications.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = "myS3Origin"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "myS3Origin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

