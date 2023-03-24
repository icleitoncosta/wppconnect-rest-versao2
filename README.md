
![Logo](https://i.imgur.com/NSoVb2U.png)


# WPPConnect - REST

Através do Rest você pode enviar e receber mensagens, áudios, contatos, localização, receber mensagens, administrar grupos, etc.

Ele é uma versão mais simplificada para poder utilizar as funções do @wppconnect/wppconnect (LIB) através de uma API Rest, todas as chamadas são similares a API Oficial do WhatsApp. 


## Funcionalidades

- Envio e recebimento de mensagens
- Envio e recebimento de mídias
- Envio de contatos e localização
- Mensagens em grupos
- Webhook

## Stack utilizada


Node, Express, TSOA, PinoJS, WPPConnect (Lib).


## Instalação

Para poder executar esse projeto, é bem simples, siga os passos abaixo:

Após clonar o repósitório: 

1. Instale as dependências:
```bash
  yarn install
```

Se estiver em um computador local, pode pular direto para o passo de Execução,caso esteja em uma VPS ou computador em nuvem execute os passos à seguir:

2. Instalando dependências extras

Instale as dependências da Lib WPPConnect.
```bash
  sudo apt-get install -y libxshmfence-dev libgbm-dev wget unzip fontconfig locales gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils
```
Instale o Google Chrome
```bash
wget -c https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt-get update
sudo apt-get install libappindicator1
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

## Execução

Coloque qualquer informação adicional aqui

Inicie em modo desenvolvedor:
```bash
  yarn dev
```

Efetuar Build
```bash
  yarn build
```

Iniciar em modo produção:
```bash
  yarn start
```
## Configuração
Você pode alterar as configurações, através do arquivo src/config.ts

```bash
const config = {
  // Devices
  "secretKey": "THISISMYSECURETOKEN", // Secret key for generate acess token
  "host": "http://localhost", // HOST for connect, localhost or IP of your server
  "port": "21465",
  "deviceName": "WppConnect", // Name for display on smartphone
  "poweredBy": "WPPConnect-Server",
  "startAllSession": true, // Start All Sessions on server startup
  "customUserDataDir": "./userDataDir/", // Folder for save sessions of whatsapp

  // Webhook
  "webhook": {
      "url": "", // URL for send all webhooks
      "acks": true, // Read confirmation, audio listening, contacts and groups
      "presence": true, // Contacts online and offile
      "participants_changed_group": true, // Group member changes
      "reactions": true, // Receive reactions that contacts give in messages
      "readMessage": true, // Send seen for contact
      "calls": true, // Send event calls for webhook
    },

  // Logs
  "log": {
    "level": "silly", // To not show too many logs, change 'silly' to 'error'
    "logger": ["console", "file"]
  },

  // Create Options for WhatsApp Start Session
  "createOptions": {
    "browserArgs": [
      "--disable-web-security",
      "--no-sandbox",
      "--disable-web-security",
      "--aggressive-cache-discard",
      "--disable-cache",
      "--disable-application-cache",
      "--disable-offline-load-stale-cache",
      "--disk-cache-size=0",
      "--disable-background-networking",
      "--disable-default-apps",
      "--disable-extensions",
      "--disable-sync",
      "--disable-translate",
      "--hide-scrollbars",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-first-run",
      "--safebrowsing-disable-auto-update",
      "--ignore-certificate-errors",
      "--ignore-ssl-errors",
      "--ignore-certificate-errors-spki-list"
    ],
    "puppeteerOptions": {},
  },
}
export default config;
```
## Documentação Básica

#### Gerar o Token de autenticação

```http
  GET /${PHONE_NUMBER_ID}/${SECRET_KEY}/request_code
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `PHONE_NUMBER_ID` | `string` | **Obrigatório**. O número que irá conectar na sessão e retornar o Token. |
| `SECRET_KEY` | `string` | **Obrigatório**. A secretKey configurada através do config.ts. |

Retorna o token para colocar no cabeçalho da requisição e iniciar a conecção. 

#### Iniciar a conecção do WhatsApp

```http
  POST /${PHONE_NUMBER_ID}/start
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `PHONE_NUMBER_ID`      | `string` | **Obrigatório**. O número de telefone conectado à sessão. |

Inicia o processo para leitura do QR Code no celular, pode efetuar a leitura através do console, que irá imprimir o QR Code, ou retornar através de uma requisição.


#### Retornar QR Code

```http
  GET /${PHONE_NUMBER_ID}/qr_code
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `PHONE_NUMBER_ID`      | `string` | **Obrigatório**. O número de telefone conectado à sessão. |

Retorna o QR Code em base64 para poder gerar a imagem e efetuar a leitura.


#### Envio de mensagens

```http
  POST /${PHONE_NUMBER_ID}/messages

  /** Body - Send Text Message *//
  {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "type": "text",
    "to": "number@c.us", // Coloque aqui o número do contato utilizando @c.us
    "text": {
        "body": "Hello, welcome to Brazil!"
    }
  }
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `PHONE_NUMBER_ID`      | `string` | **Obrigatório**. O número de telefone conectado à sessão. |
| `messaging_product`      | `string` | **Obrigatório**. O tipo de produto. Sempre será 'whatsapp'. |
| `recipient_type`      | `string` | **Obrigatório**. O tipo de pessoa que está enviando. Sempre será individual |
| `type`      | `string` | **Obrigatório**. Tipo da mensagem, para ser enviada.  |
| `to`      | `string` | **Obrigatório**. O número do telefone da pessoa que deseja enviar a mensagem.  |
| `text:body`      | `string` | **Obrigatório**. O texto que deseja enviar  |

Retorna o ID da mensagem enviada.


#### Envio de imagem

```http
  POST /${PHONE_NUMBER_ID}/messages

  /** Body - Send Image Message *//
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "type": "image",
        "to": "number@c.us",
        "image": {
            "caption": "Hello, welcome to Brazil!",
            "link": "https://pbs.twimg.com/media/EJu-T-eWkAA8rcd?format=jpg&name=4096x4096"
        }
    }
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `PHONE_NUMBER_ID`      | `string` | **Obrigatório**. O número de telefone conectado à sessão. |
| `messaging_product`      | `string` | **Obrigatório**. O tipo de produto. Sempre será 'whatsapp'. |
| `recipient_type`      | `string` | **Obrigatório**. O tipo de pessoa que está enviando. Sempre será individual |
| `type`      | `string` | **Obrigatório**. Tipo da mensagem, para ser enviada.  |
| `to`      | `string` | **Obrigatório**. O número do telefone da pessoa que deseja enviar a mensagem.  |
| `image:caption`      | `string` | **Opcional**. Mensagem de texto para ser enviada junto da imagem.  |
| `image:link`      | `string` | **Opcional**. Link da imagem que deseja enviar.  |

Retorna o ID da mensagem enviada.

## Documentação Completa
Para ter acesso a documentação completa, instale e rode o projeto em seu computador e acesse o Swagger UI:
```bash
http://localhost:21465/docs
```
## Contribuindo

Contribuições são sempre bem-vindas!

Por favor, envie um PR, ou abra uma issue.

## Autores

- [@icleitoncosta](https://github.com/icleitoncosta)

