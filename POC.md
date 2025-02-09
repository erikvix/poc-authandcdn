# POC: Integração Frontend com Backend usando Firebase e Next.js

## Objetivo

Criar funcionalidades integradas entre frontend e backend utilizando Firebase (Authentication, Collections) e Next.js, com suporte a tipagem usando TypeScript e validação com Zod.

---

## Requisitos

### 1. **Layout**

- Selecionar um layout de exemplo do **shadcn**. [Layout](https://ui.shadcn.com/blocks/authentication#login-05)
- Integrar o layout com o backend.

---

### 2. **Firebase**

#### **Authentication**

- **Login com métodos:**sa
  - Email/Senha
  - GitHub
  - Google
- **Enviar email de confirmação de criação de conta.**
- **Criar endpoints para:**
  - Registrar usuário com email e senha.
  - Validar DTOs com Zod.

#### **Collections**

- **O que é uma collection?**
- **Operações:**
  - Criar uma collection.
  - Atualizar uma collection.
  - Deletar uma collection.
- **Integração:**
  - Utilizar SDK Firebase para gerenciamento das collections.
  - Criar endpoints integrados ao Firebase com tipagem TypeScript e validação Zod.

---

### 3. **Cloudflare (CDN)**

#### **Entendendo CDNs**

- **O que é uma CDN?**
- **Por que utilizar uma CDN?**
- **Quando e em qual cenário devo utilizar uma CDN?**

#### **Integração**

- Salvar imagens do projeto na CDN.

#### **Endpoints**

- Criar endpoints no Next.js que interajam com a API da Cloudflare para manipulação de conteúdo (upload, download, etc.).

---

### 4. **Next.js com TypeScript**

#### **Endpoints**

- Criar um endpoint para autenticação que o frontend possa consumir:
  - Login com email/senha.
  - Login com GitHub.
  - Login com Firebase.

#### **Dashboard**

- Criar um dashboard integrado com o backend e Firebase.

---

### 5. **Publicação**

#### **Vercel**

- Configurar publicação na Vercel.
- Gerenciar environments:
  - Como sincronizar environments localmente e na Vercel.

---

### 6. **Nanostore**

- Investigar como utilizar **Nanostore** no projeto.

---

## Fluxo de Desenvolvimento

1. **Seleção e Configuração do Layout**

   - Escolher o layout inicial do shadcn e integrar com a aplicação.

2. **Configuração do Firebase**

   - Configurar Authentication e Collections no Firebase.
   - Criar endpoints que consumam o Firebase com validação Zod.

3. **Integração da CDN**

   - Configurar e utilizar a Cloudflare como CDN.
   - Salvar imagens e gerenciar dados na CDN via endpoints.

4. **Criação de Endpoints no Next.js**

   - Implementar rotas para autenticação e operações do backend.

5. **Publicação e Deploy**
   - Configurar o ambiente na Vercel.
   - Testar o fluxo completo (Frontend ↔ Backend ↔ Firebase ↔ CDN).

---

Com essa estrutura, a POC terá uma visão clara e modular, facilitando a implementação e iterações futuras.
