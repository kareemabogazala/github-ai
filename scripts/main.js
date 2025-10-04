// scripts/main.js

const input = document.getElementById('cv-upload');
const fileName = document.getElementById('file-name');
const uploadButton = document.querySelector('.button');

// Show file name when selected
input.addEventListener('change', () => {
  fileName.textContent = input.files.length > 0
    ? input.files[0].name
    : 'No file selected';
});

// Upload logic
async function handleUpload() {
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

    // TODO: replace with your real agent API (like n8n webhook)
    const response = await fetch('https://your-agent-api-url.com', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Response from API:', data);

    uploadButton.textContent = '✅ Uploaded!';
    uploadButton.style.background = '#22c55e';

    // Show response on the page
    const resultDiv = document.createElement('div');
    resultDiv.style.marginTop = '1rem';
    resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    document.querySelector('.container').appendChild(resultDiv);

  } catch (error) {
    console.error('Upload failed:', error);
    uploadButton.textContent = '❌ Error';
    uploadButton.style.background = '#ef4444';
  } finally {
    uploadButton.disabled = false;
  }
}
