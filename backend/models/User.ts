import bcrypt from 'bcryptjs';
import mongoose, {Document, Model, Schema} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error)
    }
});

userSchema.methods.comparePassword = function (
    candidatePassword: string
) : Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
}

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;