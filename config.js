const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "ARMAN RJ",
    ownerNumber: process.env.OWNER_NUMBER || "923126661985",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUpFUlduUk1FQ2tIMTh5YkRlb29PdkdsRUpVUm9zQVE3ZjNKTWZCWVQzQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0VjSHFBdnlVOEtOYzVuMDNLbGp5azV6WTlqR0dFNnkzK3J2bzcrSkRoND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSk1uOExSeVBEVWJhUDZ6ak9jYjM1cmhNR25jL2E3bHQrc1ZrTWpWRVU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkVW1lTEFPM1hXYkJVWFpJYUJvdTJTMjFGSFkxQmlKWjRxd2dGQTB2WFNVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlCN0JsbUVlMVJkVG1ucmN6TFRmMGpBUnc5bFZSM1NLaHRteUczalRMSFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktYd2NvTjdtQlZnNC9DdnJ5MWNJVWFobDVsTldxYnJuT0RIUEdYNDZBZ1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUZWTUg0MXNHaGNVcnljRHU0S1kzS3JGK2dQbHlYNFQ1cGNzK2h6RS9Vbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkdNK1JqNXFWSk5MZlFiOWZtQkpBZGVoMThCcytIY3Rma2dYKzhEdjZoUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlltK0ZjUzFzMTVZcGg1dVhyWkZkaFlnV2ExR3llU2JheldrY0tvWFJyS0trRWNFVlFSME9SakRqYndwQzNGU0hwTDZHc1MrVVV5OGNVa3lFaUtLeENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzAsImFkdlNlY3JldEtleSI6Im1odjF5cFZ6Q244MThTbmVUcW53N09pVkZhTC9CUDg3TnZ3dGtEbmNVVzg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMTI2NjYxOTg1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjZERTQyNEYwNTdGNDk1RTdGRjM3RThCNTMyNUM3NTU4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDMwOTU2NTR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05uY29MVUVFTlNPbHI4R0dBMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IitWOCtDeFNJbmdPc2lkNzFKTjJOZDJJdTErZ1hjdFlNUDVUUWI1SXJReDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ii9iNWlHODdOUTNmc3ptdDBpK241clgzZ1FBc0tqWWV1bW5KajJDY2FCc0s3dTZUMkNSZUZHVndCMGd6OFVLZS9FcUtBOVRjMkpuWWozbHBzMVZ3L0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3cWd1ZFE0V01QN1BPMUxaNngvY3RpR0I2T3BXMFRHWW5qbnJGeE9TWlNaU1ZzQU5VRlhJcmhoZzRJZURzaTFPNGFwa0dhakNIdkIzSUtiSEJTUktEZz09In0sIm1lIjp7ImlkIjoiOTIzMTI2NjYxOTg1OjQyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjc1MTcwNTE4NDE3NTQzOjQyQGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMxMjY2NjE5ODU6NDJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZmxmUGdzVWlKNERySW5lOVNUZGpYZGlMdGZvRjNMV0REK1UwRytTSzBNZSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzMDk1NjQ5LCJsYXN0UHJvcEhhc2giOiIxSzRoSDQiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVFSiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
