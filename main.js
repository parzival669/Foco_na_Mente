const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });
  
  navOverlay.addEventListener('click', function() {
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    this.classList.remove('active');
    document.body.style.overflow = '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

const carouselInner = document.getElementById('carousel-inner');
const carouselIndicators = document.getElementById('carousel-indicators');
let currentIndex = 0;
let carouselInterval;

function updateCarousel() {
  const totalItems = document.querySelectorAll('.carousel-item').length;
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
    indicator.setAttribute('aria-selected', index === currentIndex);
  });
}

function resetAutoPlay() {
  clearInterval(carouselInterval);
  startAutoPlay();
}

function startAutoPlay() {
  carouselInterval = setInterval(() => {
    const totalItems = document.querySelectorAll('.carousel-item').length;
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  }, 5000);
}

const setupCarousel = () => {
  document.querySelectorAll('.carousel-item').forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('carousel-indicator');
    indicator.setAttribute('aria-label', `Slide ${index + 1}`);
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      resetAutoPlay();
    });
    carouselIndicators.appendChild(indicator);
  });

  document.querySelector('.carousel-button.prev').addEventListener('click', () => {
    const totalItems = document.querySelectorAll('.carousel-item').length;
    currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    updateCarousel();
    resetAutoPlay();
  });

  document.querySelector('.carousel-button.next').addEventListener('click', () => {
    const totalItems = document.querySelectorAll('.carousel-item').length;
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    updateCarousel();
    resetAutoPlay();
  });

  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
  carousel.addEventListener('mouseleave', startAutoPlay);

  updateCarousel();
  startAutoPlay();
};

setupCarousel();

const articlesData = [
  {
    id: "artigo1",
    title: "Foco na Mente: Promoção da Saúde Mental na UNITAU",
    description: "Conheça o Projeto Foco na Mente, que promove saúde mental para acadêmicos da UNITAU e clientes psiquiátricos do HMUT, com ações de acolhimento, conscientização sobre transtornos mentais e terapias integrativas, adaptadas para o formato online durante a pandemia.",
    logo: "assets/Logo.svg",
    pdf: "assets/articles/Foco na mente.pdf",
    author: {
      name: "Oscar César Pires e outros",
      bio: "Doutor em Ciências e professor da UNITAU, lidera o Projeto Foco na Mente com uma equipe interdisciplinar de médicos, psicólogos e estudantes, focada em saúde mental e extensão universitária.",
      image: "assets/Logo.svg",
      gender: "M"
    }
  },
  {
    id: 'artigo2',
    title: 'Dicas de Saúde Mental Baseadas na Literatura Médica',
    description: 'Descubra estratégias práticas para melhorar o bem-estar mental, incluindo sono, alimentação, exercício, conexões sociais, mindfulness, lazer e autoestima, com embasamento em estudos científicos.',
    logo: 'assets/Logo.svg',
    pdf: 'assets/articles/REV 23 ABR TEXTO SITE FOCO 22_04 para 28_04.pdf',
    author: {
      name: 'Julia R. G. Araujo',
      bio: 'Especialista em saúde mental e integrante do Projeto Foco na Mente, com foco em estratégias baseadas em evidências científicas.',
      image: 'assets/Logo.svg',
      gender: 'F'
    }
  },
  {
    id: "artigo3",
    title: "Como lidar com a ansiedade no dia a dia",
    description: "Este artigo do Projeto Foco na Mente orienta acadêmicos da UNITAU a reconhecerem e enfrentarem a ansiedade no cotidiano, oferecendo técnicas como respiração 4-7-8, organização da rotina e prática de exercícios físicos.",
    logo: "assets/Logo.svg",
    pdf: "assets/articles/Texto Site FnM 05.2025-1.pdf",
    author: {
      name: "Pedro Medeiros Fisco",
      bio: "Estudante de Medicina da UNITAU e integrante do subgrupo do site no Projeto Foco na Mente. Interessado em saúde mental e bem-estar emocional.",
      image: "assets/Logo.svg",
      gender: "M"
    }
  },
  {
    id: "artigo4",
    title: "Música e Cérebro: A Conexão que Muda o seu Estado Emocional",
    description: "Explora como a música afeta o cérebro, influenciando emoções, memória e bem-estar. O artigo destaca a importância da musicoterapia, especialmente em contextos como a pandemia de COVID-19.",
    logo: "assets/Logo.svg",
    pdf: "assets/articles/04.pdf",
    author: {
      name: "Giovana E. A. Jordão",
      bio: "Membro do subgrupo site do Projeto Foco na Mente, interessada na interseção entre arte, ciência e saúde mental.",
      image: "assets/Logo.svg",
      gender: "F"
    }
  },
  {
    id: "artigo5",
    title: "Saúde Mental na Universidade: Um Desafio Contemporâneo",
    description: "Analisa os desafios emocionais enfrentados por universitários, destacando a importância do acolhimento institucional e do autocuidado para uma experiência acadêmica mais saudável.",
    logo: "assets/Logo.svg",
    pdf: "assets/articles/Documento (1).pdf",
    author: {
      name: "Letícia Curvo Bellei",
      bio: "Integrante do subgrupo site do Projeto Foco na Mente, dedica-se à conscientização sobre saúde mental no ambiente universitário.",
      image: "assets/Logo.svg",
      gender: "F"
    }
  },
  {
    id: "artigo6",
    title: "O Impacto das Redes Sociais na Saúde Mental dos Adolescentes",
    description: "Este artigo analisa os efeitos positivos e negativos das redes sociais na saúde mental dos jovens, destacando sintomas associados ao uso excessivo e oferecendo orientações para um uso mais saudável da tecnologia.",
    logo: "assets/Logo.svg",
    pdf: "assets/articles/A_influência_das_mídias_e_redes_sociais_na_saúde_mental_dos_jovens.pdf",
    author: {
      name: "Não especificado",
      bio: "Autor(a) integrante do Projeto Foco na Mente, voltado para temas de saúde mental e impacto das mídias digitais em jovens.",
      image: "assets/Logo.svg",
      gender: "N"
    }
  }
];

const articlesGrid = document.getElementById('articles-grid');
const loadMoreBtn = document.getElementById('load-more');
let visibleArticles = 3;
const articlesPerLoad = 3;

function renderArticles() {
  const articlesToShow = articlesData.slice(0, visibleArticles);
  
  articlesGrid.innerHTML = articlesToShow.map(article => `
    <div class="article-card animate-card">
      <div class="article-header">
        <img src="${article.logo}" alt="Logo Foco na Mente">
      </div>
      <div class="article-text">
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <div class="article-buttons">
          <a href="${article.pdf}" class="btn btn-secondary btn-download animate-button" download aria-label="Baixar artigo ${article.title}">
            <span class="btn-text">Baixar Artigo</span>
            <span class="spinner"></span>
          </a>
        </div>
      </div>
      <div class="author-card">
        <div class="author-info">
          <p class="author-rating" aria-label="Avaliação 5 estrelas">★★★★★</p>
          <p class="author-label">AUTOR${article.author.gender === 'F' ? 'A' : ''}</p>
          <h4 class="author-name">${article.author.name}</h4>
          <p class="author-bio">${article.author.bio}</p>
        </div>
      </div>
    </div>
  `).join('');

  loadMoreBtn.style.display = visibleArticles >= articlesData.length ? 'none' : 'block';
  attachDownloadListeners();
}

function attachDownloadListeners() {
  document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function(e) {
      if (!this.classList.contains('downloading')) {
        this.classList.add('downloading');
        setTimeout(() => {
          this.classList.remove('downloading');
        }, 2000);
      }
    });
  });
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    visibleArticles += articlesPerLoad;
    renderArticles();
  });
}

renderArticles();

const setupContactForm = () => {
  const TOKEN = '7856237367:AAH5vq_MpIAEwDwuYn1XjWumByo-PARYKyg';
  const CHAT_ID = '-4747072946';
  const form = document.getElementById('contact-form');

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const messageDiv = document.getElementById('form-message');

    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;
    messageDiv.style.display = 'none';

    try {
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData.entries());
      const text = `
🚨 *Nova mensagem do site!* 🚨
👤 *Nome:* ${formValues.name}
📧 *Email:* ${formValues.email}
📱 *Telefone:* ${formValues.phone || 'Não informado'}
📌 *Assunto:* ${formValues.subject}
📝 *Mensagem:* ${formValues.message}
      `;

      const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' })
      });

      const data = await response.json();
      if (data.ok) {
        messageDiv.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        messageDiv.className = 'form-message success';
        form.reset();
      } else {
        throw new Error(data.description || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro:', error);
      messageDiv.textContent = 'Erro ao enviar a mensagem. Por favor, tente novamente mais tarde.';
      messageDiv.className = 'form-message error';
    } finally {
      btnText.style.display = 'inline-block';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
      messageDiv.style.display = 'block';
      messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
};

setupContactForm();

// Ajustado: Efeito de Digitação Contínua com Tempos Reduzidos
function setupTypingEffect() {
  const title = document.querySelector('.hero-title span');
  const phrases = ['NA MENTE', 'EM VOCÊ', 'MENTAL'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isTyping = true;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    title.textContent = currentPhrase.substring(0, charIndex);

    if (isTyping && charIndex < currentPhrase.length) {
      charIndex++;
    } else if (isTyping && charIndex === currentPhrase.length) {
      isTyping = false;
      setTimeout(type, 1500); // Reduzido de 1500ms pra 1000ms
      return;
    } else if (!isTyping && charIndex > 0) {
      charIndex--;
    } else if (!isTyping && charIndex === 0) {
      isTyping = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(type, isTyping ? 200 : 80); // Reduzido de 120ms/50ms pra 100ms/40ms
  }
  type();
}
document.addEventListener('DOMContentLoaded', setupTypingEffect);