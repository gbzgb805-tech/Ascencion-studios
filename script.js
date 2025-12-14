document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('gh-sidebar');
    const toggleButton = document.querySelector('.gh-nav__toggle');
    const closeButton = document.querySelector('.gh-sidebar__close');
    const overlay = document.getElementById('gh-overlay');

    // Função para abrir/fechar o sidebar
    function toggleSidebar() {
        const isOpen = sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-visible', isOpen);
        document.body.classList.toggle('sidebar-open', isOpen);
    }

    // Eventos de clique para abrir/fechar
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleSidebar);
    }

    if (closeButton) {
        closeButton.addEventListener('click', toggleSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }

    // Função para Acordeão (Necessário em index.html e aprendizado.html)
    window.toggleAccordion = function(header) {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.fas');
        
        // Verifica se já está aberto
        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = '0';
            content.style.paddingTop = '0';
            content.style.paddingBottom = '0';
            icon.classList.remove('accordion-icon-rotated');
        } else {
            // Abre o acordeão, calculando a altura necessária
            content.style.maxHeight = content.scrollHeight + 30 + "px"; // +30 para o padding interno
            content.style.paddingTop = '15px';
            content.style.paddingBottom = '15px';
            icon.classList.add('accordion-icon-rotated');
        }
    };
});

// Função JS para Filtragem de Jogos (Apenas para jogos.html)
window.filterGames = function(tag) {
    const gameCards = document.querySelectorAll('.gh-game-card');
    const tags = document.querySelectorAll('.gh-tag');

    // 1. Atualiza o estado ativo das tags
    tags.forEach(t => t.classList.remove('gh-tag--active'));
    
    // Procura a tag clicada para ativar (ignora o console.log se não achar a tag 'all')
    const activeTag = document.querySelector(`[onclick="filterGames('${tag}')"]`);
    if (activeTag) {
        activeTag.classList.add('gh-tag--active');
    }

    // 2. Filtra os cards
    gameCards.forEach(card => {
        const cardTags = card.getAttribute('data-tags');
        if (tag === 'all' || cardTags.includes(tag)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}