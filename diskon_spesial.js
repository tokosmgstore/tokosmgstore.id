const DISKON = {
  AKTIF: true,
  TEKS: "DISKON",
  LINK_TUJUAN: "halaman_diskon/diskon.html",
  WARNA_LATAR: "#ff0000",
  WARNA_TEKS: "#ffffff",
  UKURAN_TEKS: "12px",
  TEBAL: "bold",
  PADDING: "6px 12px",
  LENGKUNG: "6px",
  LEBAR: "fit-content",
  JARAK_ATAS: "0px", /* ✅ DIANGKAT SAMPAI RAPAT KE ATAS */
  JARAK_BAWAH: "6px",
  JARAK_KIRI: "0px"
};

function pasangBanner() {
  const lama = document.getElementById("tombol_diskon_link");
  if (lama) lama.remove();

  if (!DISKON.AKTIF) return;

  const banner = document.createElement("a");
  banner.id = "tombol_diskon_link";
  banner.href = DISKON.LINK_TUJUAN;
  banner.target = "_self";
  banner.textContent = DISKON.TEKS;
  banner.style.cssText = `
    width: ${DISKON.LEBAR};
    margin: ${DISKON.JARAK_ATAS}px 0 ${DISKON.JARAK_BAWAH}px ${DISKON.JARAK_KIRI}px;
    padding: ${DISKON.PADDING};
    background: ${DISKON.WARNA_LATAR};
    color: ${DISKON.WARNA_TEKS};
    font-size: ${DISKON.UKURAN_TEKS};
    font-weight: ${DISKON.TEBAL};
    text-align: center;
    border-radius: ${DISKON.LENGKUNG};
    border: none;
    display: block;
    position: relative;
    float: left;
    clear: left;
    z-index: 999999;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
  `;

  // Taruh di posisi paling atas baris tombol
  let tombolFF = null;
  document.querySelectorAll("*").forEach(el => {
    if (el.textContent.trim().toUpperCase() === "FREE FIRE" && el.offsetWidth > 60) {
      tombolFF = el;
    }
  });

  if (tombolFF) {
    tombolFF.parentElement.insertBefore(banner, tombolFF);
  } else {
    const barisTombol = document.querySelector("div:has(button), div:nth-of-type(5)");
    if (barisTombol) barisTombol.prepend(banner);
  }
}

document.addEventListener("DOMContentLoaded", pasangBanner);
window.addEventListener("load", () => {
  pasangBanner();
  setTimeout(pasangBanner, 300);
  setTimeout(pasangBanner, 800);
});