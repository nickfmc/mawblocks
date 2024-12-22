import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const SpacingControls = ({ attributes, setAttributes }) => {
    const { padding, margin } = attributes;

    return (
        <PanelBody title={__('Spacing', 'your-text-domain')} initialOpen={false}>
            <div className="spacing-controls">
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
            </div>
        </PanelBody>
    );
};
