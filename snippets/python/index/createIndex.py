from pinecone import Pinecone

pc = Pinecone(api_key="YOUR_API_KEY")
pc.create_index(name="example-index")