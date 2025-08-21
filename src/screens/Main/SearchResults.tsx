import React, { useState, useEffect } from "react";
import { Search, ArrowLeft, MapPin, Star, Phone, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Header } from "../../components/common/Header";
import { doctorsApi, lawyersApi } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

interface SearchResult {
  id: string;
  name: string;
  type: 'doctor' | 'lawyer';
  specialty: string;
  rating: number;
  available: boolean;
  distance: string;
  phone?: string;
}

export const SearchResults = ({ onScreenChange }: { onScreenChange: (screen: string) => void }): JSX.Element => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'doctors' | 'lawyers'>('all');

  useEffect(() => {
    // Get search query from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    }
  }, []);

  const performSearch = async (query: string) => {
    if (!user?.token || !query.trim()) return;
    
    setLoading(true);
    try {
      const [doctorsData, lawyersData] = await Promise.all([
        doctorsApi.getDoctors(user.token, { search: query }),
        lawyersApi.getLawyers(user.token, { search: query })
      ]);

      const allResults = [
        ...(doctorsData.doctors || []).map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          type: 'doctor' as const,
          specialty: doc.specialty,
          rating: doc.rating || 4.5,
          available: doc.available,
          distance: doc.distance || 'Unknown distance',
          phone: doc.phone
        })),
        ...(lawyersData.lawyers || []).map((law: any) => ({
          id: law.id,
          name: law.name,
          type: 'lawyer' as const,
          specialty: law.specialty,
          rating: law.rating || 4.5,
          available: law.available,
          distance: law.distance || 'Unknown distance',
          phone: law.phone
        }))
      ];

      setResults(allResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true;
    return result.type === filter;
  });

  const handleProfessionalSelect = (professional: SearchResult) => {
    onScreenChange('professionals');
  };

  const handleBack = () => {
    onScreenChange('dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Search Results" showBack onBack={handleBack} />
      
      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search doctors, lawyers, or services..."
              className="pl-10 h-12 bg-white border border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10">
              Search
            </Button>
          </div>
        </form>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({results.length})
          </Button>
          <Button
            variant={filter === 'doctors' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('doctors')}
          >
            Doctors ({results.filter(r => r.type === 'doctor').length})
          </Button>
          <Button
            variant={filter === 'lawyers' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('lawyers')}
          >
            Lawyers ({results.filter(r => r.type === 'lawyer').length})
          </Button>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6a00] mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProfessionalSelect(result)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    result.type === 'doctor' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    <span className={`text-lg font-bold ${
                      result.type === 'doctor' ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {result.type === 'doctor' ? 'DR' : 'LW'}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{result.name}</h3>
                    <p className="text-gray-600 mb-2">{result.specialty}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{result.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{result.rating}</span>
                      </div>
                      <span className={`font-medium ${
                        result.available ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {result.phone && (
                      <Button variant="outline" size="sm" className="w-full">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="w-4 h-4 mr-1" />
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg mb-4">No results found</p>
            <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
            <Button onClick={() => onScreenChange('dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}; 