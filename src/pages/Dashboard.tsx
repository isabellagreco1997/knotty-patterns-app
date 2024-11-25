import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PiPencilSimple, 
  PiRobot, 
  PiFolder, 
  PiBook, 
  PiSparkle, 
  PiCrown,
  PiTrendUp,
  PiChartLineUp,
  PiWarning
} from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';
import { usePatternStore } from '../stores/usePatternStore';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import SEOHead from '../components/SEOHead';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { patterns, loading } = usePatternStore();
  const { status: subscriptionStatus } = useSubscriptionStatus();
  const isPremium = subscriptionStatus === 'active';

  const quickActions = [
    {
      title: 'Create New Pattern',
      description: 'Start a new crochet pattern from scratch',
      icon: <PiPencilSimple className="w-6 h-6" />,
      link: '/pattern-builder',
      color: 'bg-primary-500'
    },
    {
      title: 'AI Pattern Generator',
      description: 'Get inspiration and generate patterns using AI',
      icon: <PiRobot className="w-6 h-6" />,
      link: '/get-inspiration',
      color: 'bg-rose-500'
    },
    {
      title: 'Stitch Glossary',
      description: 'Learn about different crochet stitches',
      icon: <PiBook className="w-6 h-6" />,
      link: '/stitch-glossary',
      color: 'bg-amber-500'
    }
  ];

  return (
    <>
      <SEOHead 
        title="Dashboard - KnottyPatterns"
        description="Manage your crochet patterns, access AI tools, and explore stitch tutorials."
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-600 mt-2">
              What would you like to create today?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.link}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
              >
                <div className={`${action.color} text-white p-3 rounded-lg inline-block mb-4`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                  {action.title}
                </h3>
                <p className="text-gray-600">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Recent Patterns */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Patterns</h2>
              <Link
                to="/saved-patterns"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View All
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading patterns...</div>
            ) : patterns.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You haven't created any patterns yet.</p>
                <Link
                  to="/pattern-builder"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <PiPencilSimple className="w-4 h-4 mr-2" />
                  Create Your First Pattern
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patterns.slice(0, 3).map((pattern) => (
                  <Link
                    key={pattern.id}
                    to={`/pattern-builder/${pattern.id}`}
                    className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 mb-1 group-hover:text-primary-600">
                      {pattern.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Last updated: {new Date(pattern.updatedAt).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Premium Features & Stats */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Premium Features */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-sm p-6 text-white">
              <div className="flex items-center mb-4">
                <PiCrown className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold">Premium Features</h2>
              </div>
              
              {isPremium ? (
                <>
                  <p className="mb-4">You have access to all premium features!</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <PiSparkle className="w-4 h-4 mr-2" />
                      Unlimited pattern storage
                    </li>
                    <li className="flex items-center">
                      <PiSparkle className="w-4 h-4 mr-2" />
                      PDF export functionality
                    </li>
                    <li className="flex items-center">
                      <PiSparkle className="w-4 h-4 mr-2" />
                      Custom stitch creation
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="mb-4">Upgrade to unlock premium features!</p>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-primary-50"
                  >
                    View Premium Features
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {patterns.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Patterns</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {patterns.filter(p => new Date(p.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                  </div>
                  <div className="text-sm text-gray-600">Past 7 Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}