import mongoose, { Schema } from 'mongoose'

const deathSchema = new Schema({
  date: {
    type: String
  },
  hours: {
    type: String
  },
  user: {
    type: String
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
      date: this.date,
      hours: this.hours,
      user: this.user,
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
