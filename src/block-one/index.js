import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { spacingAttributes } from '../blocks/shared/attributes';
import SpacingControls from '../blocks/components/SpacingControls';
import { 
    PanelBody, 
    SelectControl,
    RangeControl,
    ToggleControl
} from '@wordpress/components';



registerBlockType('maw/block-one', {
    title: 'Flex Container',
    icon: 'layout',
    category: 'design',
    
    attributes: {
        ...spacingAttributes, // spread the spacing attributes
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
        padding: `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`,
        margin: `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`
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
                    <SpacingControls 
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
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
                padding: `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`,
                margin: `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`
            }
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    }
});
