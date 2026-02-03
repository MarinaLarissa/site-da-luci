import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  TabContainer,
  Tab,
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
  SuccessMessage,
  Divider,
  GoogleButton,
  GoogleIcon,
  ForgotPassword,
} from './LoginModal.styles';

const LoginModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();

  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      onClose();
    } catch (err) {
      setError(err.message || t('auth.errors.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('auth.errors.passwordMismatch'));
      return;
    }

    if (password.length < 6) {
      setError(t('auth.errors.passwordTooShort'));
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password);
      setSuccess(t('auth.success.checkEmail'));
    } catch (err) {
      setError(err.message || t('auth.errors.signUpFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || t('auth.errors.googleFailed'));
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError(t('auth.errors.emailRequired'));
      return;
    }

    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(t('auth.success.resetEmailSent'));
    } catch (err) {
      setError(err.message || t('auth.errors.resetFailed'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {activeTab === 'login' ? t('auth.login') : t('auth.signUp')}
          </ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          <TabContainer>
            <Tab
              $active={activeTab === 'login'}
              onClick={() => handleTabChange('login')}
            >
              {t('auth.login')}
            </Tab>
            <Tab
              $active={activeTab === 'signup'}
              onClick={() => handleTabChange('signup')}
            >
              {t('auth.signUp')}
            </Tab>
          </TabContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Form onSubmit={activeTab === 'login' ? handleLogin : handleSignUp}>
            <FormGroup>
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder')}
                required
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder')}
                required
                disabled={loading}
                minLength={6}
              />
            </FormGroup>

            {activeTab === 'signup' && (
              <FormGroup>
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </FormGroup>
            )}

            {activeTab === 'login' && (
              <ForgotPassword type="button" onClick={handleForgotPassword} disabled={loading}>
                {t('auth.forgotPassword')}
              </ForgotPassword>
            )}

            <SubmitButton type="submit" disabled={loading}>
              {loading
                ? t('auth.loading')
                : activeTab === 'login'
                ? t('auth.loginButton')
                : t('auth.signUpButton')}
            </SubmitButton>
          </Form>

          <Divider>
            <span>{t('auth.or')}</span>
          </Divider>

          <GoogleButton type="button" onClick={handleGoogleLogin} disabled={loading}>
            <GoogleIcon viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </GoogleIcon>
            {t('auth.continueWithGoogle')}
          </GoogleButton>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LoginModal;
