import solr from 'solr-client';

// Define Solr client configuration
const client = solr.createClient({
  host: 'localhost',
  port: '8983',
  core: 'your_core_name', // replace with your Solr core name
  path: '/solr'
});

// Define a document to be indexed
const doc = {
  id: '1',
  title: 'Node.js with TypeScript and Solr',
  description: 'An example document for Solr with Node.js and TypeScript integration'
};

// Index the document
client.add(doc, (err, result) => {
  if (err) {
    console.log('Error indexing document:', err);
  } else {
    console.log('Document indexed:', result);
    client.commit((err, res) => {
      if (err) {
        console.log('Error committing changes:', err);
      } else {
        console.log('Changes committed:', res);
        // Perform a search query
        client.search('title:Node.js', (err, obj) => {
          if (err) {
            console.log('Error searching documents:', err);
          } else {
            console.log('Search results:', JSON.stringify(obj.response.docs, null, 2));
          }
        });
      }
    });
  }
});

