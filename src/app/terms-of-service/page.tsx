export default function TermsOfServicePage() {
    return (
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-blue text-gray-700 mx-auto">
            <h1>Terms of Service for PrepLoner</h1>
            <p><strong>Last updated:</strong> October 02, 2023</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              {/* THE FIX IS HERE */}
              By accessing and using PrepLoner (the &quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Service.
            </p>

            <h2>2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>
            
            <h2>3. Use of the Service</h2>
            <p>
              You agree not to use the Service for any purpose that is illegal or prohibited by these Terms. You may not use the Service in any manner that could damage, disable, overburden, or impair the Service.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on PrepLoner, including questions, notes, and text, is the property of PrepLoner and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our express permission.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              {/* THE FIX IS HERE */}
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. PrepLoner makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at: support@preploner.com
            </p>
          </div>
        </div>
      </div>
    );
  }