const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
let currentFilter = 'none';

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Error accessing camera:", err);
  });

// Apply filter
function setFilter(filter) {
  currentFilter = filter;
  video.style.filter = filter;

  document.querySelectorAll('.filters button').forEach(btn => {
    btn.classList.remove('active');
  });

  const btn = Array.from(document.querySelectorAll('.filters button'))
                   .find(b => b.innerText.toLowerCase().includes(filter === 'none' ? 'normal' : filter.split('(')[0]));
  if (btn) btn.classList.add('active');
}

// Capture photo
function capture() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');

  context.filter = currentFilter;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.style.display = 'block';
}

// Download photo
function downloadImage() {
  const link = document.createElement('a');
  link.download = 'photo.png';
  link.href = canvas.toDataURL();
  link.click();
}
