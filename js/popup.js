function openPopup(category) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popupTitle');
    const popupList = document.getElementById('popupList');

    
    switch (category) {
        case 'Cursos':
            popupTitle.textContent = 'Documentos para Cursos';
            popupList.innerHTML = `
                <li>Comprovante de matrícula</li>
                <li>Histórico escolar</li>
                <li>Identidade</li>
            `;
            break;
        case 'Lazer':
            popupTitle.textContent = 'Documentos para Lazer';
            popupList.innerHTML = `
                <li>Comprovante de residência</li>
                <li>CPF</li>
                <li>Identidade</li>
            `;
            break;
        case 'Preferencial':
            popupTitle.textContent = 'Documentos para Preferencial';
            popupList.innerHTML = `
                <li>Comprovante de residência</li>
                <li>Laudo médico</li>
                <li>Identidade</li>
            `;
            break;
        case 'Saúde':
            popupTitle.textContent = 'Documentos para Saúde';
            popupList.innerHTML = `
                <li>Comprovante de residência</li>
                <li>Carteirinha do SUS</li>
                <li>Identidade</li>
            `;
            break;
        case 'Pagamento':
                popupTitle.textContent = 'Documentos para Pagamento';
                popupList.innerHTML = `
                    <li>Comprovante de residência</li>
                    <li>CPF</li>
                    <li>Identidade</li>
                `;
                break;
        default:
            popupTitle.textContent = 'Documentos necessários';
            popupList.innerHTML = `
                <li>Comprovante de residência</li>
                <li>CPF</li>
                <li>Identidade</li>
            `;
    }

    
    popup.style.display = 'flex';
}


function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}