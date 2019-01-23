function mensagemGeralSistemaSucesso(mensagem)
{
alert('diego');

	//mensagem = mensagem.replace(/\./g, '.<br />');
	var decodedText = $("<p/>").html(mensagem).text();
	toastr.success(decodedText, 'Mensagem de Sucesso');
}
function mensagemGeralSistemaErro(mensagem)
{
	//mensagem = mensagem.replace(/\./g, '.<br />');
	var decodedText = $("<p/>").html(mensagem).text();
	toastr.error(decodedText, 'Mensagem de Erro');
}