require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const express = require('express');
const cors = require('cors');
const { default: MailSlurp } = require('mailslurp-client');
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const mailslurp = new MailSlurp({ apiKey: "aa47087dedcfaa74704d97602a325afd98149e957ea7b884f71519418faa0a8e" });

app.get('/', (req, res) => {
    res.send('Product server is running');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

// user name = temp-mail
// password = I7rv1VUzkiakP31P




const uri = `mongodb+srv://temp-mail:I7rv1VUzkiakP31P@cluster0.lu7tyzl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        //await client.connect();
        const database = client.db('temp-mail')
        const user = database.collection('user')




        app.post('/create-inbox', async (req, res) => {
            try {
                // Assuming req.body contains the necessary data for creating the inbox
                const email1 = req.body;

                // Create a new inbox
                const { id: inboxId, emailAddress } = await mailslurp.inboxController.createInboxWithDefaults();

                // Insert the inboxId and emailAddress into the user collection
                await user.insertOne({ inboxId, email: email1, emailAddress });

                // Send the created inbox ID and emailAddress as a JSON response
                res.status(200).json({ inboxId, emailAddress });
            } catch (error) {
                console.error('Error creating inbox:', error);
                res.status(500).json({ error: 'Error creating inbox' });
            }
        });




        app.get('/get-emails/:inboxId', async (req, res) => {
            try {
                const inboxId = req.params.inboxId;
        
                // Fetch emails from the specified inbox
                const emails = await mailslurp.inboxController.getEmails({ inboxId });
        
                // Map the emails to include subject and body properties
                const formattedEmails = emails.map(email => ({
                    subject: email.subject,
                    body: email.body,
                    // Add other properties as needed
                }));
        
                // Send the fetched emails as a response to the client
                res.json(formattedEmails);
            } catch (error) {
                console.error('Error fetching emails. Full API response:', error.response);
                res.status(500).json({ error: 'Error fetching emails' });
            }
        });
        



        app.get("/users/:email", async (req, res) => {
            try {
                const userEmail = req.params.email;
                const query = { "email.userEmail": userEmail }; // Adjust the property name accordingly

                const result = await user.findOne(query);
                res.send(result);
            } catch (error) {
                console.error('Error fetching user:', error);
                res.status(500).json({ error: 'Error fetching user' });
            }
        });



        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


