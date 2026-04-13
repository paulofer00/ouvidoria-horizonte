"use client";

import { useState } from "react";
import Image from "next/image"; // Importante para otimização de imagem no Next.js
import { CheckCircle, UploadCloud, ArrowLeft, ArrowRight } from "lucide-react";

export default function OuvidoriaPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 11;

  // Estado para armazenar todas as respostas
  const [formData, setFormData] = useState({
    tipo: "",
    nome: "",
    sobrenome: "",
    telefone: "",
    email: "",
    relacao: "",
    setor: "",
    mensagem: "",
    sentimento: 5, // Slider de 0 a 10
    assinatura: "", 
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => setStep((prev) => (prev < totalSteps + 1 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = () => {
    // Aqui você vai plugar o seu banco (ex: Supabase)
    console.log("Dados enviados:", formData);
    nextStep(); // Vai para a tela de sucesso (Passo 12)
  };

  // Renderiza o conteúdo do card baseado no passo atual
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Bem-vindo à Ouvidoria do Horizonte Park</h2>
            <p className="text-gray-600">
              Este é um canal dedicado a receber suas sugestões, elogios e reclamações. Queremos ouvir você para melhorar sempre.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Selecione o Tipo*</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Sugestão", "Elogio", "Reclamação/Denúncia", "Dúvida"].map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => handleChange("tipo", tipo)}
                  className={`p-4 border rounded-lg text-left transition-colors flex items-center gap-3 ${
                    formData.tipo === tipo ? "border-horizonte-verde bg-green-50 text-horizonte-verde font-bold" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                    <div className={`w-4 h-4 rounded-full border ${formData.tipo === tipo ? "border-horizonte-verde bg-horizonte-verde" : "border-gray-300 bg-white"}`} />
                  {tipo}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Seu nome*</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" placeholder="Nome" value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} className="w-full p-3 border rounded-md focus:outline-horizonte-verde text-gray-800" />
              <input type="text" placeholder="Sobrenome" value={formData.sobrenome} onChange={(e) => handleChange("sobrenome", e.target.value)} className="w-full p-3 border rounded-md focus:outline-horizonte-verde text-gray-800" />
            </div>
          </div>
        );
      case 4:
      case 5:
        const isEmail = step === 5;
        const field = isEmail ? "email" : "telefone";
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">{isEmail ? "Seu e-mail" : "Seu Telefone"}</h2>
            <input 
              type={isEmail ? "email" : "tel"} 
              placeholder={isEmail ? "exemplo@email.com" : "(93) 99999-9999"} 
              value={formData[field as keyof typeof formData]} 
              onChange={(e) => handleChange(field, e.target.value)} 
              className="w-full p-3 border rounded-md focus:outline-horizonte-verde text-gray-800" 
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Você é...*</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Cliente/Concessionário", "Visitante", "Parceiro", "Colaborador"].map((rel) => (
                <button
                  key={rel}
                  onClick={() => handleChange("relacao", rel)}
                  className={`p-4 border rounded-lg text-left transition-colors flex items-center gap-3 ${formData.relacao === rel ? "border-horizonte-verde bg-green-50" : "border-gray-200"}`}
                >
                    <div className={`w-4 h-4 rounded-full border ${formData.relacao === rel ? "border-horizonte-verde bg-horizonte-verde" : "border-gray-300 bg-white"}`} />
                  <span className="text-gray-800">{rel}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 7:
        // AJUSTE SOLICITADO AQUI: Novos setores
        const setoresHorizonte = [
            "Venda de Terrenos",
            "Atendimento",
            "Financeiro",
            "Manutenção",
            "Outros"
        ];
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Sobre qual setor/serviço?*</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {setoresHorizonte.map((setor) => (
                <button
                  key={setor}
                  onClick={() => handleChange("setor", setor)}
                  className={`p-4 border rounded-lg text-left transition-colors flex items-center gap-3 ${formData.setor === setor ? "border-horizonte-verde bg-green-50" : "border-gray-200"}`}
                >
                    <div className={`w-4 h-4 rounded-full border ${formData.setor === setor ? "border-horizonte-verde bg-horizonte-verde" : "border-gray-300 bg-white"}`} />
                  <span className="text-gray-800">{setor}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Sua mensagem*</h2>
            <textarea 
              rows={5} 
              placeholder="Digite aqui detalhadamente sua sugestão, elogio ou reclamação..." 
              value={formData.mensagem} 
              onChange={(e) => handleChange("mensagem", e.target.value)} 
              className="w-full p-3 border rounded-md focus:outline-horizonte-verde text-gray-800 resize-none" 
            />
          </div>
        );
      case 9:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold text-gray-800">Envio de Arquivos (Opcional)</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
              <UploadCloud size={48} className="text-horizonte-azul mb-2" />
              <p className="font-medium">Arraste e solte seus arquivos aqui</p>
              <p className="text-sm">ou clique para procurar no seu dispositivo.</p>
              <span className="text-xs mt-3 bg-gray-100 px-2 py-1 rounded">Tamanho máx: 50MB</span>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold text-gray-800">Assinatura Digital*</h2>
            <p className="text-sm text-gray-500">Para validar sua submissão, digite seu nome completo abaixo</p>
            <input 
              type="text" 
              placeholder="Digite seu nome completo como assinatura" 
              value={formData.assinatura} 
              onChange={(e) => handleChange("assinatura", e.target.value)} 
              className="w-full text-center p-4 text-2xl font-serif italic border-b-2 border-gray-300 focus:border-horizonte-verde focus:outline-none text-gray-800 bg-transparent mt-6" 
            />
          </div>
        );
      case 11:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-xl font-bold text-gray-800">Como você está se sentindo agora?</h2>
            <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
              <span className="text-3xl">😡</span>
              <input 
                type="range" 
                min="0" max="10" 
                value={formData.sentimento} 
                onChange={(e) => handleChange("sentimento", parseInt(e.target.value))} 
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-horizonte-verde" 
              />
              <span className="text-3xl">😄</span>
            </div>
            <p className="text-horizonte-azul font-bold text-2xl bg-blue-50 inline-block px-4 py-1 rounded-full">{formData.sentimento} / 10</p>
          </div>
        );
      case 12:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Revisar e Enviar</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-3 text-sm text-gray-800 border border-gray-100">
              <p><strong>Tipo:</strong> {formData.tipo || "Não informado"}</p>
              <p><strong>Nome:</strong> {formData.nome} {formData.sobrenome}</p>
              <p><strong>Contato:</strong> {formData.telefone} | {formData.email}</p>
              <p><strong>Relação:</strong> {formData.relacao}</p>
              <p><strong>Setor:</strong> {formData.setor}</p>
              <p className="border-t border-gray-200 pt-3 mt-3"><strong>Mensagem:</strong></p>
              <p className="italic text-gray-700 bg-white p-3 rounded border">{formData.mensagem || "Sem mensagem."}</p>
              <p><strong>Sentimento:</strong> {formData.sentimento}/10</p>
              <p><strong>Assinatura:</strong> <span className="font-serif italic text-lg">{formData.assinatura}</span></p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Tela final de Sucesso (Passo 13 interno)
  if (step > totalSteps + 1) {
    return (
      <div className="min-h-screen bg-horizonte-azul flex items-center justify-center p-4">
        <div className="bg-horizonte-branco/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl flex flex-col items-center text-center max-w-md w-full shadow-2xl">
          <CheckCircle size={90} className="text-horizonte-verde mb-6" />
          <h1 className="text-4xl font-bold text-horizonte-branco mb-3">Obrigado!</h1>
          <p className="text-horizonte-branco/90 text-lg font-light">Sua submissão foi recebida com sucesso. Nossa equipe analisará seu contato em breve.</p>
        </div>
      </div>
    );
  }

  // Progresso do form
  const progressPercentage = (step / (totalSteps + 1)) * 100;

  return (
    <div className="min-h-screen bg-horizonte-azul flex flex-col items-center py-12 px-4">
      
      {/* HEADER AJUSTADO AQUI: Logo em vez de texto */}
      <div className="w-full max-w-3xl mb-10 flex justify-center">
        <Image 
          src="/logo-horizonte.png" // O arquivo precisa estar na pasta /public
          alt="Logo Horizonte Park"
          width={280} // Ajuste o tamanho conforme necessário
          height={90} // Ajuste o tamanho conforme necessário
          priority // Carrega a imagem com prioridade (LCP)
          className="h-20 w-auto" // Mantém a proporção e define altura via Tailwind
        />
      </div>

      {/* Card Principal */}
      <div className="bg-horizonte-branco w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[550px] border border-gray-100">
        
        {/* Conteúdo dinâmico */}
        <div className="flex-grow p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-xl">
            {renderStepContent()}
          </div>
        </div>

        {/* Rodapé / Botões de Navegação */}
        <div className="flex border-t border-gray-100 bg-gray-50">
          <button 
            onClick={prevStep} 
            disabled={step === 1}
            className={`flex-1 flex items-center justify-center gap-2 p-6 font-bold transition-colors ${step === 1 ? "text-gray-300 bg-gray-50 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <ArrowLeft size={20} /> ANTERIOR
          </button>
          
          {step === totalSteps + 1 ? (
             <button 
             onClick={handleSubmit} 
             className="flex-1 flex items-center justify-center gap-2 p-6 font-bold bg-horizonte-verde text-horizonte-branco hover:bg-green-500 transition-colors shadow-inner"
           >
             ENVIAR FORMULÁRIO <CheckCircle size={20} />
           </button>
          ) : (
            <button 
            onClick={nextStep} 
            className="flex-1 flex items-center justify-center gap-2 p-6 font-bold bg-horizonte-verde text-horizonte-branco hover:bg-green-500 transition-colors shadow-inner"
          >
            PRÓXIMO <ArrowRight size={20} />
          </button>
          )}
        </div>
      </div>

      {/* Barra de Progresso Estilizada */}
      <div className="w-full max-w-3xl mt-10 flex flex-col items-center gap-3">
        <div className="flex gap-2.5 mb-2 flex-wrap justify-center">
          {Array.from({ length: totalSteps + 1 }).map((_, index) => (
            <div 
              key={index} 
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${index + 1 <= step ? "bg-horizonte-verde shadow-[0_0_10px_#48e368] scale-110" : "bg-white/20"}`} 
            />
          ))}
        </div>
        <p className="text-horizonte-branco/70 text-sm font-medium tracking-wide">Passo {step} de {totalSteps + 1}</p>
      </div>
    </div>
  );
}