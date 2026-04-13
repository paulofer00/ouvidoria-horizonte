import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Configuração do servidor de e-mail da HostGator
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true, // true para porta 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Montando o visual do e-mail (HTML) parecido com a tela de revisão
    const mailOptions = {
      from: `"Ouvidoria Horizonte Park" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Envia para ele mesmo (a caixa da ouvidoria)
      subject: `Novo Chamado [${data.tipo}] - ${data.nome} ${data.sobrenome}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0083df; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">Novo Chamado de Ouvidoria</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p><strong>Tipo:</strong> <span style="color: #48e368;">${data.tipo || "Não informado"}</span></p>
            <p><strong>Nome:</strong> ${data.nome} ${data.sobrenome}</p>
            <p><strong>Contato:</strong> ${data.telefone} | ${data.email}</p>
            <p><strong>Relação:</strong> ${data.relacao}</p>
            <p><strong>Setor:</strong> ${data.setor}</p>
            <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p><strong>Mensagem:</strong></p>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #0083df; font-style: italic;">
              ${data.mensagem || "Sem mensagem."}
            </div>
            <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p><strong>Sentimento (0 a 10):</strong> <span style="font-size: 18px; font-weight: bold; color: #0083df;">${data.sentimento}</span></p>
            <p><strong>Assinatura Digital:</strong> <span style="font-family: serif; font-style: italic; font-size: 18px;">${data.assinatura}</span></p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "E-mail enviado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json({ error: "Falha ao enviar e-mail" }, { status: 500 });
  }
}