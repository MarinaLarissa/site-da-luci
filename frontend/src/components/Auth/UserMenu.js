import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import {
  UserMenuContainer,
  UserButton,
  UserAvatar,
  UserName,
  DropdownMenu,
  DropdownItem,
  LoginButton,
  OnlineStatus,
} from './UserMenu.styles';

const UserMenu = ({ onLoginClick }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated, isOnline, signOut, isSupabaseEnabled } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (email) => {
    if (!email) return '?';
    return email.charAt(0).toUpperCase();
  };

  const getDisplayName = (user) => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };

  if (!isSupabaseEnabled) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <LoginButton onClick={onLoginClick}>
        {t('auth.login')}
      </LoginButton>
    );
  }

  return (
    <UserMenuContainer ref={menuRef}>
      <UserButton onClick={() => setIsOpen(!isOpen)}>
        <UserAvatar>
          {user?.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Avatar" />
          ) : (
            getInitials(user?.email)
          )}
        </UserAvatar>
        <UserName>{getDisplayName(user)}</UserName>
        <OnlineStatus $online={isOnline} title={isOnline ? t('auth.online') : t('auth.offline')} />
      </UserButton>

      {isOpen && (
        <DropdownMenu>
          <DropdownItem $disabled>
            {user?.email}
          </DropdownItem>
          <DropdownItem onClick={handleSignOut}>
            {t('auth.logout')}
          </DropdownItem>
        </DropdownMenu>
      )}
    </UserMenuContainer>
  );
};

export default UserMenu;
