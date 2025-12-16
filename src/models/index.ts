import mongoose, { Schema, Document, Model } from 'mongoose';

// Lead Interface
export interface ILead extends Document {
    name: string;
    phone: string;
    academyName: string;
    region: string;
    message?: string;
    createdAt: Date;
}

// Lead Schema
const LeadSchema: Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    academyName: { type: String, required: true },
    region: { type: String, required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
});

// Content Interface
export interface IContent extends Document {
    section: string;
    title: string;
    body: string;
    imageUrl?: string;
    lastUpdated: Date;
}

// Content Schema
const ContentSchema: Schema = new Schema({
    section: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    imageUrl: { type: String },
    lastUpdated: { type: Date, default: Date.now },
});

// Check if models are already compiled
const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
const Content: Model<IContent> = mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);

export { Lead, Content };
