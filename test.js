  // [START translate_list_codes]
  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Creates a client
  const translate = new Translate();

  // Lists available translation language with their names in English (the default).
  translate
    .getLanguages()
    .then(results => {
      const languages = results[0];

      console.log('Languages:');
      languages.forEach(language => console.log(language));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END translate_list_codes]