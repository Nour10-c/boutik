import os
import boto3
import mimetypes
import time

try:
    import dotenv
    dotenv.load_dotenv()
    print('[INFO]dotenv loaded')
except Exception:
    print('[WARNING] dotenv not found')

# Functions
def execute(command):
    print(f'RUN: {command}')
    if os.system(command) !=0:
        print(f'ERROR: {command}')
        exit(-1)

def clear_s3(bucket_name):
    s3 = boto3.resource(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name="eu-west-3"
        )
    bucket = s3.Bucket(bucket_name)
    bucket.objects.all().delete()

def upload_to_s3(folder_path, bucket_name):
    client = boto3.client(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name="eu-west-3"
    )

    for root, dirs, files in os.walk(folder_path):
        for filename in files:
            try:
                extension = os.path.splitext(filename)[-1]
                content_type = mimetypes.types_map[extension]
            except Exception:
                content_type = 'text/plain'
            local_path = os.path.join(root, filename)
            relative_path = os.path.relpath(local_path, folder_path)
            client.upload_file(local_path, bucket_name, relative_path, ExtraArgs={
                'ContentType': content_type,
                'ACL': "public-read"
            })

def clear_distribution_cache(distribution_id):
    cloudfront = boto3.client(
        'cloudfront',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name="eu-west-3"
    )
    cloudfront.create_invalidation(
        DistributionId=distribution_id,
        InvalidationBatch={
            'Paths': {
                'Quantity': 1,
                'Items': ['/*']
            },
            'CallerReference': str(time.time())
        }
    )
    print(f'Invalidated distribution {distribution_id}')

# Front
for front in ['boutique', 'backoffice']:
    execute(f'cd {front} && bun i')
    execute(f'cd {front} && bun generate')

    if front == 'boutique':
        clear_s3('iim-2026-boutik')
        upload_to_s3('boutique/.output/public', 'iim-2026-boutik')
        clear_distribution_cache(os.getenv('INVALIDE_DISTRIBUTION_ID_BOUTIQUE'))
    elif front == 'backoffice':
        clear_s3('iim-2026-boutik-backoffice')
        upload_to_s3('backoffice/.output/public', 'iim-2026-boutik-backoffice')
        clear_distribution_cache(os.getenv('INVALIDE_DISTRIBUTION_ID_BACKOFFICE'))

