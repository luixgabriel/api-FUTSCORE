var knex = require('../database/connection')
var bcrypt = require('bcrypt')

//Service
class User {

    async create(email,name,password){
        try{
            var hash = await bcrypt.hash(password, 12)
            await knex.insert({name,email,password: hash,role:0}).table('users')
        }catch{
            return {msg: "erro"}
        }
    }

    async findEmail(email){
        try {
            var result = await knex.select().table('users').where({email: email})
            if(result.length > 0){
                return true
            }
            else{
                return false
            }

        }catch{} 
    }
    async findAll(){
        
        try {
            var result = await knex.select(["idusers","name","email", "role"]).table('users')
            return result
        } catch (error) {
            console.log(error)
            return []
        }
    } 

    async findById(id){
        try {
            var result = await knex.select(["idusers","name","email", "role"]).where({idusers:id}).table('users')
            console.log(result.length)
            if(result.length > 0){
                return result[0]
            }else{
                return undefined
            }
        } catch (error) {
            console.log(error)
            return []
        }
       
    }

    async findByEmail(email){
        try {
            var result = await knex.select(["idusers","name","password","email", "role"]).where({email:email}).table('users')
            console.log(result.length)
            if(result.length > 0){
                return result[0]
            }else{
                return undefined
            }
        } catch (error) {
            console.log(error)
            return []
        }
       
    }
    
    async updateUser(id,email,name,role){
        var user = await this.findById(id)
        
        
        if(user){
            var editUser = {}
            console.log(`Cheguei aqui meu id é ${id}`)
               
            if(email){
                if(email != user.email){
                    var result = await this.findEmail(email)
                   
                    if(!result){
                        
                        editUser.email = email
                        console.log(`cheguei no email ${editUser.email}`)
                       
                     
                    }
                }
                else{
                    return{status: false, msg: "Esse email já está cadastrado"}
                }
            }

            if(name){
                editUser.name = name
                console.log(`cheguei no nome ${editUser.name}`)
            }

            if(role){
                editUser.role = role
                console.log(`cheguei na role ${editUser.role}`)
            }

            try{
                
                await knex.update(editUser).where({idusers: id}).table('users')
               
                return{status: true}
            }
            catch{
                return{status: false, msg: "Esse email já está cadastrado"}
            }
           

        }else{
            return {status: false, msg:'O usuário não foi encontrado'}
        }
    }


    async deleteUser(id){
        try {
            var user = await this.findById(id)
            console.log(user)
            if(user != undefined){ 
                await knex.delete().where({idusers: user.idusers}).table('users')
                    return {status: true} }
                else{
                    return{status: false, msg: "Esse usuário não existe"}
                    }

        }
        
        catch{
            return{status: false, msg: "Esse email já está cadastrado"}
        }
        
    }

    async changePassword(newPassword, id, token){
        try {

            var hash = await bcrypt.hash(newPassword, 12)
            await knex.update({password: hash}).where({idusers: id}).table('users')
            
           
        } catch (error) {
            console.log(error)
            
        }
        
    }

}

module.exports = new User()