function register (req,res){
    const inputData =req.body;
    res.json({
        message: "registra usuario",inputData
    })
    
}
module.exports = {register}