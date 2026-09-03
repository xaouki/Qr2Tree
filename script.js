const text = document.getElementById('text');
const size = document.getElementById('size');
const color = document.getElementById('color');
const box = document.getElementById('qrcode');
const empty = document.getElementById('empty');
const download = document.getElementById('download');
const copy = document.getElementById('copy');
let lastCanvas = null;

function generate() {
  const value = text.value.trim();
  if (!value) { text.focus(); return; }
  box.innerHTML = '';
  new QRCode(box, {
    text: value,
    width: Number(size.value),
    height: Number(size.value),
    colorDark: color.value,
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
  empty.style.display = 'none';
  download.disabled = false;
  copy.disabled = false;
  setTimeout(() => { lastCanvas = box.querySelector('canvas'); }, 80);
}

document.getElementById('generate').addEventListener('click', generate);
text.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') generate(); });
size.addEventListener('change', generate);
color.addEventListener('input', generate);

download.addEventListener('click', () => {
  if (!lastCanvas) lastCanvas = box.querySelector('canvas');
  if (!lastCanvas) return;
  const a = document.createElement('a');
  a.download = 'qr2tree-qr.png';
  a.href = lastCanvas.toDataURL('image/png');
  a.click();
});

copy.addEventListener('click', async () => {
  await navigator.clipboard.writeText(text.value.trim());
  const old = copy.textContent;
  copy.textContent = 'Copied ✓';
  setTimeout(() => copy.textContent = old, 1200);
});

generate();