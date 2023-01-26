import PropTypes from 'prop-types';
import Spinner from '../spinner';

import { StyledButton } from './styles';

export default function Button({
  children,
  type = 'button',
  disabled = false,
  isLoading = false,
  danger = false,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      danger={danger}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
};
