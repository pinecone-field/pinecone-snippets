// Import the Pinecone client
import io.pinecone.clients.Pinecone;

public class InitializeClientExample {
    public static void main(String[] args) {
        
        // Read your API key from an environment variable
        String apiKey = System.getenv("PINECONE_API_KEY");
        
        // Initialize a Pinecone client with your API key
        Pinecone pc = new Pinecone.Builder(apiKey).build();
    }
}