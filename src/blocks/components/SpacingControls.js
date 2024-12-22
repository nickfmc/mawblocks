// components/SpacingControls.js
import { __ } from '@wordpress/i18n';
import { PanelBody, __experimentalBoxControl as BoxControl } from '@wordpress/components';


const SpacingControls = ({ attributes, setAttributes }) => {
    const { padding, margin } = attributes;

    // Define common units
    const units = [
        { value: 'px', label: 'px' },
        { value: '%', label: '%' },
        { value: 'em', label: 'em' },
        { value: 'rem', label: 'rem' },
    ];

    return (
        <PanelBody 
            title={__('Spacing')} 
            initialOpen={false}
            className="custom-spacing-controls" // Add custom class
        >
            {BoxControl ? (
                <>
                <div className="custom-box-control-wrapper">
                    <BoxControl
                        label={__('Padding')}
                        values={padding}
                        onChange={(newPadding) => setAttributes({ padding: newPadding })}
                        units={units}
                        allowReset={true}
                        splitOnAxis={false}
                        className="custom-box-control" // Add custom class
                    />
                    </div>

                    <div className="custom-box-control-wrapper">
                    <BoxControl
                        label={__('Margin')}
                        values={margin}
                        onChange={(newMargin) => setAttributes({ margin: newMargin })}
                        units={units}
                        allowReset={true}
                        splitOnAxis={false}
                        className="custom-box-control" // Add custom class
                    />
                    </div>
                </>
            ) : (
                <div className="components-notice is-warning">
                    {__('BoxControl component is not available in your WordPress version. Please update to the latest version.')}
                </div>
            )}
        </PanelBody>
    );
};

export default SpacingControls;
