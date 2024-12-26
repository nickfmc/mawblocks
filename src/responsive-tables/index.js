import React, { useMemo } from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    ToggleControl, 
    Button, 
    SelectControl,
    IconButton
} from '@wordpress/components'; 
import { useTable, useSortBy, useFilters, usePagination, useResizeColumns } from 'react-table';
import './style.scss';


registerBlockType('maw/responsive-tables', {
    title: 'Advanced Responsive Table',
    icon: 'grid-view',
    category: 'common',
    attributes: {
        columns: {
            type: 'array',
            default: [
                { Header: 'Column 1', accessor: 'col1' },
                { Header: 'Column 2', accessor: 'col2' },
            ]
        },
        data: {
            type: 'array',
            default: [
                { col1: 'Data 1', col2: 'Data 2' },
            ]
        },
        responsiveMode: {
            type: 'string',
            default: 'stack'
        },
        enableFeatures: {
            type: 'object',
            default: {
                sorting: true,
                filtering: true,
                pagination: true,
                resize: true,
                draggable: true
            }
        },
        styling: {
            type: 'object',
            default: {
                borderColor: '#dddddd',
                headerBg: '#f8f9fa',
                stripedRows: true,
                fontSize: '14px'
            }
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const {
            columns,
            data,
            responsiveMode,
            enableFeatures,
            styling
        } = attributes;

        // Function to remove a column
        const removeColumn = (columnIndex) => {
            const newColumns = columns.filter((_, index) => index !== columnIndex);
            const newData = data.map(row => {
                const newRow = { ...row };
                delete newRow[columns[columnIndex].accessor];
                return newRow;
            });
            setAttributes({ 
                columns: newColumns,
                data: newData
            });
        };

        // Function to remove a row
        const removeRow = (rowIndex) => {
            const newData = data.filter((_, index) => index !== rowIndex);
            setAttributes({ data: newData });
        };

        // Function to update column header
        const updateColumnHeader = (columnIndex, newHeader) => {
            const newColumns = [...columns];
            newColumns[columnIndex] = {
                ...newColumns[columnIndex],
                Header: newHeader
            };
            setAttributes({ columns: newColumns });
        };

        // Function to update cell data
        const updateCellData = (rowIndex, columnAccessor, value) => {
            const newData = [...data];
            newData[rowIndex] = {
                ...newData[rowIndex],
                [columnAccessor]: value
            };
            setAttributes({ data: newData });
        };

        const addColumn = () => {
            const newAccessor = `col${columns.length + 1}`;
            const newCol = {
                Header: `Column ${columns.length + 1}`,
                accessor: newAccessor
            };
            const newData = data.map(row => ({
                ...row,
                [newAccessor]: ''
            }));
            setAttributes({ 
                columns: [...columns, newCol],
                data: newData
            });
        };

        const addRow = () => {
            const newRow = {};
            columns.forEach(col => {
                newRow[col.accessor] = '';
            });
            setAttributes({ data: [...data, newRow] });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Table Settings">
                        <SelectControl
                            label="Responsive Mode"
                            value={responsiveMode}
                            options={[
                                { label: 'Stack', value: 'stack' },
                                { label: 'Scroll', value: 'scroll' },
                                { label: 'Cards', value: 'cards' }
                            ]}
                            onChange={(value) => setAttributes({ responsiveMode: value })}
                        />
                        
                        <ToggleControl
                            label="Enable Sorting"
                            checked={enableFeatures.sorting}
                            onChange={(value) => 
                                setAttributes({ 
                                    enableFeatures: {...enableFeatures, sorting: value} 
                                })
                            }
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...useBlockProps()}>
                    <div className={`table-container ${responsiveMode}`}>
                        <table className="wp-block-table">
                            <thead>
                                <tr>
                                    {columns.map((column, columnIndex) => (
                                        <th key={columnIndex}>
                                            <TextControl
                                                value={column.Header}
                                                onChange={(value) => updateColumnHeader(columnIndex, value)}
                                            />
                                            <IconButton
                                                icon="no-alt"
                                                label="Remove Column"
                                                onClick={() => removeColumn(columnIndex)}
                                                className="remove-column-button"
                                            />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((column, columnIndex) => (
                                            <td key={`${rowIndex}-${columnIndex}`}>
                                                <TextControl
                                                    value={row[column.accessor] || ''}
                                                    onChange={(value) => 
                                                        updateCellData(rowIndex, column.accessor, value)
                                                    }
                                                />
                                            </td>
                                        ))}
                                        <td>
                                            <IconButton
                                                icon="no-alt"
                                                label="Remove Row"
                                                onClick={() => removeRow(rowIndex)}
                                                className="remove-row-button"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="table-controls">
                            <Button 
                                isPrimary 
                                onClick={addColumn}
                                style={{ marginRight: '10px' }}
                            >
                                Add Column
                            </Button>
                            <Button 
                                isPrimary 
                                onClick={addRow}
                            >
                                Add Row
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { columns, data, responsiveMode } = attributes;

        return (
            <div className={`table-container ${responsiveMode}`}>
                <table className="wp-block-table">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{column.Header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>
                                        {row[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
});