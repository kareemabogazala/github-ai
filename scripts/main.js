// scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cv-upload');
    const fileName = document.getElementById('file-name');
    const uploadButton = document.getElementById('upload-btn');
  
    if (!input || !fileName || !uploadButton) {
      console.error('❌ One or more elements not found in HTML!');
      return;
    }
  
    // Show file name when selected
    input.addEventListener('change', () => {
      const file = input.files[0];
      fileName.textContent = file ? file.name : 'No file selected';
      uploadButton.disabled = !file;
    });
  
    // Upload logic
    uploadButton.addEventListener('click', async () => {
      const file = input.files[0];
      if (!file) {
        alert('Please select a CV file first!');
        return;
      }
  
      uploadButton.textContent = 'Uploading...';
      uploadButton.disabled = true;
  
      try {
        const formData = new FormData();
        formData.append('cv', file);
  
        // ✅ Use your LIVE webhook (not the /webhook-test/)
        const webhookUrl = 'https://kareemabogazala.app.n8n.cloud/webhook/cv';
  
        const response = await fetch(webhookUrl, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('✅ Response from AI Agent:', data);
  
        uploadButton.textContent = '✅ Uploaded!';
        uploadButton.style.background = '#22c55e';
  
        // Display AI response neatly
        const resultDiv = document.createElement('div');
        resultDiv.style.marginTop = '1rem';
        resultDiv.style.textAlign = 'left';
        resultDiv.style.background = 'rgba(255,255,255,0.05)';
        resultDiv.style.padding = '1rem';
        resultDiv.s
  