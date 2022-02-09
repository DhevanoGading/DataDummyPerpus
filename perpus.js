//inisialisasi aplikasi menggunakan express js
const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//data dummy
let nextId = 4;
const books =[
    { id: 1, title: "The First", year: 2019},
    { id: 2, title: "The Seccond", year: 2020},
    { id: 3, title: "The Third", year: 2021},
];

//ENDPOINT

app.get("/", (req,res) => {
    res.send({
        message: "Berhasil melakukan pemanggilan get",
        data: {
            description:
            "Endpoint ini untuk menampilkan data",
        }
    })
})

app.get("/books", (req,res) => {
    res.send({
        message: "Berhasil menampilkan data buku",
        data: { books }
    })
})

app.post("/books", (req,res) => {
    const book = {
        id: nextId++,
        title: req.body.title,
        year: req.body.year,
    }
    books.push(book);
    res.send({
        message: "Berhasil menambahkan buku",
        data: {
            newBook: book,
            totalBooks: books.length,
        }
    })
})

app.put("/books/:id", (req,res) => {
    const bookIndex = books.findIndex((item) => item.id == req.params.id);
    books[bookIndex].title = req.body.title;
    books[bookIndex].year = req.body.year;

    res.send({
        message: "berhasil mengubah buku",
        data: { book: books[bookIndex] },
    })
})

app.delete("/books/:id", (req,res) => {
    const id = req.params.id;
    const index = books.findIndex(book => book.id == id);
    const book = books[index];
    if(book == undefined){
        res.send({
            message: "Buku tidak ditemukan"
        })
    } else {
        books.splice(index, 1);
        res.send({
            message: "Berhasil menghapus buku",
            data: {
                book,
                totalBooks: books.length,
            }
        })
    }
})

const port = 8080;
app.listen(port, () => console.log (`App running ${port}`))