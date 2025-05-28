
# Expenditure Control - Frontend Angular

Este projeto Angular é o front-end para o sistema **Expenditure Control**, consumindo a API backend em Spring Boot que oferece funcionalidades de autenticação, gerenciamento de usuários, notificações por e-mail, e controle de assinaturas.

---

## Funcionalidades principais

- Registro e login de usuários (com JWT)
- Alteração e recuperação de senha
- Upload e visualização de imagens de perfil
- Listagem, criação, edição e exclusão de assinaturas
- Envio de tokens de redefinição de senha via e-mail

---

## Tecnologias utilizadas

- Angular 15+
- TypeScript
- HttpClient para comunicação REST com backend
- Bootstrap / Tailwind CSS (opcional, ajustar conforme projeto)
- Spring Boot (backend, não incluído neste repositório)

---

## Requisitos

- Node.js (versão 16+ recomendada)
- Angular CLI (versão compatível)
- Backend Spring Boot rodando localmente ou em servidor remoto

---

## Instalação

1. Clone este repositório

```bash
git clone https://github.com/seuusuario/expenditure-control-frontend.git
cd expenditure-control-frontend

Para iniciar o servidor local de desenvolvimento, execute:

npm run start || ng serve 
