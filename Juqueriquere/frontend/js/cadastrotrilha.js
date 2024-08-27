function cancel(){
    document.getElementById('trilhaModal').style.display = 'none';
  };




  
async function deletarTrilhaConfirm(id) {
    
    try {
        const response = await fetch(`http://localhost:9000/trilhas/${id}`);
        const trilhajson = await response.json([0]);
        const trilha = trilhajson[0]
        document.getElementById('trilhaModal').style.display = 'block';
        document.getElementById('trilhaNome').innerText = trilha.nome;
        document.getElementById('buttonExcluir').addEventListener('click', () => deletarTrilha(id));
        } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar trilha');
        }
        }
async function deletarTrilha(id) {
    
    try {
          const response = await fetch('http://localhost:9000/trilhas/' + id, {
            method: 'DELETE'});
          
          const result = await response.json();
        if (response.ok) {
          alert(result.mensagem);
          location.reload();
        } else {
          alert(result.mensagem || 'Erro ao deletar trilha');
        }
        } catch (error) {
          console.error('Erro:', error);
          alert('Erro ao deletar trilha');
        }
      }

async function fetchTrilhas() {
    try {
        const response = await fetch('http://localhost:9000/trilhas');
        const trilhas = await response.json();
        const cardsContainer = document.getElementById('cards-container');
        const modalCon = document.getElementById('container');
        
        // Limpa o container antes de adicionar novos cards
        cardsContainer.innerHTML = '';

        if (trilhas.length == 0){
          document.getElementById('cards-container').style.display = "block";
          document.getElementById('trilhasGap').style.cssText = `
          display : block;
          flexDirection : initial;
          `;
            const noTrilha = document.createElement('div');
            noTrilha.className = 'card-semtrilha';

            
            noTrilha.innerHTML = `
            
              
                <div class="semTrilha blinking">
                <div>
                  <h1 class="item1">Vazio <br> não há trilhas cadastradas ainda!</h1>
                </div>
                <div>
                  <span class="material-symbols-outlined item2">
                  hiking
                  </span>
                </div>
                    
                
            `;
            cardsContainer.appendChild(noTrilha);
        }

        trilhas.forEach(trilha => {
            
            const card = document.createElement('div');
            card.className = 'card-trilha';

            const imageUrl = trilha.imagem || 'https://via.placeholder.com/300';

            card.innerHTML = `
            
                <img src="${imageUrl}" alt="${trilha.nome}">
                <div class="card-container">
                    
                    <h4>${trilha.nome}</h4>
                    <p>${trilha.descricao}</p>
                    <br>
                    <p><span>Extensão:</span> ${trilha.extensao} metros</p>
                    <br>
                    <p>
                        <span>Horário de Funcionamento:</span> ${trilha.horario}
                    </p>
                    
                    <br>
                    <p><span>Acesso:</span> ${trilha.agendamento ? 'Agendamento necessário' : 'Gratuito'}</p>
                    <div class="card-buttons">
                      <button class="delete"><span class="material-symbols-outlined " onclick="deletarTrilhaConfirm(${trilha.idtrilhas})">delete</span></button>
                      <button class="edit"><span class="material-symbols-outlined ">edit</span></button>
                    </div>
                    
                
            `;
            cardsContainer.appendChild(card);
            
        });
    } catch (error) {
        console.error('Erro ao buscar trilhas:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchTrilhas);

