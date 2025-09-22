import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

interface SignupPageProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSignupSuccess: (user: any) => void;
}

export default function SignupPage({ onClose, onSwitchToLogin, onSignupSuccess }: SignupPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const { t } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return false;
    }
    if (!recaptchaVerified) {
      toast.error('Please complete the reCAPTCHA verification');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful signup
      const mockUser = {
        id: '2',
        email: formData.email,
        name: formData.fullName,
        rank: 'Bronze',
        avatar: '/api/placeholder/60/60'
      };

      onSignupSuccess(mockUser);
      toast.success('Welcome to INFINIPETS family! 🐾', {
        description: 'Your account has been created successfully!'
      });
      onClose();
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="INFINIPETS" 
                className="h-8 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/api/placeholder/120/40';
                }}
              />
              <span className="font-coiny text-xl gradient-text">INFINIPETS</span>
            </div>
            <div className="w-10"></div>
          </div>
          <CardTitle className="text-2xl font-coiny gradient-text">Join INFINIPETS!</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Create your account and start your pet fashion journey</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="pl-10 h-12 border-blue-200 focus:border-blue-400"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="pl-10 h-12 border-blue-200 focus:border-blue-400"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="pl-10 pr-10 h-12 border-blue-200 focus:border-blue-400"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 h-12 border-blue-200 focus:border-blue-400"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="recaptcha-signup"
                    checked={recaptchaVerified}
                    onCheckedChange={(checked) => setRecaptchaVerified(!!checked)}
                  />
                  <label htmlFor="recaptcha-signup" className="text-sm text-gray-600 dark:text-gray-400">
                    I'm not a robot
                  </label>
                  <div className="text-xs text-gray-500">
                    reCAPTCHA
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreeToTerms: !!checked }))
                  }
                  className="mt-1"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  I agree to the{' '}
                  <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                    Terms of Service
                  </Button>
                  {' '}and{' '}
                  <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                    Privacy Policy
                  </Button>
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, subscribeNewsletter: !!checked }))
                  }
                  className="mt-1"
                />
                <label htmlFor="subscribeNewsletter" className="text-sm text-gray-600 dark:text-gray-400">
                  Subscribe to our newsletter for exclusive offers and pet care tips
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !recaptchaVerified || !formData.agreeToTerms}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>

            {/* Social Signup */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12">
                <img src="/api/placeholder/20/20" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="h-12">
                <img src="/api/placeholder/20/20" alt="Facebook" className="w-5 h-5 mr-2" />
                Facebook
              </Button>
            </div>

            {/* Switch to Login */}
            <div className="text-center">
              <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
              <Button
                variant="link"
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold"
              >
                Sign in here
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}