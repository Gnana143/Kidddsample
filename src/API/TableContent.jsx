import React, { Component } from 'react';
import { Table, Loader  } from 'semantic-ui-react';
//import { Link } from 'react-router-dom';
import Home from '../Home.jsx';
export default class TableContent extends Component {

    render() {
        const { loading } = this.props;
        return (
            <div>
                {loading &&  <Loader active inline='centered' />}
                {!loading && (
                <Table celled fixed singleLine>
                    <Table.Header >
                        <Table.Row >
                            <Table.HeaderCell>UserID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>gender</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Height</Table.HeaderCell>
                            <Table.HeaderCell>Weight</Table.HeaderCell>
                            <Table.HeaderCell>Rate</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.tableData.map((data, idx) =>
                            <Table.Row key={idx} >                               
                                <Table.Cell>{data.userId}</Table.Cell>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.gender}</Table.Cell>
                                <Table.Cell>{data.date}</Table.Cell>
                                <Table.Cell>{data.age}</Table.Cell>
                                <Table.Cell>{data.BMI.height}</Table.Cell>
                                <Table.Cell>{data.BMI.weight}</Table.Cell>  
                                <Table.Cell>{data.BMI.rate}</Table.Cell>                                    
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                )}
            </div>
        );
    }
}
