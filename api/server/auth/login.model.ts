
import mongoose from "mongoose";
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId
//Schema.set('validateBeforeSave', true);

const UserLoginSchema = new schema({
	user: {type: ObjectId, trim: true } ,
	city:String,
	country:String,
	ipAddress: String,
	deviceType: String,
	deviceName: String,
	sessionID: String,
	isSuccessful:{type: Boolean, default: false},
	isActive:{type: Boolean, default: false},
},{
	timestamps: true
});
const UserLogin = mongoose.model("UserLogin",UserLoginSchema);
export default UserLogin;

