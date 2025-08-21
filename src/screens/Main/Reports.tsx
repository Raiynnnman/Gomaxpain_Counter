import React, { useState, useEffect } from "react";
import { FileText, Download, Eye, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/common/Header";
import { useAuth } from "../../contexts/AuthContext";
import { emergencyReportsApi } from "../../services/api";

interface Report {
  id: string;
  type: string;
  title: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  location?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export const Reports = ({ onScreenChange }: { onScreenChange: (screen: string) => void }): JSX.Element => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'investigating' | 'resolved' | 'closed'>('all');

  useEffect(() => {
    const fetchReports = async () => {
      if (!user?.token) return;
      
      setLoading(true);
      try {
        const reportsData = await emergencyReportsApi.getUserReports(user.token);
        setReports(reportsData.reports || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
        // Set mock data as fallback
        setReports([
          {
            id: '1',
            type: 'Car Accident',
            title: 'Rear-end collision at traffic light',
            description: 'I was rear-ended while stopped at a red light. The other driver was not paying attention.',
            status: 'investigating',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-16T14:20:00Z',
            location: '123 Main St & Oak Ave, City',
            priority: 'high'
          },
          {
            id: '2',
            type: 'Slip & Fall',
            title: 'Slipped on wet floor at grocery store',
            description: 'I slipped and fell on a wet floor that was not properly marked with warning signs.',
            status: 'resolved',
            createdAt: '2024-01-10T14:20:00Z',
            updatedAt: '2024-01-12T09:15:00Z',
            location: '456 Market St, City',
            priority: 'medium'
          },
          {
            id: '3',
            type: 'Workplace Injury',
            title: 'Lifting injury at construction site',
            description: 'I injured my back while lifting heavy materials at the construction site.',
            status: 'pending',
            createdAt: '2024-01-20T08:45:00Z',
            updatedAt: '2024-01-20T08:45:00Z',
            location: '789 Industrial Blvd, City',
            priority: 'urgent'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user?.token]);

  const handleBack = () => {
    onScreenChange('dashboard');
  };

  const handleViewReport = (report: Report) => {
    // In a real app, this would navigate to a detailed report view
    alert(`Viewing report: ${report.title}`);
  };

  const handleDownloadReport = (report: Report) => {
    // In a real app, this would download the report PDF
    alert(`Downloading report: ${report.title}`);
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'investigating':
        return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed':
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'investigating':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Report['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6a00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Reports" showBack onBack={handleBack} />
      
      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-gray-600" />
            <span className="text-lg font-semibold text-gray-900">
              Reports ({reports.length})
            </span>
          </div>
          
          <Button onClick={() => onScreenChange('emergency-report')}>
            New Report
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({reports.length})
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending ({reports.filter(r => r.status === 'pending').length})
          </Button>
          <Button
            variant={filter === 'investigating' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('investigating')}
          >
            Investigating ({reports.filter(r => r.status === 'investigating').length})
          </Button>
          <Button
            variant={filter === 'resolved' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('resolved')}
          >
            Resolved ({reports.filter(r => r.status === 'resolved').length})
          </Button>
          <Button
            variant={filter === 'closed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('closed')}
          >
            Closed ({reports.filter(r => r.status === 'closed').length})
          </Button>
        </div>

        {/* Reports List */}
        {filteredReports.length > 0 ? (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                        {report.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{report.description}</p>
                    
                    {report.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{report.location}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Created: {formatDate(report.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Updated: {formatDate(report.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)} flex items-center gap-1`}>
                      {getStatusIcon(report.status)}
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewReport(report)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadReport(report)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' 
                ? "You haven't created any reports yet." 
                : `No reports with status "${filter}" found.`
              }
            </p>
            <Button onClick={() => onScreenChange('emergency-report')}>
              Create Your First Report
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}; 