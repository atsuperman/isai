// isai.js - Compact with two base URLs
const repos = [
  {
    base: "https://github.com/atsuperman/G1/raw/refs/heads/main/",
      songs: [
{ file: "Engalukkum Kaalam.m4a", details: "🎬 Pasamalar (1961) / 🎙️ T M Soundararajan, P Susheela / 🎼 Viswanathan–Ramamoorthy / 📝 Kannadasan" },
{ file: "Malargalaipol.m4a", details: "🎬 Pasamalar (1961) / 🎙️ T M Soundararajan / 🎼 Viswanathan–Ramamoorthy / 📝 Kannadasan" },
{ file: "Mayangugiraal Oru.m4a", details: "🎬 Pasamalar (1961) / 🎙️ P Susheela / 🎼 Viswanathan–Ramamoorthy / 📝 Kannadasan" },
{ file: "Malarndhum Malaradha.m4a", details: "🎬 Pasamalar (1961) / 🎙️ T M Soundararajan, P Susheela / 🎼 Viswanathan–Ramamoorthy / 📝 Kannadasan" },
{ file: "Paattondru Ketten.m4a", details: "🎬 Pasamalar (1961) / 🎙️ Jamuna Rani / 🎼 Viswanathan–Ramamoorthy / 📝 Kannadasan" },
{ file: "Vaarai En Thozhi.m4a", details: "🎬 Pasamalar (1961) / 🎙️ L R Eswari / 🎼 Viswanathan–Ramamoorthy / 📝 Kannadasan" },
{ file: "Yaar Yaar Yaar Aval.m4a", details: "🎬 Pasamalar (1961) / 🎙️ P B Sreenivas, P Susheela / 🎼 Viswanathan–Ramamoorthy / 📝 Kannadasan" },
{ file: "Aadaamal Aadukiren.m4a", details: "🎬 Aayirathil Oruvan (1965) / 🎙️ P Susheela / 🎼 Viswanathan – Ramamoorthy / 📝 Vaali" },
{ file: "Odum Megangalae.m4a", details: "🎬 Aayirathil Oruvan (1965) / 🎙️ T M Soundararajan / 🎼 Viswanathan–Ramamoorthy / 📝 Kannadasan" },
{ file: "Atho Andha.m4a", details: "🎬 Aayirathil Oruvan (1965) / 🎙️ T M Soundararajan / 🎼 Viswanathan–Ramamoorthy / 📝 Kannadasan" },
{ file: "Unnai Naan.m4a", details: "🎬 Aayirathil Oruvan (1965) / 🎙️ P Susheela / 🎼 Viswanathan–Ramamoorthy / 📝 Vaali" },
{ file: "Yen Endra Kelvi.m4a", details: "🎬 Aayirathil Oruvan (1965) / 🎙️ T M Soundararajan / 🎼 M S Viswanathan‑Ramamoorthy / 📝 Vaali" },
{ file: "Naanamo.m4a", details: "🎬 Aayirathil Oruvan (1965) / 🎙️ T. M. Soundararajan, P. Susheela / 🎼 Viswanathan Ramamoorthy / 📝 Kannadasan" }
    ]
  },

  {
    base: "https://github.com/atsuperman/play2/raw/main/",
    songs: [
{ file: "Paal Vannam.mp3", details: "🎬 Paasam (1962) / 🎤 P. B. Srinivas, P. Susheela / 🎼 Viswanathan - Ramamoorthy" }, 
{ file: "Kavalaiyai Theerpadhu Naatiya.mp3", details: "🎬 Sivakavi (1943) / 🎙️ M. K. Thyagaraja Bhagavathar / 🎼 Papanasam Sivan / 📝 Papanasam Sivan" },
{ file: "Soppana Vaazhvil.mp3", details: "🎬 Sivakavi (1943) / 🎙️ M. K. Thyagaraja Bhagavathar / 🎼 Papanasam Sivan / 📝 Papanasam Sivan" },
{ file: "Vadhaname Chandra Bimbamo.mp3", details: "🎬 Sivakavi (1943) / 🎙️ M. K. Thyagaraja Bhagavathar / 🎼 Papanasam Sivan / 📝 Papanasam Sivan" },
{ file: "Vallalai Paadum Vaayal.mp3", details: "🎬 Sivakavi (1943) / 🎙️ M. K. Thyagaraja Bhagavathar / 🎼 Papanasam Sivan" },
{ file: "Vasantha Ruthu.mp3", details: "🎬 Sivakavi (1943) / 🎙️ M. K. Thyagaraja Bhagavathar, S. Jayalakshmi / 🎼 Papanasam Sivan / 📝 Papanasam Sivan" }
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
