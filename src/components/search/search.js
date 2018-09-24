import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFavorite } from '../../store/actions/actionCreators';
import './search.css';
import { API_TOKEN } from '../../api_token';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            repos: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.makeTableRows = this.makeTableRows.bind(this);
    }

    handleSearch() {
        const query = `
        query {
            user(login: "${this.state.inputText}") {
            repositories(first: 10) {
            nodes {
                nameWithOwner
                url
                  primaryLanguage {
                    name
                  }
                  updatedAt
            }
            }
        }
    }
        `;
        return fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`,
            },
            body: JSON.stringify({query}),
        })
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            console.log(jsonResponse);
            const repoState = [];
            jsonResponse.data.user.repositories.nodes.forEach((repo) => {
                repoState.push({
                    name: repo.nameWithOwner,
                    language: repo.primaryLanguage,
                    tag: repo.updatedAt, 
                });
            })

            this.setState({
                inputText: this.state.inputText,
                repos: repoState});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    makeTableRows() {
        return this.state.repos.map((repo) => {
            console.log(repo);
            const addButton = !this.props.favorites[repo.name] ? (
                <td>
                    <p
                        className='add-remove-button'
                        onClick={() => {
                            this.props.addFavorite({name: repo.name, language: repo.language.name, tag: repo.tag});
                        }}
                    >
                        Add
                    </p>
                </td>
            ): null;
            return (
                <tr
                    key={repo.name}
                >
                    <td>{repo.name}</td>
                    <td>{repo.language.name}</td>
                    <td>{repo.tag}</td>
                    {addButton}
                </tr>
            );
        });
    }

    render() {
        const tableRows = this.makeTableRows();
        return (
            <div className='search-container'>
                <div className='search-box-container'>
                    <input
                        className='input-box'
                        placeholder='Enter a Github user'
                        value={this.state.inputText}
                        onChange={(e) => {
                            if (e.target.value === '') {
                                this.setState({inputText: e.target.value, repos:[]});
                            }
                            else {
                                this.setState({inputText: e.target.value});
                            }
                        }}
                    />
                    <button
                        className='search-button'
                        onClick={this.handleSearch}
                    >
                        Search
                    </button>
                </div>
                <table className='repo-table'>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Language</th>
                        <th>Latest Tag</th>
                    </tr>
                    {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        favorites: state,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addFavorite: addFavorite }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);
