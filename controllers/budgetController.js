const BudgetItem = require('../models/BudgetItem.model')
const {validationResult} = require('express-validator')

// crear presupuesto
exports.crearPresupuesto = async (req,res) => {
    try{
        //Crear un nuevo presupuesto
        const presupuesto = new BudgetItem(req.body)

        //Guardar el dueño del presupuesto vía JWT
        presupuesto.budgetOwner = req.usuario.id

        // Guardar el presupuesto
        presupuesto.save()
        res.json(presupuesto)

    } catch(error){
        console.log(error)
    }
}

// Mostrar presupuestos del usuario
exports.mostrarPresupuesto = async (req,res) =>{
    try{
        const presupuestos = await BudgetItem.find({budgetOwner:req.usuario.id}).populate('budgetOwner').sort({budgetAmount:-1})
        res.json({presupuestos})

    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error intentando mostrar el presupuesto')
    }
}

// Sumar el total de lo presupuestado
exports.totalPresupuestado = async (req,res) => {
    try{
        const presupuestos = await BudgetItem.find({budgetOwner: req.usuario.id}).sort({budgetAmount:-1})
        const soloPresupuestos = presupuestos.map((elemento)=>{
            return(elemento.budgetAmount)
        })
        const sumaPresupuestos = soloPresupuestos.reduce((a,b)=>{
            return(a+b)
        })
        console.log(sumaPresupuestos)
        res.json({sumaPresupuestos: sumaPresupuestos})

    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error intentando calcular el total presupuestado')
    }
}

// Eliminar un presupuesto

exports.eliminarPresupuesto = async (req,res)=> {
    try {
        let presupuesto = await BudgetItem.findById(req.params.id)

        await BudgetItem.findOneAndRemove({_id:presupuesto})
        res.json({msg:"Presupuesto eliminado"})
        }

     catch(error){
        console.log(error)
        res.status(500).send('Error intentando eliminar una partida')
    }

}