document.addEventListener('DOMContentLoaded', () => {
    const videoUploadForm = document.getElementById('videoUploadForm');
    const videoList = document.getElementById('videoList');
    
    // Load existing videos from localStorage
    loadVideos();
    
    videoUploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', document.getElementById('videoTitle').value);
        formData.append('description', document.getElementById('videoDescription').value);
        formData.append('video', document.getElementById('videoFile').files[0]);
        formData.append('email', document.getElementById('emailTo').value);
        
        try {
            const response = await fetch('/api/upload-video', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                addVideoToList({
                    title: document.getElementById('videoTitle').value,
                    description: document.getElementById('videoDescription').value,
                    timestamp: new Date().toISOString()
                });
                
                // Clear form
                videoUploadForm.reset();
                alert('Video uploaded and email sent successfully!');
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to upload video and send email. Please try again.');
        }
    });
    
    function addVideoToList(video) {
        const videos = JSON.parse(localStorage.getItem('videos') || '[]');
        videos.unshift(video);
        localStorage.setItem('videos', JSON.stringify(videos));
        
        const videoElement = createVideoElement(video);
        videoList.insertBefore(videoElement, videoList.firstChild);
    }
    
    function loadVideos() {
        const videos = JSON.parse(localStorage.getItem('videos') || '[]');
        videos.forEach(video => {
            const videoElement = createVideoElement(video);
            videoList.appendChild(videoElement);
        });
    }
    
    function createVideoElement(video) {
        const element = document.createElement('div');
        element.className = 'list-group-item';
        element.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${video.title}</h5>
                <small>${new Date(video.timestamp).toLocaleString()}</small>
            </div>
            <p class="mb-1">${video.description}</p>
        `;
        return element;
    }
}); 