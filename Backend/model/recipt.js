const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReciptSchema = new Schema({
    recipt_no:{
        type:String,
        default:""
    },
    recipt_date :{
        type:String,
        default:""
    },
    Donors_Name:{
        type:String,
        default:""
    },
    Donors_Address:{
        type:String,
        default:""
    },
    mobile:{
        type:String,
        default:""
    },
    Donors_Money :{
        type:mongoose.Types.Decimal128,
        default:0.0
    },
    refer:{
        type:String,
        default:""
    },
    transaction_id:{
        type : String,
        default:""
    }
});

module.exports = mongoose.model("Recipt",ReciptSchema);