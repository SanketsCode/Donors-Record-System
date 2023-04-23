const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    date :{
        type:String,
        default:""
    },
    name:{
        type:String,
        default:""
    },
   
    money :{
        type:mongoose.Types.Decimal128,
        default:0.0
    },
    status:{
        type : String,
        enums : ["Income","Expense"],
        default:"Income"
    }
});

module.exports = mongoose.model("Transaction",TransactionSchema);