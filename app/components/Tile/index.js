import styled from 'styled-components';

const TileTemplate = styled.div`
  border-radius: 0.2em;
  background-color: ${props => props.backgroundColor};
  padding: 0.5em 0 0.5em 0.5em; 
  margin: 1em 1em 0em 0em;
  min-width: ${props => props.width};
  cursor: pointer;
`;

export default TileTemplate;
