const gallery = document.getElementById('gallery');
let cards = Array.from(gallery.querySelectorAll('.card'));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.getElementById('closeBtn');
const downloadBtn = document.getElementById('downloadBtn');

let currentIndex = 0;

// Open Lightbox
function openLightbox(index) {
  currentIndex = index;
  const card = cards[currentIndex];
  lightboxImg.src = card.dataset.full;
  lightboxTitle.textContent = card.dataset.title;
  lightboxCategory.textContent = card.dataset.category;
  lightbox.classList.add('active');
}
// Close Lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
}
// Show Next / Prev
function showNext(dir = 1) {
  currentIndex = (currentIndex + dir + cards.length) % cards.length;
  openLightbox(currentIndex);
}

cards.forEach((card, idx) => {
  card.addEventListener('click', () => openLightbox(idx));
});

prevBtn.addEventListener('click', () => showNext(-1));
nextBtn.addEventListener('click', () => showNext(1));
closeBtn.addEventListener('click', closeLightbox);

// Download Image
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = lightboxImg.src;
  link.download = lightboxTitle.textContent || 'image';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Filtering by Category
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Search by Title
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    card.style.display = title.includes(term) ? 'block' : 'none';
  });
});

// Shuffle Images
document.getElementById('shuffleBtn').addEventListener('click', () => {
  for (let i = gallery.children.length; i >= 0; i--) {
    gallery.appendChild(gallery.children[Math.random() * i | 0]);
  }
  cards = Array.from(gallery.querySelectorAll('.card'));
});

// Image Style Filters
document.querySelectorAll('[data-style]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-style]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const style = btn.dataset.style;
    cards.forEach(card => {
      const img = card.querySelector('img');
      if (style === 'grayscale') img.style.filter = 'grayscale(100%)';
      else if (style === 'sepia') img.style.filter = 'sepia(100%)';
      else if (style === 'boost') img.style.filter = 'contrast(120%) saturate(130%)';
      else img.style.filter = 'none';
    });
  });
});