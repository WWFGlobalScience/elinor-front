# YouTube Duration Integration for Card Carousel

## Current Implementation

The card carousel in `components/home/public.vue` now displays YouTube video durations with the following features:

- Duration badges overlaid on video thumbnails
- Play button overlays to indicate video content
- Hover effects and smooth transitions
- Responsive design

## Hardcoded Durations

Currently, video durations are hardcoded in the component:

```javascript
items: [
  {
    id: '9bxrsgW82L4',
    title: 'Introduction to Elinor',
    duration: '2:45',
  },
  // ... more items
];
```

## Implementing Real YouTube Duration Fetching

To fetch real durations from YouTube, you'll need to:

### 1. Get YouTube Data API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Restrict the API key to YouTube Data API v3 only

### 2. Update the Component

Replace the hardcoded durations with API calls:

```javascript
// In the data() section, remove hardcoded durations
items: [
    {
        id: '9bxrsgW82L4',
        title: 'Introduction to Elinor',
        duration: null, // Will be fetched from API
    },
    // ... more items
]

// Add API key to environment variables
// In .env file:
// YOUTUBE_API_KEY=your_api_key_here

// Update the fetchYouTubeDurations method:
async fetchYouTubeDurations() {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        console.warn('YouTube API key not configured');
        return;
    }

    for (let item of this.items) {
        try {
            const response = await this.$axios.get(
                `https://www.googleapis.com/youtube/v3/videos?id=${item.id}&part=contentDetails&key=${apiKey}`
            );

            if (response.data.items && response.data.items[0]) {
                const duration = response.data.items[0].contentDetails.duration;
                item.duration = this.parseISODuration(duration);
            }
        } catch (error) {
            console.error(`Error fetching duration for ${item.id}:`, error);
        }
    }
},

// Add ISO duration parser:
parseISODuration(duration) {
    // Parse ISO 8601 duration (e.g., "PT2M45S" -> "2:45")
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
```

### 3. Call the Method

Uncomment the call in the mounted lifecycle hook:

```javascript
mounted() {
    this.fetchYouTubeDurations();
}
```

### 4. Rate Limiting Considerations

- YouTube Data API has quotas (10,000 units per day for free tier)
- Each video duration request costs 1 unit
- Consider caching durations in localStorage or a database
- Implement error handling for quota exceeded scenarios

### 5. Alternative: Server-Side Fetching

For better performance and to avoid exposing API keys, consider:

- Creating a server endpoint that fetches durations
- Caching results in your database
- Updating durations periodically via cron jobs

## Benefits of Real Duration Fetching

- Accurate video lengths for users
- Better user experience
- Professional appearance
- Dynamic content updates

## Current Features

✅ Duration badges on thumbnails  
✅ Play button overlays  
✅ Hover effects  
✅ Responsive design  
✅ Duration formatting utility  
⏳ Real YouTube API integration (to be implemented)
