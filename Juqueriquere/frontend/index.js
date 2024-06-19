document.addEventListener('DOMContentLoaded', function() {
    // Rolagem suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
// Adicionar sombra à navbar quando rolado
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });

    // Função de exemplo para demonstrar interação
    function showAlertOnCardClick() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                alert('Card clicked: ' + this.querySelector('.card-title').textContent);
            });
        });
    }

    // Chama a função de exemplo
    showAlertOnCardClick();
});
