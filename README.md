## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

* Instale o docker na sua máquina [DOCKER](https://www.docker.com/get-started/)
* Para o banco de dados recomendo o [DBEAVER](https://dbeaver.io/download/)
* Para testar as rotas do back-end [INSOMNIA](https://insomnia.rest/download)

### 🔧 Instalação

Iniciando o docker:

```
docker compose up -d
```

Instalando as dependências:

```
npm i
```

Rodando as migration do prisma:

```
npx prisma migrate deploy
```

Iniciando o back-end:

```
npm run dev
```

## ⚙️ Executando os testes

Para testar as rotas no insomnia, coloque a url como:
 
```
http://localhost:3333
```

Para testar se tudo está funcionando corretamente, tente na url:

```
http://localhost:3333/user/
```

No JSON do Insomnia coloque:

```
{
	"name": "Gusthavo",
	"email": "gusthavo.vieira@flai.tec",
	"password": "1234"
}
```

## 📦 Implantação

No DBAVER coloque:

* Escolha o banco postgres
* No campo Database:

```
pe-na-trilha
```

* No campo Username:

```
admin
```

* No campo Password:

```
admin
```