const Property = require('../models/Property')

const controller = {
    read: async (req,res)=>{
        let query = {}
        try {
            let properties = await Property.find()
            console.log(properties);
            if(properties){
                res.status(200).json({
                    properties,
                    success:true,
                    messagge: `${properties.length} properties founded`
                })
            }
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            })
        }
    }
}



module.exports= controller