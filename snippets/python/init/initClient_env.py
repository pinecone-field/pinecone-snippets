import os
from pinecone import Pinecone

# Read your API key from an environment variable
api_key = os.environ.get("PINECONE_API_KEY")

# Initialize a Pinecone client with your API key
pc = Pinecone(api_key=api_key)
