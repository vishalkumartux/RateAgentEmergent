import React from 'react';
import SEO from '../components/SEO';

const TermsPage = () => {
  return (
    <>
      <SEO 
        title="Terms of Service - AgentRate"
        description="Read AgentRate's terms of service to understand the rules and guidelines for using our platform."
      />
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <p className="text-lg">Last updated: January 2025</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using AgentRate, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Use of Service</h2>
              <p>You may use AgentRate for lawful purposes only. You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Post false or misleading information</li>
                <li>Harass or abuse other users or agents</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Use automated systems to scrape data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Content</h2>
              <p>By posting reviews or other content, you grant AgentRate a non-exclusive, royalty-free license to use, display, and distribute your content on our platform.</p>
              <p className="mt-2">You are solely responsible for your content and must ensure it:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Is truthful and accurate</li>
                <li>Does not infringe on others' rights</li>
                <li>Complies with our community guidelines</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Agent Profiles</h2>
              <p>Agent performance data is compiled from public records and agent submissions. While we strive for accuracy, we cannot guarantee completeness or absolute accuracy of all information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Limitation of Liability</h2>
              <p>AgentRate is a platform for connecting buyers with agents. We are not responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The quality of services provided by agents</li>
                <li>Disputes between users and agents</li>
                <li>Financial losses from property transactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Termination</h2>
              <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful behavior.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Contact</h2>
              <p>Questions about these terms? Contact us at legal@agentrate.com.au</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;