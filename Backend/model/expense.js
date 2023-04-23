const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseShema = new Schema({
    date :{
        type:String,
        default:""
    },
    title:{
        type:String,
        default:""
    },
    description:{
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

module.exports = mongoose.model("Expense",ExpenseShema);