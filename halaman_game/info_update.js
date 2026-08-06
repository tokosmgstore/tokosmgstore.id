// ✅ FORMAT: "NAMA BARANG|ID HALAMAN"
const DAFTAR = [
  // FREE FIRE
  "|ff",
  "LK TEAM|ff",
  "|ff",
  "PATO TEAM|ff",
  "SILENT NO ROOT|ff",
  "SILENT ROOT|ff",
  "|ff",

  // MLBB
  "MLBB|mlbb",

  // CODM
  "CODM|codm",

  // PUBG
  "PUBG|pubg",

  // BLOOD STRIKE
  "HASSAN|bs",
  "SILENT ROOT|bs",
  "BR MODS|bs",

  // CROSSFIRE LEGENDS
  "VVIP MODS|cf",
  "HASSAN|cf",
  "BR MODS|cf",

  // DELTA FORCE ✅ PASTI JALAN
  "VVIP MODS|df",
  "SILENT ROOT|df",

  // POINT BLANK
  "POINT BLANK|pb"
];

const SET = {
  teks: "PROSES UPDATE",
  ukuran: "7px",       /* ✅ TULISAN DIPERKECIL */
  warnaTeks: "#000000",
  latarKotak: "#ffff00",
  ketebalan: "600",
  jarak_atas: "-10px", /* ✅ POSISI DIATUR SESUAI KECILNYA */
  padding: "1px 3px"   /* ✅ KOTAK DIKECILKAN KANAN KIRI ATAS BAWAH */
};

function pasangTandaHitamKuning() {
  document.querySelectorAll(".tanda_update_hitam_kuning").forEach(t => t.remove());

  // Ambil ID halaman dari tag <body>
  const idHalaman = document.body.id.toLowerCase();

  DAFTAR.forEach(item => {
    if (!item) return;
    const [namaBarang, idYangCocok] = item.split("|");
    if (!namaBarang || !idYangCocok) return;

    // Hanya jalan kalau ID halaman cocok
    if (idHalaman !== idYangCocok) return;

    const semuaJudul = document.querySelectorAll("h1, h2, h3, h4, h5, h6, b, strong");
    semuaJudul.forEach(el => {
      const teks = el.textContent.trim().toUpperCase();
      if (teks !== namaBarang.toUpperCase()) return;

      const kotak = el.closest("div");
      if (!kotak) return;
      if (getComputedStyle(kotak).position !== "relative") kotak.style.position = "relative";

      const tanda = document.createElement("span");
      tanda.className = "tanda_update_hitam_kuning";
      tanda.textContent = SET.teks;
      tanda.style.cssText = `
        position: absolute;
        top: calc(${el.offsetTop}px + ${SET.jarak_atas});
        left: ${el.offsetLeft}px;
        color: ${SET.warnaTeks};
        background: ${SET.latarKotak};
        font-size: ${SET.ukuran};
        font-weight: ${SET.ketebalan};
        border: none;
        padding: ${SET.padding};
        border-radius: 2px;
        z-index: 9999;
        white-space: nowrap;
      `;
      kotak.appendChild(tanda);
    });
  });
}

window.onload = pasangTandaHitamKuning;
document.addEventListener("DOMContentLoaded", pasangTandaHitamKuning);
