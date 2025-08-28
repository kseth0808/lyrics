import * as cheerio from "cheerio";
import { cleanLyrics } from "../clean.js";

const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\(.*?\)/g, "")
        .replace(/'/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
};

export const postGetLyircs = async (req, res) => {
    try {
        let { artist, title } = req.body;
        if (!artist || !title) {
            return res.status(400).json({ error: "fields are required" });
        }
        const formattedArtist = slugify(artist);
        const formattedTitle = slugify(title);
        const url = `https://genius.com/${formattedArtist}-${formattedTitle}-lyrics`;
        const pageRes = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                "Accept":
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                Referer: "https://genius.com/",
            },
        });
        console.log(pageRes)
        if (!pageRes.ok) {
            return res.status(404).json({ error: "Song not found on Genius" });
        }
        const html = await pageRes.text();
        const $ = cheerio.load(html);
        const lyricsArr = $('[data-lyrics-container="true"]').map((i, el) => $(el).text().trim()).get();
        const lyric = lyricsArr.length > 0 ? lyricsArr.join("\n") : "";
        const lyrics = cleanLyrics(lyric);
        if (lyrics && lyrics.trim().length > 0) {
            return res.json({ artist, title, lyrics });
        } else {
            return res.json({ artist, title, lyrics: "Lyrics not found" });
        }
    } catch (err) {
        console.error("Error in lyrics:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
