var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/billing_db',{
  useMongoClient: true,
  /* other options */
});

var Schema = mongoose.Schema;

var partyOrder = new Schema({
  partyId: String,
  orderId: { type: String, required: true, unique: true },
  orderParticular: String,
  orderIType: String,
  orderNoOfBundle: String,
  orderQtyPerBundle:String,
  orderTotalQty:String,
  created_at: Date
});

var Party = mongoose.model('Party', partyOrder);

module.exports = Party;
