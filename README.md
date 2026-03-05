# 🗝️ Virei a Chave – PMSP

Simulador de avaliação psicológica para o concurso da Polícia Militar de São Paulo.

---

## ⚠️ Segurança

A chave da API do Gemini **nunca fica no frontend**. Ela é armazenada como variável de ambiente no servidor (Netlify ou Firebase) e acessada via proxy.

---

## 🚀 Deploy no Netlify (recomendado para começar)

### 1. Suba o projeto no GitHub
```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/cabralduu/vireiachave.git
git push -u origin master
```

### 2. Crie o site no Netlify
- Acesse [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
- Conecte o repositório

### 3. Configure a variável de ambiente
- No Netlify: **Site configuration → Environment variables → Add variable**
  - Key: `GEMINI_API_KEY`
  - Value: `sua-chave-aqui`

### 4. Redeploy
- O site já funcionará em `https://seu-site.netlify.app`

---

## 🔥 Deploy no Firebase

### 1. Instale o Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

### 2. Configure o projeto
- Crie um projeto em [console.firebase.google.com](https://console.firebase.google.com)
- Edite `.firebaserc` e substitua `SEU-PROJETO-ID-AQUI` pelo ID do seu projeto

### 3. Configure o secret da API
```bash
firebase functions:secrets:set GEMINI_API_KEY
# Cole sua chave quando solicitado
```

### 4. Instale dependências das Functions
```bash
cd functions
npm install
cd ..
```

### 5. Faça o deploy
```bash
firebase deploy
```

O app estará em `https://SEU-PROJETO-ID.web.app`

---

## 🔧 Estrutura do projeto

```
virei-a-chave/
├── index.html              ← App principal (frontend)
├── netlify.toml            ← Configuração do Netlify
├── firebase.json           ← Configuração do Firebase
├── .firebaserc             ← ID do projeto Firebase
├── netlify/
│   └── functions/
│       └── chat.js         ← Proxy Gemini para Netlify
└── functions/
    ├── index.js            ← Proxy Gemini para Firebase
    └── package.json
```

---

## 🔑 Obter chave da API Gemini

1. Acesse [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Clique em **Create API Key**
3. Copie a chave e configure no Netlify ou Firebase conforme instruções acima

---

## ⚡ Testando localmente com Netlify

```bash
npm install -g netlify-cli
# Crie um arquivo .env na raiz:
echo "GEMINI_API_KEY=sua-chave-aqui" > .env
netlify dev
```

Acesse `http://localhost:8888`
