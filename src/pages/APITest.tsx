import React, { useState, useEffect } from 'react';
import { productsAPI, rentalsAPI, workshopAPI } from '../services/api';

const APITest: React.FC = () => {
  const [testResults, setTestResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results: any = {};

    try {
      // Test Products API
      console.log('Testing Products API...');
      const productsResponse = await productsAPI.getAll();
      results.products = {
        success: productsResponse.success,
        data: productsResponse.data,
        error: null
      };
      console.log('Products API Result:', productsResponse);
    } catch (error) {
      results.products = {
        success: false,
        data: null,
        error: error.message
      };
      console.error('Products API Error:', error);
    }

    try {
      // Test Rentals API
      console.log('Testing Rentals API...');
      const rentalsResponse = await rentalsAPI.getApartments();
      results.rentals = {
        success: rentalsResponse.success,
        data: rentalsResponse.data,
        error: null
      };
      console.log('Rentals API Result:', rentalsResponse);
    } catch (error) {
      results.rentals = {
        success: false,
        data: null,
        error: error.message
      };
      console.error('Rentals API Error:', error);
    }

    try {
      // Test Workshop API
      console.log('Testing Workshop API...');
      const workshopResponse = await workshopAPI.getServices();
      results.workshop = {
        success: workshopResponse.success,
        data: workshopResponse.data,
        error: null
      };
      console.log('Workshop API Result:', workshopResponse);
    } catch (error) {
      results.workshop = {
        success: false,
        data: null,
        error: error.message
      };
      console.error('Workshop API Error:', error);
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Test Page</h1>
        
        <button
          onClick={runTests}
          disabled={loading}
          className="mb-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Run API Tests'}
        </button>

        <div className="space-y-6">
          {/* Products API Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Products API</h2>
            {testResults.products ? (
              <div>
                <p className={`mb-2 ${testResults.products.success ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {testResults.products.success ? '✅ Success' : '❌ Failed'}
                </p>
                {testResults.products.error && (
                  <p className="text-red-600 mb-2">Error: {testResults.products.error}</p>
                )}
                {testResults.products.data && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Data structure: {JSON.stringify(Object.keys(testResults.products.data)).slice(0, 100)}...
                    </p>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(testResults.products.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Not tested yet</p>
            )}
          </div>

          {/* Rentals API Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Rentals API</h2>
            {testResults.rentals ? (
              <div>
                <p className={`mb-2 ${testResults.rentals.success ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {testResults.rentals.success ? '✅ Success' : '❌ Failed'}
                </p>
                {testResults.rentals.error && (
                  <p className="text-red-600 mb-2">Error: {testResults.rentals.error}</p>
                )}
                {testResults.rentals.data && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Data type: {Array.isArray(testResults.rentals.data) ? 'Array' : 'Object'} 
                      {Array.isArray(testResults.rentals.data) ? ` (${testResults.rentals.data.length} items)` : ''}
                    </p>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(testResults.rentals.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Not tested yet</p>
            )}
          </div>

          {/* Workshop API Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Workshop API</h2>
            {testResults.workshop ? (
              <div>
                <p className={`mb-2 ${testResults.workshop.success ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {testResults.workshop.success ? '✅ Success' : '❌ Failed'}
                </p>
                {testResults.workshop.error && (
                  <p className="text-red-600 mb-2">Error: {testResults.workshop.error}</p>
                )}
                {testResults.workshop.data && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Data type: {Array.isArray(testResults.workshop.data) ? 'Array' : 'Object'} 
                      {Array.isArray(testResults.workshop.data) ? ` (${testResults.workshop.data.length} items)` : ''}
                    </p>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(testResults.workshop.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Not tested yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITest;