module.exports={
    async login(req, res){
        //* req = request = recibir
        //* res = response = responder
        const {email, password}=req.body;
        console.log(email);
        
        res.status(200).json({
            status:"OK",
            message: "Inición iniciada correctamente, Bienvenido"
        })
        
    }
}
