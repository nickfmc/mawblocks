import React, { useMemo, useCallback, useEffect } from 'react';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { debounce } from '@wordpress/compose';
import { registerBlockType } from '@wordpress/blocks';
import { 
    PanelBody, 
    TextControl, 
    SelectControl,
    IconButton,
    ColorPicker,
    Button,
    ColorPalette, 
    RangeControl, 
    ToggleControl, 
    FontSizePicker
} from '@wordpress/components'; 
import { __ } from '@wordpress/i18n';
import { useTable, useSortBy, useFilters, usePagination, useResizeColumns } from 'react-table';
import './style.scss';



function Edit({ attributes, setAttributes }) {
    const {
        columns,
        data,
        responsiveMode,
        primaryTableColor,
        thTypographyColor,
        thFontSize,
        stripedRows,
        stripedRowBgColor,
        stripedRowTextColor,
        
    } = attributes;

    // Add local state for editing
    const [editingCells, setEditingCells] = React.useState({});

    const updateCellData = useCallback((rowIndex, columnAccessor, value) => {
        const newData = [...data];
        newData[rowIndex] = {
            ...newData[rowIndex],
            [columnAccessor]: value
        };
        setAttributes({ data: newData });
    }, [data, setAttributes]);

    const updateColumnHeader = useCallback((columnIndex, value) => {
        const newColumns = [...columns];
        newColumns[columnIndex] = {
            ...newColumns[columnIndex],
            Header: value
        };
        setAttributes({ columns: newColumns });
    }, [columns, setAttributes]);

    const debouncedUpdateCellData = useMemo(
        () => debounce(updateCellData, 500),
        [updateCellData]
    );

    const debouncedUpdateColumnHeader = useMemo(
        () => debounce(updateColumnHeader, 500),
        [updateColumnHeader]
    );

    useEffect(() => {
        return () => {
            debouncedUpdateCellData.cancel();
            debouncedUpdateColumnHeader.cancel();
        };
    }, [debouncedUpdateCellData, debouncedUpdateColumnHeader]);

    // Handle immediate updates to local state
    const handleCellChange = (rowIndex, columnAccessor, value) => {
        setEditingCells(prev => ({
            ...prev,
            [`${rowIndex}-${columnAccessor}`]: value
        }));
        debouncedUpdateCellData(rowIndex, columnAccessor, value);
    };

    const handleHeaderChange = (columnIndex, value) => {
        setEditingCells(prev => ({
            ...prev,
            [`header-${columnIndex}`]: value
        }));
        debouncedUpdateColumnHeader(columnIndex, value);
    };

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

    const removeRow = (rowIndex) => {
        const newData = data.filter((_, index) => index !== rowIndex);
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


// sorting options
    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: []
            }
        },
        useSortBy
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;
    // sorting options


    return (
        <>
            <InspectorControls>
                {/* Color Settings Panel */}
                <PanelBody 
                    title={__('Color Settings')} 
                    initialOpen={true}
                    className="custom-panel-body"
                >
                    <div className="components-base-control">
                        <strong className="components-base-control__label">
                            {__('Table Primary Color')}
                        </strong>
                        <ColorPalette
                            colors={[
                                { name: 'Primary', color: '#007cba' },
                                { name: 'Secondary', color: '#444444' },
                                // Add more theme colors as needed
                            ]}
                            value={primaryTableColor}
                            onChange={(color) => setAttributes({ primaryTableColor: color })}
                            disableCustomColors={false}
                            clearable={false}
                        />
                    </div>
                </PanelBody>
            
                {/* Typography Panel */}
                <PanelBody 
                    title={__('Typography Settings')} 
                    initialOpen={false}
                    icon="text"
                >
                    <div className="components-base-control">
                        <strong className="components-base-control__label">
                            {__('Header Text Color')}
                        </strong>
                        <ColorPalette
                            colors={[
                                { name: 'White', color: '#ffffff' },
                                { name: 'Black', color: '#000000' },
                                // Add more theme colors
                            ]}
                            value={thTypographyColor}
                            onChange={(color) => setAttributes({ thTypographyColor: color })}
                            disableCustomColors={false}
                            clearable={false}
                        />
                    </div>
            
                    <RangeControl
                        label={__('Header Font Size')}
                        value={thFontSize}
                        onChange={(value) => setAttributes({ thFontSize: value })}
                        min={10}
                        max={50}
                        beforeIcon="editor-textcolor"
                        separatorType="fullWidth"
                    />
                </PanelBody>
            
                {/* Row Styling Panel */}
                <PanelBody 
                    title={__('Row Styling')} 
                    initialOpen={false}
                    icon="table-row-after"
                >
                    <ToggleControl
                        label={__('Enable Striped Rows')}
                        help={__('Alternate background colors for rows')}
                        checked={stripedRows}
                        onChange={(value) => setAttributes({ stripedRows: value })}
                    />
                    
                    {stripedRows && (
                        <div className="striped-rows-settings">
                            <div className="components-base-control">
                                <strong className="components-base-control__label">
                                    {__('Striped Row Background')}
                                </strong>
                                <ColorPalette
                                    colors={[
                                        { name: 'Light Gray', color: '#f5f5f5' },
                                        { name: 'Light Blue', color: '#f0f7fc' },
                                        // Add more theme colors
                                    ]}
                                    value={stripedRowBgColor}
                                    onChange={(color) => setAttributes({ stripedRowBgColor: color })}
                                    disableCustomColors={false}
                                />
                            </div>
            
                            <div className="components-base-control">
                                <strong className="components-base-control__label">
                                    {__('Striped Row Text')}
                                </strong>
                                <ColorPalette
                                    colors={[
                                        { name: 'Dark Gray', color: '#333333' },
                                        { name: 'Black', color: '#000000' },
                                        // Add more theme colors
                                    ]}
                                    value={stripedRowTextColor}
                                    onChange={(color) => setAttributes({ stripedRowTextColor: color })}
                                    disableCustomColors={false}
                                />
                            </div>
                        </div>
                    )}
                </PanelBody>
            
                {/* Responsive Settings Panel */}
                <PanelBody 
                    title={__('Responsive Settings')} 
                    initialOpen={false}
                    icon="smartphone"
                >
                    <SelectControl
                        label={__('Mobile Display Mode')}
                        help={__('Choose how the table displays on mobile devices')}
                        value={responsiveMode}
                        options={[
                            { label: 'Stack Rows', value: 'stack' },
                            { label: 'Horizontal Scroll', value: 'scroll' },
                            { label: 'Card View', value: 'cards' }
                        ]}
                        onChange={(value) => setAttributes({ responsiveMode: value })}
                    />
                </PanelBody>
            </InspectorControls>
            

            <div {...useBlockProps()} style={{ 
                '--primaryTableColor': primaryTableColor,
                '--thTypographyColor': thTypographyColor,
                '--fontSize': thFontSize ? `${thFontSize}px` : undefined,
                '--stripedRowBgColor': stripedRowBgColor,
                '--stripedRowTextColor': stripedRowTextColor
            }}>
                <div className={`table-container ${responsiveMode}`}>
                    <table className="wp-block-table">
                        <thead>
                            <tr>
                                {columns.map((column, columnIndex) => (
                                    <th key={columnIndex} style={{ color: thTypographyColor }}>
                                        <TextControl
                                            value={editingCells[`header-${columnIndex}`] ?? column.Header}
                                            onChange={(value) => handleHeaderChange(columnIndex, value)}
                                            style={{ 
                                                color: thTypographyColor,
                                                fontSize: thFontSize + 'px'
                                            }}
                                            
                                            className="th-text-control"
                                        />
                                        <IconButton
                                            icon={
                                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                                                </svg>
                                            }
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
                                        <td key={`${rowIndex}-${columnIndex}`} data-label={column.Header} >
                                            <TextControl
                                                value={(editingCells[`${rowIndex}-${column.accessor}`] ?? row[column.accessor]) || ''}
                                                
                                                onChange={(value) => handleCellChange(rowIndex, column.accessor, value)}
                                            />
                                        </td>
                                    ))}
                                    <td>
                                        <IconButton
                                            icon={
                                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                                                </svg>
                                            }
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
}


function Save({ attributes }) {
        const { columns, data, responsiveMode, primaryTableColor, thTypographyColor, thFontSize, stripedRows, stripedRowBgColor, stripedRowTextColor } = attributes;

        return (
            <div {...useBlockProps.save()} className={`table-container ${responsiveMode}`} style={{ 
                '--primaryTableColor': primaryTableColor,
                '--thTypographyColor': thTypographyColor,
                '--thFontSize': thFontSize ? `${thFontSize}px` : undefined,
                '--stripedRowBgColor': stripedRowBgColor,
                '--stripedRowTextColor': stripedRowTextColor
            }}>
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
                                    <td 
                                    key={colIndex}
                                    data-label={column.Header}
                                    // Use dangerouslySetInnerHTML to preserve shortcodes
                                    dangerouslySetInnerHTML={{
                                        __html: row[column.accessor]
                                    }}
                                />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    export { Edit, Save };

    registerBlockType('maw/responsive-tables', {
        edit: Edit,
        save: Save
    });
