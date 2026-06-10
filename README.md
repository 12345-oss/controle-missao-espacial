# Controle de Missão Espacial

Solução integrada para a disciplina **Advanced Programming And Mobile Dev**, composta por:

- **Backend Java com Spring Boot**
- **Banco H2 em modo file**
- **Aplicativo mobile em React Native com TypeScript**
- **Integração entre app mobile e API usando requisições GET e POST**

## Integrantes


| Henrique Khouri | 555572 |
| Rodrigo Philippi | 557594 |

## Como o projeto atende ao enunciado

| Requisito do professor | Onde está implementado |
| --- | --- |
| Backend em Java com Spring Boot | Pasta `backend` |
| API para sensores e módulos computacionais | Endpoint `/api/sensors` |
| API para sistemas monitorados | Endpoint `/api/systems` |
| API para eventos operacionais | Endpoint `/api/events` |
| API para alertas críticos | Endpoint `/api/alerts` |
| Persistência em H2 file mode | `backend/src/main/resources/application.properties` |
| Mobile em React Native com TypeScript | Pasta `mobile` |
| App consome API com POST | Tela `Nova leitura`, enviando para `/api/sensors` |
| App visualiza dados salvos com GET | Telas `Missão`, `Sensores`, `Sistemas`, `Eventos` e `Alertas` |
| Telas navegáveis | Navegação funcional implementada em `mobile/App.tsx` |
| Versionamento no GitHub | Passo a passo na seção de publicação |

## Estrutura

```text
controle-missao-espacial/
  backend/
    src/main/java/com/example/spacemissioncontrol/
      controller/
      model/
      repository/
      config/
      exception/
    src/main/resources/application.properties
    pom.xml
  mobile/
    src/components/
    src/navigation/
    src/screens/
    src/services/
    src/types/
    App.tsx
    package.json
```

## Passo a passo do desenvolvimento

### 1. Criar o backend

O backend foi criado com Spring Boot usando as dependências:

- Spring Web, para criar a API REST.
- Spring Data JPA, para persistir os dados.
- H2 Database, para banco local em arquivo.
- Validation, para validar campos obrigatórios nos POSTs.

A configuração principal do banco fica em:

```properties
spring.datasource.url=jdbc:h2:file:./data/mission-control-db
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
```

Isso significa que o banco não fica somente em memória. Ele cria arquivos dentro de `backend/data`, mantendo os dados entre execuções.

### 2. Criar as entidades do domínio

Foram criadas quatro entidades principais:

- `SensorModule`: sensores e módulos computacionais da missão.
- `MonitoredSystem`: sistemas monitorados.
- `OperationalEvent`: eventos e registros operacionais.
- `MissionAlert`: alertas críticos gerados durante a operação.

Cada entidade possui um repository JPA e um controller REST.

### 3. Criar os endpoints GET e POST

Endpoints principais:

| Método | Endpoint | Função |
| --- | --- | --- |
| GET | `/api/mission/status` | Resumo geral da missão |
| GET | `/api/sensors` | Lista leituras de sensores |
| POST | `/api/sensors` | Cadastra nova leitura de sensor |
| GET | `/api/systems` | Lista sistemas monitorados |
| POST | `/api/systems` | Cadastra sistema monitorado |
| GET | `/api/events` | Lista eventos operacionais |
| POST | `/api/events` | Cadastra evento operacional |
| GET | `/api/alerts` | Lista alertas |
| GET | `/api/alerts/critical` | Lista alertas críticos abertos |
| POST | `/api/alerts` | Cadastra alerta |

### 4. Criar o app mobile

O app mobile foi criado com Expo, React Native e TypeScript. Ele usa:

- `axios`, para consumir a API.
- Controle de navegação em `mobile/App.tsx`, com telas funcionais.
- `react-native-web`, para facilitar a demonstração no navegador.

Telas:

- `Missão`: dashboard com status geral e últimas leituras.
- `Sensores`: lista leituras salvas no backend.
- `Nova leitura`: formulário que envia POST para o backend.
- `Sistemas`: lista sistemas monitorados.
- `Eventos`: lista eventos operacionais.
- `Alertas`: lista alertas da missão.

## Como rodar o backend

Pré-requisitos:

- Java 17 ou superior.
- Maven instalado.

No terminal:

```bash
cd backend
mvn spring-boot:run
```

A API ficará disponível em:

```text
http://localhost:8080/api
```

## Como o professor pode executar o projeto

Em uma máquina com Git, Java 17, Maven e Node.js instalados, o professor pode rodar assim:

```powershell
git clone https://github.com/12345-oss/controle-missao-espacial.git
cd controle-missao-espacial
```

Terminal 1, backend:

```powershell
cd backend
mvn spring-boot:run
```

API do backend:

```text
http://localhost:8080/api/sensors
```

Terminal 2, mobile/web:

```powershell
cd mobile
npm.cmd install
npm.cmd run web
```

App mobile aberto no navegador:

```text
http://localhost:8082
```

Para demonstrar a integração, abra `Nova leitura`, envie uma leitura por POST e depois confira a tela `Sensores`, que carrega os dados por GET.

Console do H2:

```text
http://localhost:8080/h2-console
```

Dados para acessar o H2:

```text
JDBC URL: jdbc:h2:file:./data/mission-control-db
User: sa
Password: deixe em branco
```

## Como testar a API

Listar sensores:

```bash
curl http://localhost:8080/api/sensors
```

Cadastrar sensor:

```bash
curl -X POST http://localhost:8080/api/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fuel Pressure E5",
    "sensorType": "Pressure",
    "moduleName": "Propulsion Module",
    "location": "Tank Section",
    "reading": 244.8,
    "unit": "kPa",
    "status": "NORMAL"
  }'
```

No PowerShell, se preferir:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/sensors" -Method Post -ContentType "application/json" -Body '{
  "name": "Fuel Pressure E5",
  "sensorType": "Pressure",
  "moduleName": "Propulsion Module",
  "location": "Tank Section",
  "reading": 244.8,
  "unit": "kPa",
  "status": "NORMAL"
}'
```

## Como rodar o app mobile

Pré-requisitos:

- Node.js instalado.
- Expo instalado ou uso via `npx expo`.
- Backend rodando na porta `8080`.

No terminal:

```powershell
cd mobile
npm.cmd install
npm.cmd run web
```

Abra no navegador:

```text
http://localhost:8082
```

Se preferir usar Android emulator ou Expo Go:

```powershell
npm.cmd run start
```

Depois escolha `a` para Android emulator ou escaneie o QR Code com Expo Go.

### Configuração da URL da API

O app já vem configurado assim:

- Android emulator: `http://10.0.2.2:8080/api`
- iOS simulator ou web: `http://localhost:8080/api`

Existe um arquivo de exemplo em `mobile/.env.example`:

```text
EXPO_PUBLIC_API_URL=http://localhost:8080/api
```

Se for usar celular físico com Expo Go, o celular e o computador precisam estar na mesma rede. Use o IP do computador:

```powershell
$env:EXPO_PUBLIC_API_URL="http://SEU-IP-DO-COMPUTADOR:8080/api"
npm.cmd run start
```

Exemplo:

```powershell
$env:EXPO_PUBLIC_API_URL="http://192.168.0.20:8080/api"
npm.cmd run start
```






