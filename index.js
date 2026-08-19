import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (request, response) => {
    const selectCommand = "SELECT * FROM correcao_MarcioMarcal"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            response.json(data)
        }
    })
})

app.post("/create", (request, response) => {
    const { title, gender, ageLimit, duration } = request.body

    const insertCommand = "INSERT INTO correcao_MarcioMarcal(title, gender, ageLimit, duration) VALUES (?, ?, ?, ?)"

    database.query(insertCommand, [title, gender, ageLimit, duration], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.status(201).json({
                message: "Filme cadastrado com sucesso!"
            })
        }
    })
})

app.delete("/delete/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM correcao_MarcioMarcal WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme apagado com sucesso!"
            })
        }
    })
})

app.put("/update/:id", (request, response) => {
    const { id } = request.params
    const { title, gender, ageLimit, duration } = request.body

    const updateCommand = "UPDATE correcao_MarcioMarcal SET title = ?, gender = ?, ageLimit = ?, duration = ? WHERE id = ?"

    database.query(updateCommand, [title, gender, ageLimit, duration, id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme editado com sucesso!"
            })
        }
    })
})


const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MC"
})

app.listen(3333, () => {
    console.log("Servidor online")
})