import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const TutorialOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-in-out;
  backdrop-filter: blur(2px);
`;

export const TutorialArrow = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 30px solid ${({ theme }) => theme.colors.accent.gold};
  animation: ${bounce} 1.5s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));

  @media (max-width: 768px) {
    top: 20%;
  }
`;

export const TutorialBox = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid ${({ theme }) => theme.colors.accent.gold};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(195, 155, 211, 0.3);
  animation: ${slideUp} 0.4s ease-out;
  position: relative;
  margin-top: 100px;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin-top: 60px;
  }
`;

export const TutorialTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #c39bd3 0%, #b388c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  text-align: center;
`;

export const TutorialStep = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TutorialText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const TutorialButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, #c39bd3 0%, #b388c7 100%);
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: ${({ theme }) => theme.spacing.lg};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(195, 155, 211, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
