# Passo a passo para salvar no GitHub

Este guia mostra como publicar o projeto no GitHub. Nao precisa usar Word: o `README.md` e o documento principal da entrega.

## 1. Conferir se o projeto esta funcionando

Backend:

```powershell
cd C:\Users\hmk08\Documents\Codex\2026-06-09\codex-por-favor-me-ajude-com\outputs\controle-missao-espacial\backend
mvn spring-boot:run
```

Abra:

```text
http://localhost:8080/api/sensors
```

Mobile:

```powershell
cd C:\Users\hmk08\Documents\Codex\2026-06-09\codex-por-favor-me-ajude-com\outputs\controle-missao-espacial\mobile
npm.cmd run web
```

Abra:

```text
http://localhost:8082
```

## 2. Criar o repositorio no GitHub

1. Entre em `https://github.com`.
2. Faca login.
3. Clique no botao `+` no canto superior direito.
4. Clique em `New repository`.
5. Em `Repository name`, coloque:

```text
controle-missao-espacial
```

6. Escolha `Public` ou `Private`, conforme a orientacao do professor.
7. Nao marque `Add a README file`.
8. Nao marque `.gitignore`.
9. Nao marque `license`.
10. Clique em `Create repository`.

Depois disso, o GitHub vai mostrar uma URL parecida com:

```text
https://github.com/SEU-USUARIO/controle-missao-espacial.git
```

Copie essa URL.

## 3. Abrir o PowerShell na pasta correta

Feche e abra o PowerShell novamente para garantir que o Git instalado esteja no PATH.

Depois rode:

```powershell
cd C:\Users\hmk08\Documents\Codex\2026-06-09\codex-por-favor-me-ajude-com\outputs\controle-missao-espacial
```

Confira se voce esta na pasta certa:

```powershell
dir
```

Deve aparecer:

```text
backend
mobile
README.md
ENTREGA.md
.gitignore
```

## 4. Configurar o Git

Rode:

```powershell
git config --global user.name "Henrique Khouri e Rodrigo Philippi"
git config --global user.email "SEU-EMAIL-DO-GITHUB"
```

Troque `SEU-EMAIL-DO-GITHUB` pelo email usado na conta do GitHub.

Exemplo:

```powershell
git config --global user.email "seuemail@gmail.com"
```

## 5. Criar o primeiro commit

Na raiz do projeto, rode:

```powershell
git init
git add .
git commit -m "Entrega controle de missao espacial"
git branch -M main
```

## 6. Conectar ao repositorio remoto

Troque a URL abaixo pela URL copiada do GitHub:

```powershell
git remote add origin https://github.com/SEU-USUARIO/controle-missao-espacial.git
```

Exemplo:

```powershell
git remote add origin https://github.com/henriquekhouri/controle-missao-espacial.git
```

## 7. Enviar para o GitHub

Rode:

```powershell
git push -u origin main
```

Se abrir uma janela de login do GitHub, faca login e autorize.

Se pedir usuario e senha no terminal:

- Usuario: seu usuario do GitHub.
- Senha: o GitHub normalmente exige token, nao senha comum.

O caminho mais simples e fazer login pela janela que abrir automaticamente.

## 8. Conferir se subiu certo

No navegador, abra o repositorio no GitHub.

Confira se aparecem:

- `backend`
- `mobile`
- `README.md`
- `ENTREGA.md`
- `.gitignore`

Abra o `README.md` no GitHub e confira se aparecem:

- Henrique Khouri - RM 555572
- Rodrigo Philippi - RM 557594
- Descricao do projeto
- Instrucoes de execucao

## 9. O que enviar ao professor

Envie o link do repositorio.

Sugestao de texto:

```text
Professor, segue o projeto Controle de Missao Espacial.

Integrantes:
- Henrique Khouri - RM 555572
- Rodrigo Philippi - RM 557594

O projeto contem backend em Java com Spring Boot, banco H2 em modo file e aplicativo mobile em React Native com TypeScript. A integracao entre mobile e API foi implementada com requisicoes GET e POST.

Link do GitHub: COLE_AQUI_O_LINK_DO_REPOSITORIO
```

## 10. Problemas comuns

Se `git` nao for reconhecido:

1. Feche o PowerShell.
2. Abra de novo.
3. Teste:

```powershell
git --version
```

Se ainda nao funcionar, reinicie o computador.

Se o push falhar porque o remote ja existe:

```powershell
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/controle-missao-espacial.git
git push -u origin main
```

Se aparecer que nao ha commits:

```powershell
git status
git add .
git commit -m "Entrega controle de missao espacial"
git push -u origin main
```
