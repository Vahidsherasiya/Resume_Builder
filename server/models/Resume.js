import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, default: 'My Resume' },
    theme: {
      primaryColor: { type: String, default: '#00c598' },
      secondaryColor: { type: String, default: '#1e293b' },
      fontFamily: { type: String, default: 'Inter' },
      columnLayout: { type: String, default: '55-45' }
    },
    header: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    leftColumn: {
      type: Array,
      default: []
    },
    rightColumn: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Resume = mongoose.model('Resume', resumeSchema);
