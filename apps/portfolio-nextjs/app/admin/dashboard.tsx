/**
 * Admin Dashboard Layout
 * Foundation for admin panel CRUD operations
 */

'use client';

import { useState } from 'react';
import { useRealtimePortfolioData } from '@/app/utils/hooks/useRealtime';

interface AdminTab {
  id: string;
  label: string;
  icon: string;
}

const ADMIN_TABS: AdminTab[] = [
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '🛠️' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('experience');
  const { experience, education, skills, projects, loading, error, isRealtime } =
    useRealtimePortfolioData();

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded">
        <h2 className="text-lg font-bold text-red-700 mb-2">Error Loading Data</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Admin</h1>
            <div className="flex items-center gap-4">
              {isRealtime && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm text-green-700">Real-time synced</span>
                </div>
              )}
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                + Add New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-2 mb-6 border-b">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-600">
                <div className="animate-spin text-4xl mb-4">⌛</div>
                <p>Loading data...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'experience' && (
                <AdminTabContent title="Experience" data={experience} />
              )}
              {activeTab === 'education' && (
                <AdminTabContent title="Education" data={education} />
              )}
              {activeTab === 'skills' && (
                <AdminTabContent title="Skills" data={skills} />
              )}
              {activeTab === 'projects' && (
                <AdminTabContent title="Projects" data={projects} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Tab content component for displaying and editing data
 */
function AdminTabContent({ title, data }: { title: string; data: any[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded">
          <p className="text-gray-600">No {title.toLowerCase()} entries found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {data.map((item) => (
            <AdminItemCard key={item.id} item={item} collection={title.toLowerCase()} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Individual item card with edit/delete actions
 */
function AdminItemCard({ item, collection }: { item: any; collection: string }) {
  const [isEditing, setIsEditing] = useState(false);

  const getDisplayText = (item: any) => {
    if (item.company) return item.company; // Experience
    if (item.school) return item.school; // Education
    if (item.name) return item.name; // Skills, Projects
    return 'Untitled';
  };

  const getSecondaryText = (item: any) => {
    if (item.role) return item.role; // Experience
    if (item.degree) return item.degree; // Education
    if (item.category) return item.category; // Skills
    if (item.technologies) return item.technologies.join(', '); // Projects
    return '';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{getDisplayText(item)}</h3>
          {getSecondaryText(item) && (
            <p className="text-sm text-gray-600 mt-1">{getSecondaryText(item)}</p>
          )}
          <div className="mt-3 text-xs text-gray-500">
            ID: <code className="bg-gray-100 px-2 py-1 rounded">{item.id}</code>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
            Delete
          </button>
        </div>
      </div>

      {isEditing && (
        <AdminItemForm item={item} collection={collection} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
}

/**
 * Form for editing individual items
 */
function AdminItemForm({
  item,
  collection,
  onClose,
}: {
  item: any;
  collection: string;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(item);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/portfolio/${collection}/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Item updated successfully');
        onClose();
      } else {
        alert('Failed to update item');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t">
      <div className="grid gap-4 max-h-96 overflow-y-auto mb-4">
        {Object.entries(formData).map(([key, value]) => {
          if (key === 'id' || key === 'order') return null;

          if (Array.isArray(value)) {
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {key}
                </label>
                <textarea
                  value={JSON.stringify(value, null, 2)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [key]: JSON.parse(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  rows={4}
                />
              </div>
            );
          }

          return (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {key}
              </label>
              <input
                type={typeof value === 'boolean' ? 'checkbox' : 'text'}
                checked={typeof value === 'boolean' ? value : undefined}
                value={typeof value === 'boolean' ? undefined : String(value)}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [key]: typeof value === 'boolean' ? e.target.checked : e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
