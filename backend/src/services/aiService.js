const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
exports.analyzeImage = async (filePath) => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    const res = await axios.post(`${AI_SERVICE_URL}/ai/analyze-image`, formData, { headers: formData.getHeaders() });
    return res.data;
  } catch (error) {
    console.error('AI analysis error:', error.message);
    throw new Error('AI analysis service unavailable');
  }
};
exports.calculateRiskScore = async (data) => {
  try {
    const res = await axios.post(`${AI_SERVICE_URL}/ai/risk-score`, data);
    return res.data;
  } catch (error) {
    console.error('Risk score error:', error.message);
    throw new Error('Risk scoring service unavailable');
  }
};
exports.calculateComplianceScore = async (data) => {
  try {
    const res = await axios.post(`${AI_SERVICE_URL}/ai/compliance-score`, data);
    return res.data;
  } catch (error) {
    console.error('Compliance score error:', error.message);
    throw new Error('Compliance scoring service unavailable');
  }
};
exports.generateReport = async (data) => {
  try {
    const res = await axios.post(`${AI_SERVICE_URL}/ai/generate-report`, data);
    return res.data;
  } catch (error) {
    console.error('Report generation error:', error.message);
    throw new Error('Report generation service unavailable');
  }
};
