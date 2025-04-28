document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });
    
    // Carrossel
    const carouselInner = document.getElementById('carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselIndicators = document.getElementById('carousel-indicators');
    let currentIndex = 0;
    
    // Criar indicadores
    carouselItems.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('carousel-indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      carouselIndicators.appendChild(indicator);
    });
    
    // Navegação do carrossel
    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }
    
    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Atualizar indicadores
      document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Event listeners para botões
    document.querySelector('.carousel-button.prev').addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
      updateCarousel();
    });
    
    document.querySelector('.carousel-button.next').addEventListener('click', () => {
      currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
      updateCarousel();
    });
    
    // Autoplay do carrossel (opcional)
    let carouselInterval = setInterval(() => {
      currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
      updateCarousel();
    }, 5000);
    
    // Pausar autoplay quando o mouse estiver sobre o carrossel
    document.querySelector('.carousel').addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    
    document.querySelector('.carousel').addEventListener('mouseleave', () => {
      carouselInterval = setInterval(() => {
        currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
      }, 5000);
    });
  });




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
      
      // Mostrar loading
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
  📝 *Mensagem:*
  ${formValues.message}
        `;
        
        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'Markdown'
          })
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
        // Restaurar botão
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        messageDiv.style.display = 'block';
        
        // Rolando para a mensagem
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  };
  
  // Inicializar quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', setupContactForm);