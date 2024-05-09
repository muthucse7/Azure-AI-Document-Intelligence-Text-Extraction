// documentModel.js
const fs = require('fs');

const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const { documentIntelligenceEndpoint, documentIntelligenceApiKey } = require('./config');

async function extractText(filePath) {
    try {
        // Perform text extraction using Azure AI Document Intelligence
        const fileStream = fs.createReadStream(filePath);
        const documentAnalysisClient = new DocumentAnalysisClient(documentIntelligenceEndpoint, new AzureKeyCredential(documentIntelligenceApiKey));
        const poller = await documentAnalysisClient.beginAnalyzeDocument("prebuilt-read", fileStream);
        const { content } = await poller.pollUntilDone();

        return content;
    } catch (error) {
        throw new Error('Error processing file:', error);
    }
}

module.exports = {
    extractText
};
