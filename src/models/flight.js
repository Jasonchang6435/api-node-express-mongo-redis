import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
    name: String,
    speed: Number
});

export default mongoose.model('Flight', carSchema);