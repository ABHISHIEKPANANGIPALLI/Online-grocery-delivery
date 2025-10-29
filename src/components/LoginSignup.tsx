import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

type LoginSignupProps = {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, name: string, phone: string) => void;
  onBack: () => void;
};

export function LoginSignup({
  onLogin,
  onSignup,
  onBack,
}: LoginSignupProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      alert('Please fill all fields');
      return;
    }
    onLogin(loginEmail, loginPassword);
  };

  const handleSignup = () => {
    if (!signupEmail || !signupPassword || !signupName || !signupPhone) {
      alert('Please fill all fields');
      return;
    }
    onSignup(signupEmail, signupPassword, signupName, signupPhone);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="mb-2">Welcome to FreshMart</h1>
            <p className="text-gray-600">Login or create an account to continue</p>
          </div>

          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email or Mobile</Label>
                <Input
                  id="login-email"
                  type="text"
                  placeholder="Enter your email or mobile number"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <div className="text-right">
                <button className="text-green-600 hover:underline">
                  Forgot Password?
                </button>
              </div>

              <Button className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div>
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="signup-phone">Mobile Number</Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>

              <Button className="w-full" onClick={handleSignup}>
                Sign Up
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              By continuing, you agree to our{' '}
              <a href="#" className="text-green-600 hover:underline">
                Terms & Conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
