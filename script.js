document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('loginContainer');
    const avariaContainer = document.getElementById('avariaContainer');
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Simulando o login bem-sucedido
        loginContainer.style.display = 'none';
        avariaContainer.style.display = 'block';
    });

    document.getElementById('avariaForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);

        try {
            const response = await emailjs.sendForm('service_3xk0btj', 'template_v9eh2oh', data);

            if (response.status === 200) {
                alert('Formulário enviado com sucesso!');
                form.reset();
            } else {
                alert('Ocorreu um erro ao enviar o formulário.');
            }
        } catch (error) {
            alert('Ocorreu um erro ao enviar o formulário.');
            console.error('Erro ao enviar o formulário:', error);
        }
    });
});
