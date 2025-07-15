'use client';

import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Download, Search } from 'lucide-react';

interface AnalysisResult {
  file_path: string;
  source_type: string;
  source_name: string;
  location: string;
  keyword: string;
  exact_sentence: string;
  partner: string;
}

interface ApiResponse {
  total_matches: number;
  files_processed: number;
  keywords_found: number;
  results: AnalysisResult[];
}

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeFiles = async () => {
    if (files.length === 0) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const filesData = await Promise.all(
        files.map(async (file) => {
          const buffer = await file.arrayBuffer();
          const base64Content = Buffer.from(buffer).toString('base64');
          return {
            filename: file.name,
            content: base64Content
          };
        })
      );

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: filesData })
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data: ApiResponse = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadCSV = () => {
    if (!results) return;

    const csv = [
      ['File Path', 'Source Type', 'Source Name', 'Location', 'Keyword', 'Exact Sentence', 'Partner'],
      ...results.results.map(result => [
        result.file_path,
        result.source_type,
        result.source_name,
        result.location,
        result.keyword,
        result.exact_sentence,
        result.partner
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compliance-analysis-results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              EO Compliance Analysis Tool
            </h1>
            <p className="text-gray-600">
              Upload documents to analyze for compliance-related keywords
            </p>
          </div>

          <div className="space-y-6">
            <FileUpload files={files} onFilesChange={setFiles} />

            {files.length > 0 && (
              <div className="text-center">
                <Button 
                  onClick={analyzeFiles}
                  disabled={isAnalyzing}
                  className="px-8 py-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Analyze Documents
                    </>
                  )}
                </Button>
              </div>
            )}

            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {results && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Analysis Results
                      <Button onClick={downloadCSV} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download CSV
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {results.total_matches}
                        </div>
                        <div className="text-sm text-gray-600">Total Matches</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {results.files_processed}
                        </div>
                        <div className="text-sm text-gray-600">Files Processed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {results.keywords_found}
                        </div>
                        <div className="text-sm text-gray-600">Keywords Found</div>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>File</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Keyword</TableHead>
                          <TableHead>Sentence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {results.results.slice(0, 50).map((result, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {result.file_path}
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{result.source_name}</div>
                                <div className="text-gray-500">{result.location}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{result.keyword}</Badge>
                            </TableCell>
                            <TableCell className="max-w-md">
                              <div className="truncate" title={result.exact_sentence}>
                                {result.exact_sentence}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {results.results.length > 50 && (
                      <div className="text-center mt-4 text-gray-500">
                        Showing first 50 results. Download CSV for complete results.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
