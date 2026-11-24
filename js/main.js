const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.setAttribute(
      'aria-label',
      isExpanded ? 'Abrir menu' : 'Fechar menu'
    );

    navigation.classList.toggle('is-open', !isExpanded);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      navigation.classList.remove('is-open');
    });
  });
}

// Atualiza automaticamente o ano do footer
const yearElement = document.querySelector('#current-year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Formulário de orçamento
const quoteForm = document.querySelector('#quote-form');
const feedback = document.querySelector('#form-feedback');

// Número de WhatsApp para testes
// Formato internacional: apenas números
const whatsappNumber = '351920193093';

if (quoteForm && feedback) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validação dos campos HTML
    if (!quoteForm.reportValidity()) {
      return;
    }

    // Recolha dos dados do formulário
    const formData = new FormData(quoteForm);

    const details = {
      service: formData.get('service'),
      spaceSize: formData.get('spaceSize'),
      location: formData.get('location'),
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      notes: formData.get('details')
    };

    // Construção da mensagem
    const message = `
      Olá! Desejo realizar um novo pedido de orçamento do Espace Cristallins.

      *DADOS DO PEDIDO*

      *Serviço pretendido:* ${details.service}
      *Dimensão do espaço:* ${details.spaceSize}
      *Localização:* ${details.location}

      *DADOS DO CLIENTE*

      *Nome:* ${details.name}
      *Telemóvel:* ${details.phone}
      *Email:* ${details.email}

      *DATA PRETENDIDA / OBSERVAÇÕES*

${details.notes || 'Não foram adicionadas observações.'}
    `.trim();

    // Codificação da mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // Criação do link do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Feedback para o utilizador
    feedback.textContent = 'Estamos a abrir o WhatsApp com o seu pedido de orçamento...';

    // Abre o WhatsApp
    window.location.href = whatsappUrl;
  });
}