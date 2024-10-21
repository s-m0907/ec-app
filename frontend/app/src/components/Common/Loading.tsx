import styled, { keyframes } from "styled-components";

const Bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const BouncingBallContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const BouncingBall = styled.div`
  width: 30px;
  height: 30px;
  margin: 4px;
  border-radius: 50%;
  background-color: #5adbb5;
  animation: ${Bounce} 0.6s infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const Loading: React.FC = () => {
  return (
    <BouncingBallContainer>
      <BouncingBall />
      <BouncingBall />
      <BouncingBall />
    </BouncingBallContainer>
  );
};

export default Loading;
