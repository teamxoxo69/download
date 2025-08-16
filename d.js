const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('7608263129:AAGWCFq5JGJndq95c5uFPN8s-g1Whu0jtkc');

// ✅ Multiple API Keys for Fallback System
const ALL_IN_ONE_API_KEYS = [
    "c177877170msh3061be6a6a760f0p16185ajsn594809e04812",
    "79fe446404msha1676087e8d9a07p19635bjsnd3d00d0a7ba2",
    "95c60e4e82mshda3311f593ed1b0p11e5b7jsn73dc1c003ce7"
];

const TIKTOK_API_KEYS = [
    "d6311d2781mshc02d8d9dcf166f7p15802bjsn3b5ebe494a49",
    "79fe446404msha1676087e8d9a07p19635bjsnd3d00d0a7ba2",
    "95c60e4e82mshda3311f593ed1b0p11e5b7jsn73dc1c003ce7"
];

const INSTAGRAM_API_KEYS = [
    "79fe446404msha1676087e8d9a07p19635bjsnd3d00d0a7ba2",
    "95c60e4e82mshda3311f593ed1b0p11e5b7jsn73dc1c003ce7",
    "d6311d2781mshc02d8d9dcf166f7p15802bjsn3b5ebe494a49"
];

const FACEBOOK_API_KEYS = [
    "d6311d2781mshc02d8d9dcf166f7p15802bjsn3b5ebe494a49",
    "79fe446404msha1676087e8d9a07p19635bjsnd3d00d0a7ba2",
    "95c60e4e82mshda3311f593ed1b0p11e5b7jsn73dc1c003ce7"
];

// -------------------------
// All-in-One Social Media Downloader with Fallback
// -------------------------
async function fetchAllInOneVideo(videoUrl) {
    for (let i = 0; i < ALL_IN_ONE_API_KEYS.length; i++) {
        try {
            const response = await axios.post(
                "https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink",
                { url: videoUrl },
                {
                    headers: {
                        "x-rapidapi-key": ALL_IN_ONE_API_KEYS[i],
                        "x-rapidapi-host": "social-download-all-in-one.p.rapidapi.com",
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = response.data;
            if (data.medias && data.medias.length > 0) {
                return data.medias[0].url || data.medias[0].download_url;
            }
            if (data.url) return data.url;
            if (data.download_url) return data.download_url;
            if (data.video_url) return data.video_url;

        } catch (error) {
            console.log(`All-in-One API Key ${i + 1} failed:`, error.response?.status);
            if (i === ALL_IN_ONE_API_KEYS.length - 1) {
                console.log('All All-in-One API keys exhausted');
            }
        }
    }
    return null;
}

// -------------------------
// TikTok Video Downloader with Fallback
// -------------------------
async function fetchTikTokVideo(videoLink) {
    for (let i = 0; i < TIKTOK_API_KEYS.length; i++) {
        try {
            const response = await axios.post(
                "https://tiktok-video-no-watermark10.p.rapidapi.com/index/Tiktok/getVideoInfo",
                new URLSearchParams({ url: videoLink }),
                {
                    headers: {
                        "X-Rapidapi-Key": TIKTOK_API_KEYS[i],
                        "X-Rapidapi-Host": "tiktok-video-no-watermark10.p.rapidapi.com",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );
            return response.data.data?.play || null;
        } catch (error) {
            console.log(`TikTok API Key ${i + 1} failed:`, error.response?.status);
            if (i === TIKTOK_API_KEYS.length - 1) {
                console.log('All TikTok API keys exhausted');
            }
        }
    }
    return null;
}

// -------------------------
// Instagram Video Downloader with Fallback
// -------------------------
async function fetchInstagramVideo(instaUrl) {
    for (let i = 0; i < INSTAGRAM_API_KEYS.length; i++) {
        try {
            const response = await axios.get(
                "https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/convert",
                {
                    params: { url: instaUrl },
                    headers: {
                        "x-rapidapi-key": INSTAGRAM_API_KEYS[i],
                        "x-rapidapi-host": "instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com"
                    }
                }
            );
            return response.data.media?.[0]?.url || null;
        } catch (error) {
            console.log(`Instagram API Key ${i + 1} failed:`, error.response?.status);
            if (i === INSTAGRAM_API_KEYS.length - 1) {
                console.log('All Instagram API keys exhausted');
            }
        }
    }
    return null;
}

// -------------------------
// Facebook Video Downloader with Fallback
// -------------------------
async function fetchFacebookVideo(fbUrl) {
    for (let i = 0; i < FACEBOOK_API_KEYS.length; i++) {
        try {
            const response = await axios.get(
                "https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php",
                {
                    params: { url: fbUrl },
                    headers: {
                        "x-rapidapi-key": FACEBOOK_API_KEYS[i],
                        "x-rapidapi-host": "facebook-reel-and-video-downloader.p.rapidapi.com"
                    }
                }
            );
            return response.data?.links?.["Download High Quality"]?.url || 
                   response.data?.links?.["Download Low Quality"]?.url || 
                   null;
        } catch (error) {
            console.log(`Facebook API Key ${i + 1} failed:`, error.response?.status);
            if (i === FACEBOOK_API_KEYS.length - 1) {
                console.log('All Facebook API keys exhausted');
            }
        }
    }
    return null;
}

// Bot start command
bot.start(async (ctx) => {
    const welcomeText = `
⬇️ <b>VIDEO DOWNLOADER BOT</b> ⬇️
━━━━━━━━━━━━━━━━━━━━━
📱 <i>Send any video link to download</i>
🚀 <b>Fast & High Quality!</b>

📝 <b>Supported Platforms:</b>
✅ TikTok Videos
✅ Instagram Videos/Reels  
✅ Facebook Videos/Reels
✅ YouTube Videos
✅ Twitter/X Videos
✅ Reddit Videos
✅ And Many More!

💡 <i>Just paste the link and wait!</i>
🎯 <b>Bot by @ghost_cipher</b>
`;

    await ctx.reply(welcomeText, { parse_mode: 'HTML' });
});

// Handle all text messages as video links
bot.on('text', async (ctx) => {
    try {
        const text = ctx.message.text.trim();

        // Check if it looks like a URL
        if (!text.includes('http') && !text.includes('www.')) {
            await ctx.reply('❌ <b>Please send a valid video link!</b>\n\n📝 <b>Example:</b>\n• https://www.tiktok.com/@user/video/...\n• https://www.instagram.com/reel/...\n• https://youtube.com/watch?v=...', { parse_mode: 'HTML' });
            return;
        }

        // Show processing message
        const processingMsg = await ctx.reply('⏳ <b>ভিডিও নামানো হচ্ছে...</b>', { parse_mode: 'HTML' });

        let videoUrl = await fetchAllInOneVideo(text);
        let platform = 'ভিডিও';

        // If All-in-One fails, try specific APIs as fallback
        if (!videoUrl) {
            if (text.includes("tiktok.com")) {
                videoUrl = await fetchTikTokVideo(text);
                platform = 'TikTok';
            } else if (text.includes("instagram.com")) {
                videoUrl = await fetchInstagramVideo(text);
                platform = 'Instagram';
            } else if (text.includes("facebook.com") || text.includes("fb.watch")) {
                videoUrl = await fetchFacebookVideo(text);
                platform = 'Facebook';
            }
        }

        if (videoUrl) {
            await ctx.replyWithVideo({ url: videoUrl }, { 
                caption: `✅ <b>${platform} ভিডিও ডাউনলোড সম্পূর্ণ!</b>\n🎯 <b>Bot by @ghost_cipher</b>`,
                parse_mode: 'HTML'
            });
        } else {
            await ctx.reply('❌ <b>ভিডিও নামাতে ব্যর্থ!</b>\n\n📝 <b>সাপোর্টেড প্ল্যাটফর্ম:</b>\n• TikTok, Instagram, Facebook\n• YouTube, Twitter/X, Reddit\n• এবং আরো অনেক!', { parse_mode: 'HTML' });
        }

    } catch (error) {
        console.error('Downloader Error:', error);
        await ctx.reply('❌ <b>ডাউনলোড করতে সমস্যা হয়েছে!</b>\nআবার চেষ্টা করুন।', { parse_mode: 'HTML' });
    }
});

// Error handling
bot.catch((err, ctx) => {
    console.log(`⚠️ Error: ${err.message}`);
});

// Launch bot
bot.launch()
    .then(() => {
        console.log('⬇️ Video Downloader Bot is running...');
    })
    .catch(err => {
        console.error('❌ Launch failed:', err.message);
    });
const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Video Downloader Bot is running!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Web server started");
});

