
<?php
// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Coleta os dados do formulário
    $empresa = $_POST["empresa"];
    $tipo = $_POST["tipo"];
    $equipamento = $_POST["equipamento"];
    $frota = $_POST["frota"];
    $numero_serie = $_POST["numero_serie"];
    $descricao = $_POST["descricao"];
    
    // Construa a string de dados
    $dados = "$empresa, $tipo, $equipamento, $frota, $numero_serie, $descricao\n";
    
    // Abre o arquivo para escrita e adiciona os dados
    file_put_contents("avarias.csv", $dados, FILE_APPEND);
    
    // Envia e-mail com os dados do formulário
    $destinatario = "tarso-souza@hotmail.com"; // Substitua pelo seu endereço de e-mail
    $assunto = "Novo Cadastro de Avaria";
    $mensagem = "Empresa: $empresa\nTipo: $tipo\nEquipamento: $equipamento\nNúmero de Frota: $frota\nNúmero de Série: $numero_serie\nDescrição: $descricao";
    
    mail($destinatario, $assunto, $mensagem);
}
?>
