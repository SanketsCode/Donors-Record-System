const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankSchema = new Schema({
    date :{
        type:String,
        default:""
    },
    money :{
        type:mongoose.Types.Decimal128,
        default:0.0
    },
    transaction_id:{
        type : String,
        default:""
    }
});

module.exports = mongoose.model("Bank",BankSchema);