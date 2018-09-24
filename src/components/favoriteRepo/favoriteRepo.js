import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeFavorite } from '../../store/actions/actionCreators';
import './favoriteRepo.css';

function FavoriteRepo (props) {

    const rows = props.favRepo ? (Object.entries(props.favRepo).map((pair) => {
        return (<tr
            key={pair[1].name}
        >
            <td>{pair[1].name}</td>
            <td>{pair[1].language}</td>
            <td>{pair[1].tag}</td>
            <td>
                <p
                    className='add-remove-button'
                    onClick={() => {
                        props.removeFavorite({name: pair[1].name, language: pair[1].language, tag: pair[1].tag})
                    }}
                >
                    Remove
                </p>
            </td>
        </tr>)  
    })) : null;

    return (
        <div className='fav-repo-container'>
            <table className='repo-table'>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Language</th>
                    <th>Latest Tag</th>
                </tr>
                {rows}
                </tbody>
            </table>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        favRepo: state,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ removeFavorite: removeFavorite }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRepo);
