import mongoose from 'mongoose'

const investmentReportSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    recommendation: { type: String, enum: ['INVEST', 'PASS'], default: 'PASS' },
    confidenceScore: { type: Number, default: 0 },
    summary: { type: String, default: '' },
    aiAnalysis: { type: Object, default: {} },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

const InvestmentReport = mongoose.model('InvestmentReport', investmentReportSchema)

export default InvestmentReport
