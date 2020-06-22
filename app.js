const express =require('express');

const app = express();

app.use(express.json())

app.get("/",(req, res) => {
    return res.json({titulo: "Como criar API "})
});

app.listen(3000, () => {
    console.log("servidor iniciado na porta 3000");
})