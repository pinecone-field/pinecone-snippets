// Import the Pinecone client
import io.pinecone.clients.Pinecone;

public class InitializeClientExample {
    public static void main(String[] args) {
        
        // Initialize a Pinecone client with your API key
        Pinecone pc = new Pinecone.Builder("YOUR_API_KEY").build();
    }
}