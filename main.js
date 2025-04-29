// Menu mobile melhorado
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
  
  // Fechar menu ao clicar no overlay
  navOverlay.addEventListener('click', function() {
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    this.classList.remove('active');
    document.body.style.overflow = '';
  });

  
  // Fechar menu ao clicar em um link
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

  // Carrossel
  const carouselInner = document.getElementById('carousel-inner');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const carouselIndicators = document.getElementById('carousel-indicators');
  let currentIndex = 0;
  let carouselInterval;

  if (carouselInner && carouselItems.length && carouselIndicators) {
    carouselItems.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('carousel-indicator');
      indicator.setAttribute('aria-label', `Slide ${index + 1}`);
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      carouselIndicators.appendChild(indicator);
    });

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
      resetAutoPlay();
    }

    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
      document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
        indicator.setAttribute('aria-selected', index === currentIndex);
      });
    }

    function startAutoPlay() {
      carouselInterval = setInterval(() => {
        currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
      }, 5000);
    }

    function resetAutoPlay() {
      clearInterval(carouselInterval);
      startAutoPlay();
    }

    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
        updateCarousel();
        resetAutoPlay();
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
        resetAutoPlay();
      });
    }

    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
      carousel.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
  }

  // Articles Section
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
    // {
    //   id: 'artigo3',
    //   title: 'Autismo: estratégias de inclusão na educação',
    //   description: 'Descubra métodos eficazes para promover a inclusão de crianças autistas no ambiente escolar.',
    //   logo: 'assets/Logo.svg',
    //   pdf: '',
    //   author: {
    //     name: 'Sicrana Oliveira',
    //     bio: 'Pedagoga especializada em educação inclusiva e neurodiversidade.',
    //     image: 'assets/Autora2.png',
    //     gender: 'F'
    //   }
    // },
    // {
    //   id: 'artigo4',
    //   title: 'Mindfulness como ferramenta para gestão da ansiedade',
    //   description: 'Aprenda como práticas de mindfulness podem ajudar a reduzir a ansiedade e melhorar o bem-estar.',
    //   logo: 'assets/Logo.svg',
    //   pdf: 'assets/articles/mindfulness-ansiedade.pdf',
    //   author: {
    //     name: 'Joana Pereira',
    //     bio: 'Psicóloga especializada em terapias cognitivo-comportamentais e mindfulness.',
    //     image: 'assets/Autora3.png',
    //     gender: 'F'
    //   }
    // }
  ];

  const articlesGrid = document.getElementById('articles-grid');
  const loadMoreBtn = document.getElementById('load-more');
  let visibleArticles = 3;
  const articlesPerLoad = 3;

  function renderArticles() {
    const articlesToShow = articlesData.slice(0, visibleArticles);
    
    articlesGrid.innerHTML = articlesToShow.map(article => `
      <div class="article-card">
        <div class="article-header">
          <img src="${article.logo}" alt="Logo Foco na Mente">
        </div>
        <div class="article-text">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <div class="article-buttons">
            <a href="${article.pdf}" class="btn btn-secondary btn-download" download aria-label="Baixar artigo ${article.title}">
              <span class="btn-text">Baixar Artigo</span>
              <span class="spinner"></span>
            </a>
            <!-- <button class="btn btn-primary" onclick="window.location.href='#${article.id}'">Saiba mais</button> -->
          </div>
        </div>
        <div class="author-card">
          <div class="author-info">
            <p class="author-rating" aria-label="Avaliação 5 estrelas">★★★★★</p>
            <p class="author-label">AUTOR${article.author.gender === 'F' ? 'A' : ''}</p>
            <h4 class="author-name">${article.author.name}</h4>
            <p class="author-bio">${article.author.bio}</p>
          </div>
          <!-- <div class="author-image">
            <img src="${article.author.image || 'assets/default-author.png'}" alt="Foto do autor ${article.author.name}" class="author-img">
          </div> -->
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
          }, 2000); // Simula download
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

  // Configuração do Telegram Bot
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
