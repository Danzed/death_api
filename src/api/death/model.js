import mongoose, { Schema } from 'mongoose'

const deathSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  start: {
    type: Date
  },
  timestamps: {
    type: Number,
    unique: true,
    required: true,
    index: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

deathSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      start: this.start,
      timestamps: this.timestamps,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Death', deathSchema)

export const schema = model.schema
export default model
