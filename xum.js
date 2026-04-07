// isai.js - Compact with two base URLs
const repos = [
  {
    base: "https://github.com/atsuperman/play2/raw/main/",
      songs: [
{ file: "tamil_iragai_pole_clup_mix_tape.mp3", details: "Remix By dj jose" },
{ file: "Jorthaale wraith Vs Remix.m4a", details: "📀 Jorthaale (Wraith V Remix) (2021) / 🎙️ Asal Kolaar, ofRO / 🎼 Wraith V / 📝 Asal Kolaar" },
{ file: "vada vada Paiya mix.m4a", details: "💿 youtube Source NO1 AUDIO MIXER" }  ]
  },

  {
    base: "https://raw.githubusercontent.com/atsuperman/O1/refs/heads/main/",
    songs: [

{ file: "Kuthu Fire- Vidya Vox.m4a", details: "📀 Kuthu Fire (2017) / 🎙️ Vidya Vox / 🎼 Shankar Tucker / 📝 Vidya Vox, Shankar Tucker" },
{ file: "Machi mannaru.m4a", details: "📀Dj Donz (1999) / 📁 80s remix" },
{ file: "Moodu- Brodha V.m4a", details: "📀 Moodu (2023) / 🎙️ Brodha V / 🎼 Brodha V / 📝 Brodha V" },
{ file: "Sundariye mix.m4a", details: "📀 DJ unknown (2013)" },
{ file: "vangonna echo extend mix.m4a", details: "📀 DJ unknown (2012)" },
{ file: "vazha thoppukulla mix.m4a", details: "📀 DJ unknown (2014)" },
{ file: "Thuppuran.m4a", details: "📀 Thuppuran (2022) / 🎙️ ADK, Lucky Lakmina, Abu Karim Ismail / 🎼 Pasan Liyanage / 📝 ADK, Lucky Lakmina, Pasan Liyanage" }

]
  }

];

// Build final songs array with full URL
export const songs = [];
for (const repo of repos) {
  for (const s of repo.songs) {
    songs.push({
      file: s.file,
      url: repo.base + encodeURIComponent(s.file),
      details: s.details
    });
  }
}
