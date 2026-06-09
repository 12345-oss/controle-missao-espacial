# Entrega - Controle de Missão Espacial

## O que entregar

Envie ao professor o link do repositório no GitHub contendo:

- Pasta `backend`
- Pasta `mobile`
- Arquivo `README.md`
- Arquivo `.gitignore`

## Integrantes

| Nome completo | RM |
| --- | --- |
| Henrique Khouri | 555572 |
| Rodrigo Philippi | 557594 |

## O que demonstrar

1. Backend rodando:

```powershell
cd backend
mvn spring-boot:run
```

2. GET funcionando:

```text
http://localhost:8080/api/sensors
```

3. Mobile/Web rodando:

```powershell
cd mobile
npm.cmd run web
```

4. App aberto:

```text
http://localhost:8082
```

5. Fluxo principal:

- Abrir `Missao`
- Abrir `Sensores`
- Abrir `Nova leitura`
- Enviar uma leitura
- Voltar para `Sensores`
- Confirmar que a leitura apareceu

## Requisitos conferidos

| Requisito | Status |
| --- | --- |
| Backend Java Spring Boot | OK |
| Banco H2 em modo file | OK |
| Cadastro e consulta de sensores | OK |
| Cadastro e consulta de sistemas | OK |
| Cadastro e consulta de eventos | OK |
| Cadastro e consulta de alertas | OK |
| App React Native com TypeScript | OK |
| Requisições GET no app | OK |
| Requisição POST no app | OK |
| Telas navegáveis | OK |
| README com descrição | OK |
| README com nome/RM | OK |
| GitHub com commits | Pendente publicar |

## Pendências antes de enviar

Suba o projeto para o GitHub e envie o link ao professor.
