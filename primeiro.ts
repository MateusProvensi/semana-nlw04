interface DadosEnviarEmail {
  para: string;
  id: string;
  assunto: string;
  texto: string;
}

function enviarEmail({ para, id, assunto, texto }: DadosEnviarEmail) {
  console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario {
  send() {
    enviarEmail({
      para: "mateus@gmail.com",
      id: "5648",
      assunto: "Olá", 
      texto: "Tudo Bem?",
    });
  }
}