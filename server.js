// express usado parar configurar o servidor 
const express = require("express");
const server = express();
// exportando o db
const db = require("./db");


// configurando arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));


const nunjucks = require ("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
})



// criei uma rota
// e o capturo o pedido do cliente para responder
server.get("/", function(request, response) {

    // Consultar dadso na tabela
    db.all(`SELECT * FROM ideas`, function(error, rows){
        if (error) {
            console.log(error);
            return response.send("Erro no banco de dados!");
        }

        let lastIdeas = []
        const reversedIdeas = [...rows].reverse()
    
         // reverse pega as ultimas ideias
        for (idea of reversedIdeas) {
            if(lastIdeas.length < 2) {
                // push adiciona alguma coisa
                lastIdeas.push(idea)  
            }
        }
    
        return response.render( "index.html", {ideas: lastIdeas});
        console.log(rows)
    })

})

server.get("/ideias", function(request, response) {

    db.all(`SELECT * FROM ideas`, function(error, rows) {
        if (error) {
            console.log(error);
            return response.send("Erro no banco de dados!");
        }
        
        const reversedIdeas = [...rows].reverse()
        return response.render( "ideias.html", {ideas: reversedIdeas});
    })
   
});

server.post("/", function(request, response){
    // Inserir dado na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
        `

    const values =  [
       request.body.image,
       request.body.title,
       request.body.category,
       request.body.description,
       request.body.link,
    ]

    db.run(query, values, function(error){
        if (error) {
            console.log(error);
            return response.send("Erro no banco de dados!");
        }

        return response.redirect("/ideias")
    })
})

// ligando servidor na porta 3000 
server.listen(3000);

