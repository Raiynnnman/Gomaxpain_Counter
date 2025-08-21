const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const emergencyReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['car', 'medical', 'workplace', 'slip', 'other']
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    },
    useCurrentLocation: {
      type: Boolean,
      default: false
    }
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 1000
  },
  photos: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    path: String
  }],
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    required: true,
    enum: ['draft', 'submitted', 'under_review', 'assigned', 'in_progress', 'resolved', 'closed'],
    default: 'submitted'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // For professionals assigned to handle the case
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  estimatedResponseTime: {
    type: Number, // in minutes
    default: 60
  },
  tags: [String], // For categorization and search
  notes: [{
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  resolvedAt: Date,
  closedAt: Date
}, {
  timestamps: true
});

// Index for efficient queries
emergencyReportSchema.index({ userId: 1, createdAt: -1 });
emergencyReportSchema.index({ status: 1, severity: 1 });
emergencyReportSchema.index({ 'location.coordinates': '2dsphere' });
emergencyReportSchema.index({ tags: 1 });

// Add pagination plugin
emergencyReportSchema.plugin(mongoosePaginate);

// Virtual for response time
emergencyReportSchema.virtual('responseTime').get(function() {
  if (this.status === 'resolved' && this.createdAt) {
    return this.resolvedAt - this.createdAt;
  }
  return null;
});

// Method to update status
emergencyReportSchema.methods.updateStatus = function(newStatus, userId) {
  this.status = newStatus;
  
  if (newStatus === 'resolved') {
    this.resolvedAt = new Date();
  } else if (newStatus === 'closed') {
    this.closedAt = new Date();
  }
  
  // Add note about status change
  this.notes.push({
    content: `Status changed to ${newStatus}`,
    author: userId,
    timestamp: new Date()
  });
  
  return this.save();
};

// Method to assign professional
emergencyReportSchema.methods.assignProfessional = function(professionalId, userId) {
  this.assignedTo = professionalId;
  this.status = 'assigned';
  
  this.notes.push({
    content: `Assigned to professional ${professionalId}`,
    author: userId,
    timestamp: new Date()
  });
  
  return this.save();
};

// Pre-save middleware to set priority based on severity
emergencyReportSchema.pre('save', function(next) {
  if (this.severity === 'critical') {
    this.priority = 'urgent';
    this.estimatedResponseTime = 15;
  } else if (this.severity === 'high') {
    this.priority = 'high';
    this.estimatedResponseTime = 30;
  } else if (this.severity === 'medium') {
    this.priority = 'medium';
    this.estimatedResponseTime = 60;
  } else {
    this.priority = 'low';
    this.estimatedResponseTime = 120;
  }
  
  // Set tags based on type
  this.tags = [this.type, this.severity, this.priority];
  
  next();
});

const EmergencyReport = mongoose.model('EmergencyReport', emergencyReportSchema);

module.exports = EmergencyReport; 