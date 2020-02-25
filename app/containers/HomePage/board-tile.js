import styled from 'styled-components';
import TileTemplate from '../../components/Tile';

const BoardTile = styled(TileTemplate)`
    background-color: #aed4e6;
    width: 30%;
    margin: 0% 1% 1% 1%;
    height: 100px;
    display: inline-block;
    text-align: center;
    color: #206AA7;
    border: 0.1em solid #206AA7;
    vertical-align: top;
`;

export default BoardTile;