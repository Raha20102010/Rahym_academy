document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
        window.location.href = '/admin-login.html';
        return;
    }

    const videoUploadForm = document.getElementById('videoUploadForm');
    const videoList = document.getElementById('videoList');
    const videoFileInput = document.getElementById('videoFile');
    const uploadProgress = document.createElement('div');
    uploadProgress.className = 'progress mt-2 d-none';
    uploadProgress.innerHTML = `
        <div class="progress-bar" role="progressbar" style="width: 0%"></div>
    `;
    videoUploadForm.appendChild(uploadProgress);
    
    // Add file size validation
    videoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 100 * 1024 * 1024) { // 100MB
                alert('File is too large. Maximum size is 100MB');
                e.target.value = ''; // Clear the file input
                return;
            }
            if (!file.type.startsWith('video/')) {
                alert('Only video files are allowed');
                e.target.value = ''; // Clear the file input
                return;
            }
        }
    });
    
    // Load existing videos
    loadVideos();
    
    videoUploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        const videoFile = document.getElementById('videoFile').files[0];
        
        if (!videoFile) {
            alert('Please select a video file');
            return;
        }
        
        formData.append('title', document.getElementById('videoTitle').value);
        formData.append('description', document.getElementById('videoDescription').value);
        formData.append('video', videoFile);
        formData.append('email', document.getElementById('emailTo').value);
        
        // Show progress bar
        uploadProgress.classList.remove('d-none');
        const progressBar = uploadProgress.querySelector('.progress-bar');
        
        try {
            const response = await fetch('/api/upload-video', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                },
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    addVideoToList(result.video);
                    videoUploadForm.reset();
                    alert('Video uploaded and email sent successfully!');
                } else {
                    throw new Error(result.message || 'Upload failed');
                }
            } else if (response.status === 401) {
                alert('Session expired. Please login again.');
                window.location.href = '/admin-login.html';
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Failed to upload video and send email. Please try again.');
        } finally {
            // Hide progress bar
            uploadProgress.classList.add('d-none');
            progressBar.style.width = '0%';
        }
    });
    
    async function loadVideos() {
        try {
            const response = await fetch('/api/videos', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });
            
            if (response.ok) {
                const videos = await response.json();
                videoList.innerHTML = ''; // Clear existing list
                videos.forEach(video => {
                    const videoElement = createVideoElement(video);
                    videoList.appendChild(videoElement);
                });
            } else if (response.status === 401) {
                alert('Session expired. Please login again.');
                window.location.href = '/admin-login.html';
            }
        } catch (error) {
            console.error('Error loading videos:', error);
            alert('Failed to load videos. Please try again later.');
        }
    }
    
    function createVideoElement(video) {
        const element = document.createElement('div');
        element.className = 'card mb-3 video-card';
        element.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="card-title">${video.title}</h5>
                    <small class="text-muted">${new Date(video.timestamp).toLocaleString()}</small>
                </div>
                <p class="card-text">${video.description}</p>
                <div class="video-player mt-3">
                    <video controls class="w-100" style="max-height: 400px; object-fit: contain;">
                        <source src="${video.url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        `;
        return element;
    }
    
    // Add logout button
    const logoutButton = document.createElement('button');
    logoutButton.className = 'btn btn-danger position-fixed top-0 end-0 m-3';
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin-login.html';
    });
    document.body.appendChild(logoutButton);
}); 