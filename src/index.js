import Server from './server';

Server.start().then((server) => console.log(`Server now listening at: ${server.address().port} `));
