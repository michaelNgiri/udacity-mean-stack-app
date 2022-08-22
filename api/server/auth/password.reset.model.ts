
import mongoose from "mongoose";
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId
//Schema.set('validateBeforeSave', true);

const PasswordResetSchema = new schema({
	user: {type:ObjectId, trim: true },
	userEmail:String,
	oldPassword: String,
	newPassword: String,
	otp:String,
	isSuccessful:{type: Boolean, default: false},
},{
	timestamps: true
});
const PasswordReset = mongoose.model("PasswordReset",PasswordResetSchema);
export default PasswordReset;

