import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl,
    RangeControl,
    ToggleControl
} from '@wordpress/components';
import './editor.scss';

registerBlockType('maw/block-one', {
    title: 'Flex Container',
    icon: 'layout',
    category: 'design',
    
    attributes: {
        flexDirection: {
            type: 'string',
            default: 'row'
        },
        justifyContent: {
            type: 'string',
            default: 'flex-start'
        },
        alignItems: {
            type: 'string',
            default: 'stretch'
        },
        flexWrap: {
            type: 'string',
            default: 'nowrap'
        },
        gap: {
            type: 'number',
            default: 0
        },
        minHeight: {
            type: 'number',
            default: 0
        },
        fullWidth: {
            type: 'boolean',
            default: false
        },
        // Add spacing attributes
        padding: {
            type: 'object',
            default: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }
        },
        margin: {
            type: 'object',
            default: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }
        }
    },

    edit: ({ attributes, setAttributes, clientId }) => {
        const {
            flexDirection,
            justifyContent,
            alignItems,
            flexWrap,
            gap,
            minHeight,
            fullWidth,
            padding,
            margin
        } = attributes;

        const blockProps = useBlockProps({
            className: `maw-flex-container maw-flex-container-${clientId}`,
            style: {
                minHeight: minHeight ? minHeight + 'px' : undefined,
                width: fullWidth ? '100%' : 'auto',
                padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
                margin: `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
            }
        });

        // Inject dynamic styles for this specific instance
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            .maw-flex-container-${clientId} > .block-editor-inner-blocks > .block-editor-block-list__layout {
                display: flex !important;
                flex-direction: ${flexDirection} !important;
                justify-content: ${justifyContent} !important;
                align-items: ${alignItems} !important;
                flex-wrap: ${flexWrap} !important;
                gap: ${gap}px !important;
                width: 100%;
                min-height: inherit;
            }
        `;
        document.head.appendChild(styleElement);

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Spacing" initialOpen={false}>
                        <p className="spacing-control-label">Padding (px)</p>
                        <RangeControl
                            label="Top"
                            value={padding.top}
                            onChange={(value) => setAttributes({ 
                                padding: { ...padding, top: value } 
                            })}
                            min={0}
                            max={200}
                        />
                        <RangeControl
                            label="Right"
                            value={padding.right}
                            onChange={(value) => setAttributes({ 
                                padding: { ...padding, right: value } 
                            })}
                            min={0}
                            max={200}
                        />
                        <RangeControl
                            label="Bottom"
                            value={padding.bottom}
                            onChange={(value) => setAttributes({ 
                                padding: { ...padding, bottom: value } 
                            })}
                            min={0}
                            max={200}
                        />
                        <RangeControl
                            label="Left"
                            value={padding.left}
                            onChange={(value) => setAttributes({ 
                                padding: { ...padding, left: value } 
                            })}
                            min={0}
                            max={200}
                        />

                        <p className="spacing-control-label">Margin (px)</p>
                        <RangeControl
                            label="Top"
                            value={margin.top}
                            onChange={(value) => setAttributes({ 
                                margin: { ...margin, top: value } 
                            })}
                            min={0}
                            max={200}
                        />
                        <RangeControl
                            label="Right"
                            value={margin.right}
                            onChange={(value) => setAttributes({ 
                                margin: { ...margin, right: value } 
                            })}
                            min={0}
                            max={200}
                        />
                        <RangeControl
                            label="Bottom"
                            value={margin.bottom}
                            onChange={(value) => setAttributes({ 
                                margin: { ...margin, bottom: value } 
                            })}
                            min={0}
                            max={200}
                        />
                        <RangeControl
                            label="Left"
                            value={margin.left}
                            onChange={(value) => setAttributes({ 
                                margin: { ...margin, left: value } 
                            })}
                            min={0}
                            max={200}
                        />
                    </PanelBody>

                    <PanelBody title="Flex Layout Settings">
                        <SelectControl
                            label="Flex Direction"
                            value={flexDirection}
                            options={[
                                { label: 'Row', value: 'row' },
                                { label: 'Row Reverse', value: 'row-reverse' },
                                { label: 'Column', value: 'column' },
                                { label: 'Column Reverse', value: 'column-reverse' }
                            ]}
                            onChange={(value) => setAttributes({ flexDirection: value })}
                        />

                        <SelectControl
                            label="Justify Content"
                            value={justifyContent}
                            options={[
                                { label: 'Start', value: 'flex-start' },
                                { label: 'Center', value: 'center' },
                                { label: 'End', value: 'flex-end' },
                                { label: 'Space Between', value: 'space-between' },
                                { label: 'Space Around', value: 'space-around' },
                                { label: 'Space Evenly', value: 'space-evenly' }
                            ]}
                            onChange={(value) => setAttributes({ justifyContent: value })}
                        />

                        <SelectControl
                            label="Align Items"
                            value={alignItems}
                            options={[
                                { label: 'Stretch', value: 'stretch' },
                                { label: 'Start', value: 'flex-start' },
                                { label: 'Center', value: 'center' },
                                { label: 'End', value: 'flex-end' },
                                { label: 'Baseline', value: 'baseline' }
                            ]}
                            onChange={(value) => setAttributes({ alignItems: value })}
                        />

                        <SelectControl
                            label="Flex Wrap"
                            value={flexWrap}
                            options={[
                                { label: 'No Wrap', value: 'nowrap' },
                                { label: 'Wrap', value: 'wrap' },
                                { label: 'Wrap Reverse', value: 'wrap-reverse' }
                            ]}
                            onChange={(value) => setAttributes({ flexWrap: value })}
                        />

                        <RangeControl
                            label="Gap"
                            value={gap}
                            onChange={(value) => setAttributes({ gap: value })}
                            min={0}
                            max={100}
                        />

                        <RangeControl
                            label="Minimum Height"
                            value={minHeight}
                            onChange={(value) => setAttributes({ minHeight: value })}
                            min={0}
                            max={1000}
                            step={10}
                        />

                        <ToggleControl
                            label="Full Width"
                            checked={fullWidth}
                            onChange={(value) => setAttributes({ fullWidth: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <InnerBlocks />
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const {
            flexDirection,
            justifyContent,
            alignItems,
            flexWrap,
            gap,
            minHeight,
            fullWidth,
            padding,
            margin
        } = attributes;

        const blockProps = useBlockProps.save({
            style: {
                display: 'flex',
                flexDirection,
                justifyContent,
                alignItems,
                flexWrap,
                gap: gap + 'px',
                minHeight: minHeight ? minHeight + 'px' : undefined,
                width: fullWidth ? '100%' : 'auto',
                padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
                margin: `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
            }
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    }
});
