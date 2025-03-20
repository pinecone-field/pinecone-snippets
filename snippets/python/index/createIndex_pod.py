from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import PodSpec

pc = Pinecone(api_key="YOUR_API_KEY")

pc.create_index(
  name="example-index",
  dimension=1536,
  metric="cosine",
  spec=PodSpec(
    environment="us-west-1-gcp",
    pod_type="p1.x1",
    pods=1
  )
)