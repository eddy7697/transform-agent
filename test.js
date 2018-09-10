  // [START translate_detect_language]
  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Creates a client
  const translate = new Translate();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const text = 'The text for which to detect language, e.g. Hello, world!';

  // Detects the language. "text" can be a string for detecting the language of
  // a single piece of text, or an array of strings for detecting the languages
  // of multiple texts.
  translate
    .detect(text)
    .then(results => {
      let detections = results[0];
      detections = Array.isArray(detections) ? detections : [detections];

      console.log('Detections:');
      detections.forEach(detection => {
        console.log(`${detection.input} => ${detection.language}`);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END translate_detect_language]