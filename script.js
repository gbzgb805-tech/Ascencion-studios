document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Menu Lateral (Sidebar - Mobile) ---
    const sidebar = document.getElementById('gh-sidebar');
    const toggleButtons = document.querySelectorAll('.gh-nav__toggle'); // Botão de abrir
    const closeButton = document.querySelector('.gh-sidebar__close'); // Botão de fechar
    const overlay = document.getElementById('gh-overlay'); // Fundo escuro

    // Função para alternar o estado do sidebar
    function toggleSidebar() {
        if (!sidebar || !overlay) return;

        const isOpen = sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-visible', isOpen);
        
        // Bloqueia o scroll do corpo da página quando o menu está aberto
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    // Adiciona os eventos de clique
    toggleButtons.forEach(btn => btn.addEventListener('click', toggleSidebar));
    if (closeButton) closeButton.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);

    // --- Lógica do Acordeão (Accordion - Usado em Aprendizado e Index) ---
    // Esta função é chamada diretamente pelo atributo 'onclick' no HTML
    window.toggleAccordion = function(headerElement) {
        const content = headerElement.nextElementSibling;
        const icon = headerElement.querySelector('.fas.fa-chevron-down');

        // Opcional: Fechar outros itens abertos para manter apenas um ativo por vez
        /*
        const allContents = document.querySelectorAll('.gh-accordion__content');
        const allIcons = document.querySelectorAll('.gh-accordion__header .fa-chevron-down');
        allContents.forEach(c => { if (c !== content) c.style.maxHeight = null; });
        allIcons.forEach(i => { if (i !== icon) i.classList.remove('accordion-icon-rotated'); });
        */

        // Alterna o estado do item atual
        if (content.style.maxHeight) {
            // Se está aberto, fecha
            content.style.maxHeight = null;
            if (icon) icon.classList.remove('accordion-icon-rotated');
        } else {
            // Se está fechado, abre calculando a altura exata do conteúdo
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.classList.add('accordion-icon-rotated');
        }
    };

    // --- Lógica de Filtragem de Jogos (Usado apenas em jogos.html) ---
    window.filterGames = function(tag) {
        const gameCards = document.querySelectorAll('.gh-game-card');
        const tagsList = document.querySelectorAll('.gh-tag');
        const clickedTag = event.target; // O elemento que foi clicado

        // 1. Atualiza visualmente qual tag está ativa
        tagsList.forEach(t => t.classList.remove('gh-tag--active'));
        if (clickedTag) clickedTag.classList.add('gh-tag--active');

        // 2. Filtra os cards com base na tag selecionada
        gameCards.forEach(card => {
            const cardTagsAttr = card.getAttribute('data-tags');
            // Verifica se a tag é 'all' OU se as tags do card contêm a tag clicada
            if (tag === 'all' || (cardTagsAttr && cardTagsAttr.includes(tag))) {
                // Mostra o card com um pequeno efeito de fade-in
                card.style.display = 'flex';
                card.style.opacity = '0';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                // Esconde o card
                card.style.display = 'none';
            }
        });
    };
    
    // Define o ano atual via JavaScript no navegador do usuário
    document.getElementById("year").textContent = new Date().getFullYear();
});