const express = require('express')
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configuração pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na  aplicação 
server.use(express.urlencoded({ extended: true}))

//tamplete angine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//req: Requisição
//res: Resposta
server.get("/", (req, res) => { 
   return res.render("index.html")
})


server.get("/page-create", (req, res) => {
    
  //  req.query: Query Strings da url
  
  return res.render("page-create.html")
})

  server.post("/savepoint", (req, res) => {
        // req.body  O corpo do formulário
        // console.log(req.body)
      
       
        // inserir dados no banco de dados
        const query = `
                INSERT INTO places( 
                    image,
                    name,
                    address,
                    address2,
                    state,
                    city,
                    items
                ) VALUES (?,?,?,?,?,?,?);
        
            `
             const values = [
                  req.body.image,
                  req.body.name,
                  req.body.adrress,
                  req.body.adrress2,
                  req.body.uf,
                  req.body.city,
                  req.body.items
            ]
        
              function afterInsertData(err){
                if(err) {
                    console.log(err)
                    return res.send("Erro no Cadastro!")
        
                }
                 console.log("Cadastrado com sucesso")
                 console.log(this)


                 return res.render("page-create.html", {saved: true})
              }
        
              db.run(query, values, afterInsertData)

              // {saved: true}
             
              // 4 deletar dados       
  })
     
server.get("/search", (req, res) => {
   
  const search = req.query.search
     if(search == ""){
       //pesquisa vazia
       return res.render("search.html", {total: 0})
     }


  //pegar dados do banco de dados
  db.all( `SELECT * FROM places WHERE city LIKE '%${search}%'` , function(err, rows){
         if(err) {
                return console.log(err)

            }

          const total = rows.length
      //   console.log("Aqui estão seus registros")
      //  console.log(rows)
        
      return res.render("search.html", { places: rows, total: total})
     })  
              
  })

//ATUALIZAR DADOS

  server.get("/atualizar/:id ", (req, res) => {

    const id = req.params.id

   db.all(`SELECT * FROM places WHERE id = ${id}`, function(err, rows){
      if(err){
        console.log(err)
      }
      return res.render("page-update.html", {places: rows})
      
   })
 
  })

  
  // DELETAR DADOS DO BANCO DE DADOS 
        server.get("deletar/:id", (req, res) => {
          
          const del = req.params.id
          db.run(`DELETE FROM places WHERE id = ${del}`, function(err, result){
                if(err){
               
                    return console.log(err)
                }
                console.log("Registro Deletado com Sucesso")
            // return res.render("search.html")

        })
     })  
    

//reset ligar o servidor
server.listen(3000) 