// This defines a starting set of data to be loaded if the app is loaded with an empty db.
import './fixtures.ts';

// Set up some rate limiting and other important security settings.
import './security.ts';

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import './register-api.ts';
