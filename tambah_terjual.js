document.addEventListener('DOMContentLoaded', function(){
  // ✅ FUNGSI ANGKA
  function angkaLama() {
    return Math.floor(Math.random() * (2150 - 800 + 1)) + 800;
  }
  // ✅ SILENT ROOT: PALING KECIL 1 SAMPAI 180
  function angkaSilentRoot() {
    return Math.floor(Math.random() * (180 - 1 + 1)) + 1;
  }
  // ✅ SILENT NO ROOT: LEBIH BANYAK 181 SAMPAI 400
  function angkaSilentNoRoot() {
    return Math.floor(Math.random() * (400 - 181 + 1)) + 181;
  }

  // ✅ PROSES SEMUA BARANG YANG ADA SEKARANG
  const prosesAwal = () => {
    const semuaTersedia = Array.from(document.querySelectorAll('*'))
      .filter(el => {
        const teks = el.textContent.trim();
        return teks === 'Tersedia' 
            && !teks.includes('AKAN')
            && !el.parentElement.textContent.includes('Terjual');
      });

    semuaTersedia.forEach(el => {
      const kotakInduk = el.closest('div') || el.parentElement;
      const isiKotak = kotakInduk.textContent.toUpperCase();
      let angka;

      // ✅ CEK DENGAN JELAS
      if(isiKotak.includes('SILENT')){
        if(isiKotak.includes('ROOT') && !isiKotak.includes('NO ROOT')){
          // KHUSUS SILENT ROOT SAJA: KECIL
          angka = angkaSilentRoot();
        } else {
          // SILENT NO ROOT / LAINNYA: LEBIH BESAR
          angka = angkaSilentNoRoot();
        }
      } 
      // ✅ SELAIN ITU TETAP BESAR
      else {
        angka = angkaLama();
      }

      const barisBaru = document.createElement('div');
      barisBaru.style.cssText = 'font-size:12px; color:#facc15; font-weight:bold; margin-top:3px;';
      barisBaru.innerHTML = `🛒 Terjual: ${angka.toLocaleString('id-ID')}`;
      el.after(barisBaru);
    });
  };

  prosesAwal();

  // ✅ PANTAU BARANG BARU NANTI
  const pengamat = new MutationObserver(perubahan => {
    perubahan.forEach(ubah => {
      ubah.addedNodes.forEach(simpul => {
        if(simpul.nodeType === 1){
          const temukanBaru = Array.from(simpul.querySelectorAll('*'))
            .filter(el => {
              const teks = el.textContent.trim();
              return teks === 'Tersedia' 
                  && !teks.includes('AKAN')
                  && !el.parentElement.textContent.includes('Terjual');
            });
          
          temukanBaru.forEach(el => {
            const kotakInduk = el.closest('div') || el.parentElement;
            const isiKotak = kotakInduk.textContent.toUpperCase();
            let angka;

            if(isiKotak.includes('SILENT')){
              if(isiKotak.includes('ROOT') && !isiKotak.includes('NO ROOT')){
                angka = angkaSilentRoot();
              } else {
                angka = angkaSilentNoRoot();
              }
            } else {
              angka = angkaLama();
            }

            const barisBaru = document.createElement('div');
            barisBaru.style.cssText = 'font-size:12px; color:#facc15; font-weight:bold; margin-top:3px;';
            barisBaru.innerHTML = `🛒 Terjual: ${angka.toLocaleString('id-ID')}`;
            el.after(barisBaru);
          });
        }
      });
    });
  });

  pengamat.observe(document.body, { childList: true, subtree: true });
});