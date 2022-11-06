import PropTypes from 'prop-types';
import { Container, ButtonLoadMore } from './Button.styled';

export const Button = ({changePage}) => {
    return <Container>
        <ButtonLoadMore onClick={changePage}>
        Load more
        </ButtonLoadMore>
    </Container>
};

Button.propTypes = {
    changePage: PropTypes.func.isRequired
};