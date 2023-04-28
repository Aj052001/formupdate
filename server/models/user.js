import mongoose from "mongoose";
const CounterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
});
const counter = mongoose.model('counter', CounterSchema);
const UserSchema = new mongoose.Schema({
 
  Id: {
    type: Number,
  }, firstName: {
    type: String,
    required: true,
    unique:true
  },
  lastName: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
    unique:true
  },
 
});

UserSchema.pre('save', function(next) {
  var doc = this;
  counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
      console.log("...count: "+JSON.stringify(count));
      doc.Id = count.seq;
      next();
  })
  .catch(function(error) {
      console.error("counter error-> : "+error);
      throw error;
  });
});
UserSchema.pre('deleteUser', function(next) {
  var doc = this;
  counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: -1} }, {new: true, upsert: true}).then(function(count) {
      console.log("...count: "+JSON.stringify(count));
      doc.Id = count.seq;
      next();
  })
  .catch(function(error) {
      console.error("counter error-> : "+error);
      throw error;
  });
});

export default mongoose.model("User",UserSchema);