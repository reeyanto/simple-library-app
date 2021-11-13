/* javascript */

function formTambahBuku() {
  // input
  const input_judul = document.querySelector('.container #judul');
  const input_pencipta = document.querySelector('.container #pencipta');
  const input_halaman = document.querySelector('.container #halaman');
  const input_status = document.querySelector('.container #status');
  
  // button
  const button_form = document.querySelector('.box-form .button-form');
  button_form.addEventListener('click', function() {
    // jalankan function formValidation();
    if (formValidation(input_judul, input_pencipta, input_halaman) == true) {
      // jika function formValidation() menghasilkan boolean true, maka jalankan function tambahBuku();
      tambahBuku(input_judul, input_pencipta, input_halaman, input_status);
      // kosongkan semua field
      input_judul.value = '';
      input_pencipta.value = '';
      input_halaman.value = '';
    }
  });
}

formTambahBuku();

function warning(nama_function) {
  if (nama_function) return alert(`ada kesalahan saat menggunakan function ${nama_function}()`);
}

function terlaluPendek(nama) {
  if (!nama) return warning('terlaluPendek');
  return alert(`${nama} terlalu pendek!`);
}

function formValidation(judul, pencipta, halaman) {
  // validation
  if (!judul.value && !pencipta.value && !halaman.value) return alert('isi semua field terlebih dahulu!');
  if (!judul.value || !pencipta.value || !halaman.value) return alert('isi field yang kosong terlebih dahulu dengan benar!');
  if (judul.value.length < 2) return terlaluPendek('judul buku'); 
  if (pencipta.value.length < 2) return terlaluPendek('nama pencipta');
  if (halaman.value.length > 5) return alert('jumlah halaman terlalu banyak!');
  
  return true;
}

function createElement(element_html, element_class, value) {
  if (!element_html || !value) return warning('createElement');
  
  const element = document.createElement(element_html);
  element.className = (element_class == '') ? element_class : '';
  const element_value = document.createTextNode(value);
  element.appendChild(element_value);
  
  return element;
}

// table body
const table_body = document.querySelector('.table tbody');

function tambahBuku(judul, pencipta, halaman, status) {
  const tr = document.createElement('tr');
  
  const row_judul = createElement('td', 'row-judul', judul.value); // judul
  const row_pencipta = createElement('td', 'row-pencipta', pencipta.value); // pencipta
  const row_halaman = createElement('td', 'row-halaman', `${halaman.value} halaman`); // halaman
  
  // status
  const row_status = document.createElement('td');
  row_status.classList.add('row-status');
  const span_status = document.createElement('span');
  span_status.className = `badges ${(status.value == 'ada') ? 'badges-green' : 'badges-red'}`;
  const span_status_value = document.createTextNode(status.value);
  span_status.appendChild(span_status_value);
  row_status.appendChild(span_status);
  
  // opsi
  const row_opsi = document.createElement('td');
  row_opsi.classList.add('row-opsi');
  const icon_opsi = document.createElement('i');
  icon_opsi.className = 'fas fa-fw fa-trash-alt';
  row_opsi.appendChild(icon_opsi);
  
  // fitur hapus item
  icon_opsi.addEventListener('click', () => tr.remove());
  
  tr.appendChild(row_judul);
  tr.appendChild(row_pencipta);
  tr.appendChild(row_halaman);
  tr.appendChild(row_status);
  tr.appendChild(row_opsi);
  
  table_body.appendChild(tr);
  
  // jalankan function searching()
  searching(row_judul, tr);
}

function hapusLibrary() {
  const button = document.querySelector('.container .delete-library');
  button.addEventListener('click', () => table_body.innerHTML = '');
}

hapusLibrary();

function searching(judul, tr) {
  const search_input = document.querySelector('.container .search-input');
  search_input.addEventListener('keyup', function() {
    const input_value = this.value.toLowerCase();
    tr.style.display = (judul.textContent.indexOf(input_value) !== -1) ? '' : 'none';
  });
}
