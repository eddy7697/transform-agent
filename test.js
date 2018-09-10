// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision').v1;

// Creates a client
const client = new vision.ImageAnnotatorClient();

const bucketName = 'ctci_poc'

const fileName = 'tesdoc.pdf'

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// Bucket where the file resides
// const bucketName = 'my-bucket';
// Path to PDF file within bucket
// const fileName = 'path/to/document.pdf';

const gcsSourceUri = `gs://${bucketName}/${fileName}`;
const gcsDestinationUri = `gs://${bucketName}/${fileName}.json`;

const inputConfig = {
  // Supported mime_types are: 'application/pdf' and 'image/tiff'
  mimeType: 'application/pdf',
  gcsSource: {
    uri: gcsSourceUri,
  },
};
const outputConfig = {
  gcsDestination: {
    uri: gcsDestinationUri,
  },
};
const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
const request = {
  requests: [
    {
      inputConfig: inputConfig,
      features: features,
      outputConfig: outputConfig,
    },
  ],
};

client
  .asyncBatchAnnotateFiles(request)
  .then(results => {
    const operation = results[0];
    // Get a Promise representation of the final result of the job
    return operation.promise();
  })
  .then(filesResponse => {
    let destinationUri =
      filesResponse[0].responses[0].outputConfig.gcsDestination.uri;
    console.log('Json saved to: ' + destinationUri);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });