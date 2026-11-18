LOBEWOHL – SBCS Farewell 2026–27
================================

UPLOAD
1. Upload every item in this package to the ROOT of your new GitHub repository.
   The root is the page where you see README.txt and index.html.
2. Keep the folder names exactly as shown:
   assets/photos/
   assets/videos/
3. Enable GitHub Pages:
   Repository > Settings > Pages > Deploy from a branch > main > /(root) > Save.
4. Wait for Pages to publish, then open the Pages URL.

ADDING PHOTOS
1. Upload image files into assets/photos/
2. Edit photos.json and add entries like:
[
  {
    "src": "assets/photos/your-photo.jpg",
    "category": "Friends",
    "title": "Friends forever"
  }
]
Supported categories: Entry, Candid, Friends, Groups, Performances, Teachers.
Use exact filename spelling and capitalization. JSON must not have a comma after the final item.
You can add multiple objects separated by commas.

ADDING VIDEOS
1. Upload MP4 files into assets/videos/
2. Edit videos.json and add entries like:
[
  {
    "src": "assets/videos/your-video.mp4",
    "title": "Farewell aftermovie"
  }
]
Videos are played directly on the website with the built-in browser video player.

IMPORTANT
- This is a static website; it has no private admin dashboard or visitor login.
- Anyone who can access the public site can view the photos/videos. They may be copied or recorded.
- Get permission from the photographer and people shown before publishing.
- GitHub Pages is free but has storage, bandwidth and usage limits. It is not unlimited video hosting.
- Keep backups of original photos and videos.
